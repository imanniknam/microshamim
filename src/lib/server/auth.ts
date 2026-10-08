import "server-only";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DATA_DIR, get, run } from "./db";

const COOKIE = "shamim_admin";
const MAX_AGE = 60 * 60 * 24 * 7;

export type SessionUser = { id: number; email: string; name: string; role: "admin" | "editor" };

function secret(): string {
  if (process.env.ADMIN_SECRET) return process.env.ADMIN_SECRET;
  const f = path.join(DATA_DIR, ".secret");
  try { return fs.readFileSync(f, "utf8"); } catch {}
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const s = crypto.randomBytes(32).toString("hex");
  fs.writeFileSync(f, s, { mode: 0o600 });
  return s;
}

export function hashPassword(pw: string): string {
  const salt = crypto.randomBytes(16);
  const h = crypto.scryptSync(pw, salt, 64);
  return `s1$${salt.toString("hex")}$${h.toString("hex")}`;
}
export function verifyPassword(pw: string, stored: string): boolean {
  const [v, saltHex, hashHex] = stored.split("$");
  if (v !== "s1") return false;
  const h = crypto.scryptSync(pw, Buffer.from(saltHex, "hex"), 64);
  return crypto.timingSafeEqual(h, Buffer.from(hashHex, "hex"));
}

const sign = (payload: string) => crypto.createHmac("sha256", secret()).update(payload).digest("base64url");

type UserRow = { id: number; email: string; name: string; role: "admin" | "editor"; pass_hash: string };

export async function createSession(user: UserRow) {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  // pass_hash fingerprint: changing the password invalidates every older session
  const payload = `${user.id}.${exp}.${crypto.createHash("sha256").update(user.pass_hash).digest("hex").slice(0, 12)}`;
  const jar = await cookies();
  jar.set(COOKIE, `${payload}.${sign(payload)}`, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" && process.env.INSECURE_COOKIES !== "1", path: "/", maxAge: MAX_AGE });
  run("UPDATE users SET last_login = datetime('now') WHERE id = ?", user.id);
}
export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

export async function getSession(): Promise<SessionUser | null> {
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return null;
  const i = raw.lastIndexOf(".");
  const payload = raw.slice(0, i), sig = raw.slice(i + 1);
  const expect = sign(payload);
  if (sig.length !== expect.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expect))) return null;
  const [id, exp, fp] = payload.split(".");
  if (+exp < Date.now() / 1000) return null;
  const u = get<UserRow>("SELECT * FROM users WHERE id = ?", +id);
  if (!u) return null;
  if (crypto.createHash("sha256").update(u.pass_hash).digest("hex").slice(0, 12) !== fp) return null;
  return { id: u.id, email: u.email, name: u.name, role: u.role };
}

export async function requireAdmin(role?: "admin"): Promise<SessionUser> {
  const s = await getSession();
  if (!s) redirect("/admin/login");
  if (role && s.role !== role) redirect("/admin?denied=1");
  return s;
}
export const usersExist = () => (get<{ n: number }>("SELECT COUNT(*) n FROM users")?.n ?? 0) > 0;
export const audit = (email: string, action: string, entity: string) => run("INSERT INTO audit(user_email,action,entity) VALUES(?,?,?)", email, action, entity);

/** Tiny fixed-window rate limiter backed by SQLite (survives restarts, shared by all routes). */
export function rateLimit(key: string, max: number, windowSec: number): boolean {
  const now = Math.floor(Date.now() / 1000);
  const r = get<{ n: number; reset: number }>("SELECT n, reset FROM ratelimit WHERE k = ?", key);
  if (!r || r.reset < now) { run("INSERT INTO ratelimit(k,n,reset) VALUES(?,1,?) ON CONFLICT(k) DO UPDATE SET n=1, reset=excluded.reset", key, now + windowSec); return true; }
  if (r.n >= max) return false;
  run("UPDATE ratelimit SET n = n + 1 WHERE k = ?", key);
  return true;
}
