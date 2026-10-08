import "server-only";
import { all, get, getSetting } from "./db";
import { defaultNotify, defaultSite } from "./seed";
import { homeDefaults, type HomeContent } from "@/data/home-defaults";
import type { Block, NotifySettings, SiteSettings } from "../types";

export function getSite(): SiteSettings {
  const s = getSetting<Partial<SiteSettings>>("site", {});
  return { ...defaultSite, ...s, socials: { ...defaultSite.socials, ...(s.socials ?? {}) }, seo: { ...defaultSite.seo, ...(s.seo ?? {}) } };
}
export function getNotify(): NotifySettings {
  const s = getSetting<Partial<NotifySettings>>("notify", {});
  return { ...defaultNotify, ...s, smtp: { ...defaultNotify.smtp, ...(s.smtp ?? {}) } };
}

/** Merge DB overrides on top of defaults: arrays are replaced, objects merged, so new default keys still appear. */
function merge<T>(base: T, over: unknown): T {
  if (Array.isArray(base)) return (Array.isArray(over) ? over : base) as T;
  if (base && typeof base === "object" && over && typeof over === "object" && !Array.isArray(over)) {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const k of Object.keys(over as object)) out[k] = merge((base as Record<string, unknown>)[k], (over as Record<string, unknown>)[k]);
    return out as T;
  }
  return (over === undefined ? base : over) as T;
}
export function getHome(): HomeContent {
  const r = get<{ content: string }>("SELECT content FROM home WHERE id = 1");
  if (!r) return homeDefaults;
  try { return merge(homeDefaults, JSON.parse(r.content)); } catch { return homeDefaults; }
}

export type PageRow = { slug: string; title: string; seo_title: string; seo_desc: string; blocks: Block[]; published: number; updated_at: string };
export function getPage(slug: string): PageRow | null {
  const r = get<Omit<PageRow, "blocks"> & { blocks: string }>("SELECT * FROM pages WHERE slug = ?", slug);
  if (!r) return null;
  let blocks: Block[] = [];
  try { blocks = JSON.parse(r.blocks); } catch {}
  return { ...r, blocks };
}
export const listPages = () => all<{ slug: string; title: string; published: number; updated_at: string }>("SELECT slug,title,published,updated_at FROM pages ORDER BY rowid");

export type Post = { id: number; slug: string; title: string; excerpt: string; body: string; cover: string; category: string; author: string; status: string; published_at: string | null; created_at: string; updated_at: string };
export const listPosts = (onlyPublished = true, limit = 100) =>
  all<Post>(`SELECT * FROM posts ${onlyPublished ? "WHERE status='published' AND (published_at IS NULL OR published_at <= datetime('now'))" : ""} ORDER BY COALESCE(published_at, created_at) DESC LIMIT ?`, limit);
export const getPost = (slug: string, onlyPublished = true) =>
  get<Post>(`SELECT * FROM posts WHERE slug = ? ${onlyPublished ? "AND status='published'" : ""}`, slug);

export type EventRow = { id: number; slug: string; title: string; kind: string; starts_at: string | null; place: string; description: string; image: string; link: string; status: string };
export const listEvents = (onlyPublished = true) =>
  all<EventRow>(`SELECT * FROM events ${onlyPublished ? "WHERE status='published'" : ""} ORDER BY starts_at DESC, id DESC`);
export const getEvent = (slug: string) => get<EventRow>("SELECT * FROM events WHERE slug = ? AND status='published'", slug);

export type Course = { id: number; title: string; summary: string; audience: string; image: string; link: string; sort: number; status: string };
export const listCourses = (onlyPublished = true) =>
  all<Course>(`SELECT * FROM courses ${onlyPublished ? "WHERE status='published'" : ""} ORDER BY sort, id`);
