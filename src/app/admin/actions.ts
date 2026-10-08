"use server";

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";
import nodemailer from "nodemailer";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { DATA_DIR, get, run, setSetting } from "@/lib/server/db";
import { audit, createSession, destroySession, hashPassword, rateLimit, requireAdmin, usersExist, verifyPassword } from "@/lib/server/auth";
import { getNotify, getSite } from "@/lib/server/data";
import { defaultSite } from "@/lib/server/seed";
import { homeDefaults } from "@/data/home-defaults";
import type { Block, NotifySettings, SiteSettings } from "@/lib/types";

export type State = { ok?: boolean; error?: string; message?: string } | null;
const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const refresh = () => revalidatePath("/", "layout");

function slugify(s: string) {
  return s.trim().toLowerCase().replace(/[\s_]+/g, "-").replace(/[^\p{L}\p{N}-]/gu, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

/* ───────── auth ───────── */
export async function loginAction(_: State, fd: FormData): Promise<State> {
  if (!rateLimit("login:" + (str(fd, "email") || "x"), 8, 900)) return { error: "تلاش‌های ناموفق زیاد بود؛ ۱۵ دقیقه بعد دوباره تلاش کن." };
  const u = get<{ id: number; email: string; name: string; role: "admin" | "editor"; pass_hash: string }>("SELECT * FROM users WHERE email = ?", str(fd, "email").toLowerCase());
  if (!u || !verifyPassword(String(fd.get("password") ?? ""), u.pass_hash)) return { error: "ایمیل یا گذرواژه درست نیست." };
  await createSession(u);
  audit(u.email, "login", "session");
  redirect("/admin");
}
export async function setupAction(_: State, fd: FormData): Promise<State> {
  if (usersExist()) return { error: "ادمین از قبل ساخته شده است." };
  const email = str(fd, "email").toLowerCase(), pw = String(fd.get("password") ?? "");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "ایمیل معتبر نیست." };
  if (pw.length < 8) return { error: "گذرواژه حداقل ۸ نویسه باشد." };
  if (pw !== String(fd.get("password2") ?? "")) return { error: "تکرار گذرواژه یکسان نیست." };
  const r = run("INSERT INTO users(email,name,role,pass_hash) VALUES(?,?,?,?)", email, str(fd, "name") || "مدیر", "admin", hashPassword(pw));
  const u = get<never>("SELECT * FROM users WHERE id = ?", Number(r.lastInsertRowid))!;
  await createSession(u);
  redirect("/admin");
}
export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

/* ───────── pages (block CMS) ───────── */
const BLOCK_TYPES = ["hero", "text", "cards", "checklist", "steps", "feature", "faq", "cta", "courses", "flow"];
function parseBlocks(raw: string): Block[] {
  const b = JSON.parse(raw);
  if (!Array.isArray(b) || b.some((x) => !x || !BLOCK_TYPES.includes(x.type))) throw new Error("bad blocks");
  return b;
}
export async function savePageAction(_: State, fd: FormData): Promise<State> {
  const me = await requireAdmin();
  const slug = str(fd, "slug");
  try {
    const blocks = parseBlocks(String(fd.get("blocks")));
    if (!str(fd, "title")) return { error: "عنوان صفحه الزامی است." };
    run("UPDATE pages SET title=?, seo_title=?, seo_desc=?, published=?, blocks=?, updated_at=datetime('now') WHERE slug=?",
      str(fd, "title"), str(fd, "seo_title"), str(fd, "seo_desc"), fd.get("published") ? 1 : 0, JSON.stringify(blocks), slug);
    audit(me.email, "edit", `page:${slug}`);
    refresh();
    return { ok: true, message: "صفحه ذخیره شد." };
  } catch { return { error: "ساختار بلوک‌ها نامعتبر است." }; }
}
export async function createPageAction(_: State, fd: FormData): Promise<State> {
  const me = await requireAdmin();
  const slug = slugify(str(fd, "slug"));
  const RESERVED = ["admin", "api", "blog", "events", "contact", "request", "uploads", "assets", "_next"];
  if (!slug || RESERVED.includes(slug)) return { error: "نشانی (slug) معتبر نیست یا رزرو شده است." };
  if (get("SELECT 1 FROM pages WHERE slug=?", slug)) return { error: "این نشانی قبلاً وجود دارد." };
  run("INSERT INTO pages(slug,title,blocks) VALUES(?,?,?)", slug, str(fd, "title") || slug,
    JSON.stringify([{ type: "hero", title: str(fd, "title") || slug, paragraphs: [""] }]));
  audit(me.email, "create", `page:${slug}`);
  redirect(`/admin/pages/${encodeURIComponent(slug)}`);
}
export async function deletePageAction(fd: FormData) {
  const me = await requireAdmin("admin");
  run("DELETE FROM pages WHERE slug=?", str(fd, "slug"));
  audit(me.email, "delete", `page:${str(fd, "slug")}`);
  refresh();
  redirect("/admin/pages");
}

/* ───────── home content ───────── */
export async function saveHomeAction(_: State, fd: FormData): Promise<State> {
  const me = await requireAdmin();
  try {
    const j = JSON.parse(String(fd.get("json")));
    if (!j || typeof j !== "object" || Array.isArray(j)) throw new Error();
    run("INSERT INTO home(id,content,updated_at) VALUES(1,?,datetime('now')) ON CONFLICT(id) DO UPDATE SET content=excluded.content, updated_at=excluded.updated_at", JSON.stringify(j));
    audit(me.email, "edit", "home");
    refresh();
    return { ok: true, message: "محتوای صفحه اصلی ذخیره شد." };
  } catch { return { error: "داده نامعتبر است." }; }
}
export async function resetHomeAction() {
  const me = await requireAdmin("admin");
  run("INSERT INTO home(id,content) VALUES(1,?) ON CONFLICT(id) DO UPDATE SET content=excluded.content", JSON.stringify(homeDefaults));
  audit(me.email, "reset", "home");
  refresh();
  redirect("/admin/home");
}

/* ───────── posts / events / courses ───────── */
function uniqueSlug(table: "posts" | "events", base: string, id?: number) {
  let s = slugify(base) || `item-${Date.now().toString(36)}`, n = 2;
  while (get(`SELECT 1 FROM ${table} WHERE slug=? ${id ? "AND id<>?" : ""}`, ...(id ? [s, id] : [s]))) s = `${slugify(base)}-${n++}`;
  return s;
}
export async function savePostAction(_: State, fd: FormData): Promise<State> {
  const me = await requireAdmin();
  const id = Number(fd.get("id")) || 0;
  const title = str(fd, "title");
  if (!title) return { error: "عنوان الزامی است." };
  const status = str(fd, "status") === "published" ? "published" : "draft";
  const slug = str(fd, "slug") ? uniqueSlug("posts", str(fd, "slug"), id || undefined) : uniqueSlug("posts", title, id || undefined);
  const pub = status === "published" ? (str(fd, "published_at") ? str(fd, "published_at").replace("T", " ") : new Date().toISOString().slice(0, 19).replace("T", " ")) : null;
  if (id) {
    run("UPDATE posts SET slug=?,title=?,excerpt=?,body=?,cover=?,category=?,author=?,status=?,published_at=?,updated_at=datetime('now') WHERE id=?",
      slug, title, str(fd, "excerpt"), String(fd.get("body") ?? ""), str(fd, "cover"), str(fd, "category"), str(fd, "author"), status, pub, id);
    audit(me.email, "edit", `post:${id}`); refresh();
    return { ok: true, message: "مطلب ذخیره شد." };
  }
  const r = run("INSERT INTO posts(slug,title,excerpt,body,cover,category,author,status,published_at) VALUES(?,?,?,?,?,?,?,?,?)",
    slug, title, str(fd, "excerpt"), String(fd.get("body") ?? ""), str(fd, "cover"), str(fd, "category"), str(fd, "author") || me.name, status, pub);
  audit(me.email, "create", `post:${r.lastInsertRowid}`); refresh();
  redirect(`/admin/posts/${r.lastInsertRowid}`);
}
export async function deletePostAction(fd: FormData) {
  const me = await requireAdmin();
  run("DELETE FROM posts WHERE id=?", Number(fd.get("id")));
  audit(me.email, "delete", `post:${fd.get("id")}`); refresh();
  redirect("/admin/posts");
}

export async function saveEventAction(_: State, fd: FormData): Promise<State> {
  const me = await requireAdmin();
  const id = Number(fd.get("id")) || 0;
  const title = str(fd, "title");
  if (!title) return { error: "عنوان الزامی است." };
  const slug = uniqueSlug("events", str(fd, "slug") || title, id || undefined);
  const vals = [slug, title, str(fd, "kind"), str(fd, "starts_at") || null, str(fd, "place"), String(fd.get("description") ?? ""), str(fd, "image"), str(fd, "link"), str(fd, "status") === "published" ? "published" : "draft"];
  if (id) {
    run("UPDATE events SET slug=?,title=?,kind=?,starts_at=?,place=?,description=?,image=?,link=?,status=?,updated_at=datetime('now') WHERE id=?", ...vals, id);
    audit(me.email, "edit", `event:${id}`); refresh();
    return { ok: true, message: "رویداد ذخیره شد." };
  }
  const r = run("INSERT INTO events(slug,title,kind,starts_at,place,description,image,link,status) VALUES(?,?,?,?,?,?,?,?,?)", ...vals);
  audit(me.email, "create", `event:${r.lastInsertRowid}`); refresh();
  redirect(`/admin/events/${r.lastInsertRowid}`);
}
export async function deleteEventAction(fd: FormData) {
  const me = await requireAdmin();
  run("DELETE FROM events WHERE id=?", Number(fd.get("id")));
  audit(me.email, "delete", `event:${fd.get("id")}`); refresh();
  redirect("/admin/events");
}

export async function saveCourseAction(_: State, fd: FormData): Promise<State> {
  const me = await requireAdmin();
  const id = Number(fd.get("id")) || 0;
  if (!str(fd, "title")) return { error: "عنوان الزامی است." };
  const aud = ["teen", "youth", "all"].includes(str(fd, "audience")) ? str(fd, "audience") : "all";
  const vals = [str(fd, "title"), str(fd, "summary"), aud, str(fd, "image"), str(fd, "link"), Number(fd.get("sort")) || 0, str(fd, "status") === "published" ? "published" : "draft"];
  if (id) {
    run("UPDATE courses SET title=?,summary=?,audience=?,image=?,link=?,sort=?,status=?,updated_at=datetime('now') WHERE id=?", ...vals, id);
    audit(me.email, "edit", `course:${id}`); refresh();
    return { ok: true, message: "دوره ذخیره شد." };
  }
  const r = run("INSERT INTO courses(title,summary,audience,image,link,sort,status) VALUES(?,?,?,?,?,?,?)", ...vals);
  audit(me.email, "create", `course:${r.lastInsertRowid}`); refresh();
  redirect(`/admin/courses/${r.lastInsertRowid}`);
}
export async function deleteCourseAction(fd: FormData) {
  const me = await requireAdmin();
  run("DELETE FROM courses WHERE id=?", Number(fd.get("id")));
  audit(me.email, "delete", `course:${fd.get("id")}`); refresh();
  redirect("/admin/courses");
}

/* ───────── media ───────── */
export async function uploadMediaAction(_: State, fd: FormData): Promise<State> {
  const me = await requireAdmin();
  const files = fd.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (!files.length) return { error: "فایلی انتخاب نشده است." };
  const dir = path.join(DATA_DIR, "uploads");
  fs.mkdirSync(dir, { recursive: true });
  let n = 0;
  for (const f of files) {
    if (f.size > 15 * 1024 * 1024) return { error: `«${f.name}» بزرگ‌تر از ۱۵ مگابایت است.` };
    const buf = Buffer.from(await f.arrayBuffer());
    const id = crypto.randomBytes(6).toString("hex");
    try {
      if (f.type === "image/svg+xml") {
        const name = `${id}.svg`;
        fs.writeFileSync(path.join(dir, name), buf);
        run("INSERT INTO media(filename,url,mime,size) VALUES(?,?,?,?)", f.name, `/uploads/${name}`, f.type, buf.length);
      } else if (f.type.startsWith("image/")) {
        // normalise: strip metadata, cap at 2400px, serve as high-quality WebP
        const img = sharp(buf, { failOn: "none" }).rotate().resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true }).webp({ quality: 86 });
        const out = await img.toBuffer({ resolveWithObject: true });
        const name = `${id}.webp`;
        fs.writeFileSync(path.join(dir, name), out.data);
        run("INSERT INTO media(filename,url,mime,size,w,h) VALUES(?,?,?,?,?,?)", f.name, `/uploads/${name}`, "image/webp", out.data.length, out.info.width, out.info.height);
      } else if (f.type === "application/pdf") {
        const name = `${id}.pdf`;
        fs.writeFileSync(path.join(dir, name), buf);
        run("INSERT INTO media(filename,url,mime,size) VALUES(?,?,?,?)", f.name, `/uploads/${name}`, f.type, buf.length);
      } else return { error: `نوع فایل «${f.name}» پشتیبانی نمی‌شود (تصویر یا PDF).` };
      n++;
    } catch { return { error: `پردازش «${f.name}» ناموفق بود.` }; }
  }
  audit(me.email, "upload", `${n} files`);
  revalidatePath("/admin/media");
  return { ok: true, message: `${n} فایل بارگذاری شد.` };
}
export async function updateMediaAltAction(fd: FormData) {
  await requireAdmin();
  run("UPDATE media SET alt=? WHERE id=?", str(fd, "alt"), Number(fd.get("id")));
  revalidatePath("/admin/media");
}
export async function deleteMediaAction(fd: FormData) {
  const me = await requireAdmin();
  const m = get<{ url: string }>("SELECT url FROM media WHERE id=?", Number(fd.get("id")));
  if (m) {
    try { fs.unlinkSync(path.join(DATA_DIR, "uploads", path.basename(m.url))); } catch {}
    run("DELETE FROM media WHERE id=?", Number(fd.get("id")));
    audit(me.email, "delete", `media:${fd.get("id")}`);
  }
  revalidatePath("/admin/media");
}

/* ───────── submissions & subscribers ───────── */
export async function updateSubmissionAction(_: State, fd: FormData): Promise<State> {
  await requireAdmin();
  const st = str(fd, "status");
  if (!["new", "seen", "progress", "done", "archived"].includes(st)) return { error: "وضعیت نامعتبر است." };
  run("UPDATE submissions SET status=?, note=?, updated_at=datetime('now') WHERE id=?", st, str(fd, "note"), Number(fd.get("id")));
  revalidatePath("/admin/submissions");
  return { ok: true, message: "ذخیره شد." };
}
export async function bulkSubmissionAction(fd: FormData) {
  const me = await requireAdmin();
  const ids = fd.getAll("ids").map(Number).filter(Boolean);
  const act = str(fd, "action");
  for (const id of ids) {
    if (act === "delete") run("DELETE FROM submissions WHERE id=?", id);
    else if (["seen", "done", "archived", "progress"].includes(act)) run("UPDATE submissions SET status=?, updated_at=datetime('now') WHERE id=?", act, id);
  }
  if (ids.length) audit(me.email, `bulk:${act}`, `${ids.length} submissions`);
  revalidatePath("/admin/submissions");
}
export async function deleteSubmissionAction(fd: FormData) {
  const me = await requireAdmin();
  run("DELETE FROM submissions WHERE id=?", Number(fd.get("id")));
  audit(me.email, "delete", `submission:${fd.get("id")}`);
  redirect("/admin/submissions");
}
export async function deleteSubscriberAction(fd: FormData) {
  await requireAdmin();
  run("DELETE FROM subscribers WHERE id=?", Number(fd.get("id")));
  revalidatePath("/admin/subscribers");
}

/* ───────── settings ───────── */
export async function saveSiteAction(_: State, fd: FormData): Promise<State> {
  const me = await requireAdmin();
  try {
    const cur = getSite();
    const v = JSON.parse(String(fd.get("json"))) as Partial<SiteSettings>;
    const next: SiteSettings = { ...cur, ...v, socials: { ...cur.socials, ...(v.socials ?? {}) }, seo: { ...cur.seo, ...(v.seo ?? {}) } };
    if (!Array.isArray(next.nav) || !Array.isArray(next.footerLinks)) throw new Error();
    setSetting("site", next);
    audit(me.email, "edit", "settings:site");
    refresh();
    return { ok: true, message: "تنظیمات ذخیره شد." };
  } catch { return { error: "داده نامعتبر است." }; }
}
export async function resetSiteAction() {
  await requireAdmin("admin");
  setSetting("site", defaultSite);
  refresh();
  redirect("/admin/settings");
}
export async function saveNotifyAction(_: State, fd: FormData): Promise<State> {
  const me = await requireAdmin("admin");
  const cur = getNotify();
  const next: NotifySettings = {
    email: str(fd, "email"), webhook: str(fd, "webhook"),
    smtp: { host: str(fd, "host"), port: Number(fd.get("port")) || 587, secure: fd.get("secure") === "on", user: str(fd, "user"), pass: String(fd.get("pass") ?? "") || cur.smtp.pass, from: str(fd, "from") },
  };
  if (next.webhook && !/^https?:\/\//.test(next.webhook)) return { error: "آدرس وب‌هوک باید با http(s) شروع شود." };
  setSetting("notify", next);
  audit(me.email, "edit", "settings:notify");
  return { ok: true, message: "تنظیمات اعلان ذخیره شد." };
}
export async function testNotifyAction(): Promise<State> {
  await requireAdmin("admin");
  const n = getNotify();
  const res: string[] = [];
  try {
    if (n.email && n.smtp.host) {
      await nodemailer.createTransport({ host: n.smtp.host, port: n.smtp.port, secure: n.smtp.secure, auth: n.smtp.user ? { user: n.smtp.user, pass: n.smtp.pass } : undefined })
        .sendMail({ from: n.smtp.from || n.smtp.user, to: n.email, subject: "آزمایش اعلان میکروشمیم", text: "این یک ایمیل آزمایشی از پنل مدیریت است." });
      res.push("ایمیل ارسال شد");
    } else res.push("ایمیل: تنظیم نشده");
    if (n.webhook) {
      const r = await fetch(n.webhook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ event: "test" }), signal: AbortSignal.timeout(8000) });
      res.push(`وب‌هوک: ${r.status}`);
    } else res.push("وب‌هوک: تنظیم نشده");
    return { ok: true, message: res.join(" • ") };
  } catch (e) { return { error: "خطا: " + (e as Error).message }; }
}

/* ───────── users ───────── */
export async function createUserAction(_: State, fd: FormData): Promise<State> {
  const me = await requireAdmin("admin");
  const email = str(fd, "email").toLowerCase(), pw = String(fd.get("password") ?? "");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "ایمیل معتبر نیست." };
  if (pw.length < 8) return { error: "گذرواژه حداقل ۸ نویسه باشد." };
  if (get("SELECT 1 FROM users WHERE email=?", email)) return { error: "این ایمیل قبلاً ثبت شده است." };
  run("INSERT INTO users(email,name,role,pass_hash) VALUES(?,?,?,?)", email, str(fd, "name"), str(fd, "role") === "admin" ? "admin" : "editor", hashPassword(pw));
  audit(me.email, "create", `user:${email}`);
  revalidatePath("/admin/users");
  return { ok: true, message: "کاربر ساخته شد." };
}
export async function updateUserAction(fd: FormData) {
  const me = await requireAdmin("admin");
  const id = Number(fd.get("id"));
  if (id === me.id && str(fd, "role") !== "admin") return;
  run("UPDATE users SET name=?, role=? WHERE id=?", str(fd, "name"), str(fd, "role") === "admin" ? "admin" : "editor", id);
  const pw = String(fd.get("password") ?? "");
  if (pw.length >= 8) run("UPDATE users SET pass_hash=? WHERE id=?", hashPassword(pw), id);
  audit(me.email, "edit", `user:${id}`);
  revalidatePath("/admin/users");
}
export async function deleteUserAction(fd: FormData) {
  const me = await requireAdmin("admin");
  const id = Number(fd.get("id"));
  if (id === me.id) return;
  run("DELETE FROM users WHERE id=?", id);
  audit(me.email, "delete", `user:${id}`);
  revalidatePath("/admin/users");
}
export async function changePasswordAction(_: State, fd: FormData): Promise<State> {
  const me = await requireAdmin();
  const u = get<{ pass_hash: string }>("SELECT pass_hash FROM users WHERE id=?", me.id)!;
  if (!verifyPassword(String(fd.get("current") ?? ""), u.pass_hash)) return { error: "گذرواژه فعلی درست نیست." };
  const pw = String(fd.get("password") ?? "");
  if (pw.length < 8) return { error: "گذرواژه جدید حداقل ۸ نویسه باشد." };
  if (pw !== String(fd.get("password2") ?? "")) return { error: "تکرار گذرواژه یکسان نیست." };
  run("UPDATE users SET pass_hash=? WHERE id=?", hashPassword(pw), me.id);
  const u2 = get<never>("SELECT * FROM users WHERE id=?", me.id)!;
  await createSession(u2); // old sessions die with the old hash; keep this one alive
  audit(me.email, "password", "self");
  return { ok: true, message: "گذرواژه تغییر کرد." };
}
