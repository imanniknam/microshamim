import { asset } from "@/lib/assets";
import { cn } from "@/lib/cn";
import type { CSSProperties } from "react";

type Props = {
  /** asset key, e.g. "doodles/doodle-crown" */
  name: string;
  /** rendered width in px (height follows the aspect ratio) */
  w: number;
  className?: string;
  style?: CSSProperties;
  rotate?: number;
  /** parallax factor used by lib/animations/global.ts (data-speed) */
  speed?: number;
  /** scroll-linked behaviour hook */
  anim?: "pop" | "float";
  eager?: boolean;
  /** marks the element as part of the hero intro timeline */
  hero?: "brush" | "doodle";
};

/** Decorative sticker / doodle / brush stroke cut from the MicroShamim asset pack. */
export function Doodle({ name, w, className, style, rotate = 0, speed, anim, eager, hero }: Props) {
  const a = asset(name);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={a.src}
      width={a.w}
      height={a.h}
      alt=""
      aria-hidden="true"
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={cn("doodle", className)}
      data-speed={speed}
      data-doodle={anim}
      data-hero-in={hero}
      style={{ width: w, height: "auto", rotate: rotate ? `${rotate}deg` : undefined, ...style }}
    />
  );
}
