import { $, $1, type Env, type G } from "./types";

/** Chapter 10 — the event wall builds itself: polaroids drop, the sticky note slaps on. */
export function eventsMotion({ gsap }: G, env: Env) {
  const wall = $1("[data-wall]");
  if (!wall) return;
  const items = $("[data-wall-item]", wall);
  const tl = gsap.timeline({ scrollTrigger: { trigger: wall, start: "top 82%", end: env.mobile ? "center 65%" : "center 50%", scrub: 0.9 } });
  items.forEach((it, i) => {
    const f = parseFloat(it.dataset.from || "1");
    tl.fromTo(it, { y: -200, x: f * 60, rotation: f * 14, opacity: 0 }, { y: 0, x: 0, rotation: 0, opacity: 1, ease: "bounce.out", duration: 1.2 }, i * 0.28);
  });
}
