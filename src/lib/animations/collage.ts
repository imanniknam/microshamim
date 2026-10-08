import { $, $1, type Env, type G } from "./types";

/** Chapter 04 — the scrapbook: photos fly in from different sides and settle; fully reversible on scroll-up. */
export function collageMotion({ gsap }: G, env: Env) {
  const wrap = $1("[data-collage]");
  if (!wrap) return;
  const items = $("[data-collage-item]", wrap);
  const dir = (f: string | undefined): Record<string, number> => {
    switch (f) {
      case "start": return { x: 190, rotation: 6 };      // from the right (RTL start)
      case "end": return { x: -190, rotation: -7 };
      case "bottom": return { y: 190, rotation: 5 };
      default: return { scale: 0.8, rotation: -4 };
    }
  };
  if (env.mobile) {
    items.forEach((it) => gsap.fromTo(it, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: it, start: "top 92%", toggleActions: "play none none reverse" } }));
    return;
  }
  const tl = gsap.timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: wrap, start: "top 82%", end: "center 55%", scrub: 0.9 } });
  items.forEach((it, i) => tl.fromTo(it, { ...dir(it.dataset.from), opacity: 0 }, { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, duration: 1 }, i * 0.2));
}
