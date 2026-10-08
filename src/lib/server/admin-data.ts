import "server-only";
import manifest from "../asset-manifest.json";
import { all } from "./db";
import type { AssetItem, MediaItem } from "@/components/admin/JsonEditor";

export const adminAssets = (): AssetItem[] =>
  Object.entries(manifest as Record<string, { src: string }>)
    .filter(([k]) => k.startsWith("photos/") || k.startsWith("model/") || k.startsWith("collage/") || k.startsWith("stickers/"))
    .map(([key, v]) => ({ key, src: v.src }));
export const adminMedia = (): MediaItem[] =>
  all<{ url: string; alt: string; filename: string }>("SELECT url, alt, filename FROM media ORDER BY id DESC");
