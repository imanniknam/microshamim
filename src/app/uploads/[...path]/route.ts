import fs from "node:fs";
import path from "node:path";
import { DATA_DIR } from "@/lib/server/db";

export const dynamic = "force-dynamic";
const TYPES: Record<string, string> = { ".webp": "image/webp", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".gif": "image/gif", ".svg": "image/svg+xml", ".avif": "image/avif", ".pdf": "application/pdf", ".mp4": "video/mp4" };

export async function GET(_: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path: parts } = await ctx.params;
  const root = path.join(DATA_DIR, "uploads");
  const file = path.join(root, ...parts);
  if (!file.startsWith(root + path.sep)) return new Response("Not found", { status: 404 });
  try {
    const buf = fs.readFileSync(file);
    const ext = path.extname(file).toLowerCase();
    return new Response(buf, { headers: { "content-type": TYPES[ext] ?? "application/octet-stream", "cache-control": "public, max-age=31536000, immutable", "content-security-policy": "default-src 'none'; img-src 'self'; style-src 'unsafe-inline'", "x-content-type-options": "nosniff" } });
  } catch { return new Response("Not found", { status: 404 }); }
}
