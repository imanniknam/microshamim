import { $, $1, type Env, type G } from "./types";

/** Chapter 06 — "connection": photos link up with hand-drawn lines and little nodes. */
export function coworkMotion({ gsap }: G, env: Env) {
  const art = $1("[data-cowork-art]");
  if (!art) return;
  const items = $("[data-cowork-item]", art);
  const lines = $<SVGPathElement>("[data-cowork-line]", art);
  const nodes = $("[data-cowork-node]", art);

  const tl = gsap.timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: art, start: "top 80%", end: env.mobile ? "center 60%" : "center 45%", scrub: 0.9 } });
  items.forEach((it, i) => tl.fromTo(it, { y: 90 + i * 20, x: (i % 2 ? -1 : 1) * (env.mobile ? 0 : 70), opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 1 }, i * 0.25));
  lines.forEach((l, i) => tl.fromTo(l, { drawSVG: "0%" }, { drawSVG: "100%", ease: "none", duration: 1 }, 0.7 + i * 0.3));
  nodes.forEach((n, i) => tl.fromTo(n, { scale: 0 }, { scale: 1, ease: "back.out(2.2)", duration: 0.45 }, 0.9 + i * 0.25));
}
