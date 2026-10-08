import "server-only";
import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import { seedIfEmpty } from "./seed";

/** Persistent data dir (DB + uploads). Override with DATA_DIR in production (mount a volume). */
export const DATA_DIR = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(process.cwd(), "data");

const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'editor', pass_hash TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')), last_login TEXT
);
CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS pages (
  slug TEXT PRIMARY KEY, title TEXT NOT NULL, seo_title TEXT DEFAULT '', seo_desc TEXT DEFAULT '',
  blocks TEXT NOT NULL DEFAULT '[]', published INTEGER NOT NULL DEFAULT 1, updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS home (id INTEGER PRIMARY KEY CHECK (id = 1), content TEXT NOT NULL, updated_at TEXT NOT NULL DEFAULT (datetime('now')));
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT UNIQUE NOT NULL, title TEXT NOT NULL, excerpt TEXT DEFAULT '', body TEXT DEFAULT '',
  cover TEXT DEFAULT '', category TEXT DEFAULT '', author TEXT DEFAULT '', status TEXT NOT NULL DEFAULT 'draft',
  published_at TEXT, created_at TEXT NOT NULL DEFAULT (datetime('now')), updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT UNIQUE NOT NULL, title TEXT NOT NULL, kind TEXT DEFAULT '', starts_at TEXT, place TEXT DEFAULT '',
  description TEXT DEFAULT '', image TEXT DEFAULT '', link TEXT DEFAULT '', status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL DEFAULT (datetime('now')), updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, summary TEXT DEFAULT '', audience TEXT DEFAULT 'all', image TEXT DEFAULT '',
  link TEXT DEFAULT '', sort INTEGER NOT NULL DEFAULT 0, status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL DEFAULT (datetime('now')), updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS media (
  id INTEGER PRIMARY KEY AUTOINCREMENT, filename TEXT NOT NULL, url TEXT NOT NULL, mime TEXT, size INTEGER, w INTEGER, h INTEGER, alt TEXT DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT NOT NULL, name TEXT DEFAULT '', phone TEXT DEFAULT '', email TEXT DEFAULT '',
  data TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'new', note TEXT DEFAULT '', source TEXT DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now')), updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_sub_type ON submissions(type, status, created_at);
CREATE TABLE IF NOT EXISTS subscribers (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')));
CREATE TABLE IF NOT EXISTS audit (id INTEGER PRIMARY KEY AUTOINCREMENT, user_email TEXT, action TEXT, entity TEXT, at TEXT NOT NULL DEFAULT (datetime('now')));
CREATE TABLE IF NOT EXISTS ratelimit (k TEXT PRIMARY KEY, n INTEGER NOT NULL, reset INTEGER NOT NULL);
`;

const g = globalThis as unknown as { __shamimDb?: DatabaseSync };

export function db(): DatabaseSync {
  if (g.__shamimDb) return g.__shamimDb;
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const d = new DatabaseSync(path.join(DATA_DIR, "shamim.db"));
  d.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;");
  d.exec(SCHEMA);
  g.__shamimDb = d;
  seedIfEmpty(d);
  return d;
}

type Row = Record<string, unknown>;
// node:sqlite returns null-prototype rows; React refuses to serialise those to client components → copy to plain objects.
const plain = <T,>(r: unknown) => ({ ...(r as object) }) as T;
export const all = <T = Row>(sql: string, ...p: unknown[]) => db().prepare(sql).all(...(p as never[])).map((r) => plain<T>(r));
export const get = <T = Row>(sql: string, ...p: unknown[]) => { const r = db().prepare(sql).get(...(p as never[])); return r ? plain<T>(r) : undefined; };
export const run = (sql: string, ...p: unknown[]) => db().prepare(sql).run(...(p as never[]));

export function getSetting<T>(key: string, fallback: T): T {
  const r = get<{ value: string }>("SELECT value FROM settings WHERE key = ?", key);
  if (!r) return fallback;
  try { return JSON.parse(r.value) as T; } catch { return fallback; }
}
export function setSetting(key: string, value: unknown) {
  run("INSERT INTO settings(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value", key, JSON.stringify(value));
}
