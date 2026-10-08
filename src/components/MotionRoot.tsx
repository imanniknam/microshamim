"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Loads GSAP lazily (separate chunk, after hydration) and boots the motion system.
 * Renders nothing; all markup stays server-rendered.
 */
export function MotionRoot() {
  // The layout (and this component) survives client-side navigation, but the page DOM does not:
  // re-run the whole motion setup for every route so triggers bind to the new elements.
  const pathname = usePathname();
  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;
    const t = setTimeout(async () => {
      const [{ default: gsap }, { ScrollTrigger }, { DrawSVGPlugin }, { initMotion }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/DrawSVGPlugin"),
        import("@/lib/animations"),
      ]);
      if (cancelled) return;
      (window as unknown as { __mo?: boolean }).__mo = true; // cancels the no-JS safety timer in layout.tsx
      window.scrollTo(0, window.scrollY);
      dispose = initMotion({ gsap, ScrollTrigger, DrawSVGPlugin });
    }, 40);
    return () => {
      clearTimeout(t);
      cancelled = true;
      dispose?.();
    };
  }, [pathname]);
  return null;
}
