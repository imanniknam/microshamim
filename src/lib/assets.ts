import manifest from "./asset-manifest.json";

export type AssetInfo = { src: string; w: number; h: number };
const m = manifest as Record<string, AssetInfo>;

/** Look up an asset by "group/name" (e.g. "photos/p1-dream"). Throws in dev if missing. */
export function asset(key: string): AssetInfo {
  const a = m[key];
  if (!a) throw new Error(`[assets] missing "${key}" — run scripts/build_assets.py`);
  return a;
}

/** Resolve a CMS image value: "asset:photos/p1-dream" (bundled art) | "/uploads/…" | absolute URL. */
export function resolveImage(v?: string): { src: string; w: number; h: number } | null {
  if (!v) return null;
  if (v.startsWith("asset:")) {
    try { return asset(v.slice(6)); } catch { return null; }
  }
  return { src: v, w: 1600, h: 1200 };
}
