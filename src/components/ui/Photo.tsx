import Image from "next/image";
import { asset } from "@/lib/assets";
import { cn } from "@/lib/cn";
import type { CSSProperties } from "react";

type Props = {
  name: string; // "photos/p1-dream"
  alt: string;
  sizes: string;
  className?: string;
  style?: CSSProperties;
  /** CSS object-position for art-directed crops */
  pos?: string;
  priority?: boolean;
  quality?: number;
};

/** Fills its (positioned, sized) parent. Crop per section with `pos` + parent aspect. */
export function Photo({ name, alt, sizes, className, style, pos = "50% 50%", priority, quality = 85 }: Props) {
  const a = /^(\/|https?:)/.test(name) ? { src: name, w: 1600, h: 1200 } : asset(name);
  return (
    <Image
      src={a.src}
      alt={alt}
      fill
      sizes={sizes}
      quality={quality}
      priority={priority}
      className={cn("object-cover", className)}
      style={{ objectPosition: pos, ...style }}
    />
  );
}
