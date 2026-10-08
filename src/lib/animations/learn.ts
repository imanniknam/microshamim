import { $, $1, type Env, type G } from "./types";

/** Chapter 03 — a hand-drawn route links class → challenge → project → … → feedback. */
export function learnMotion({ gsap }: G, env: Env) {
  const root = $1('[data-chapter="learn"]');
  if (!root) return;

  const route = $1("[data-learn-route]", root);
  if (route && getComputedStyle(route).display !== "none") {
    const path = $1<SVGPathElement>("[data-learn-path]", route)!;
    const steps = $("[data-learn-step]", route);
    const tl = gsap.timeline({ scrollTrigger: { trigger: route, start: "top 75%", end: "bottom 55%", scrub: 0.8 } });
    tl.fromTo(path, { drawSVG: "0%" }, { drawSVG: "100%", ease: "none", duration: steps.length }, 0);
    steps.forEach((s, i) => {
      tl.fromTo(s, { scale: 0.55, opacity: 0, y: 24 }, { scale: 1, opacity: 1, y: 0, duration: 0.55, ease: "back.out(1.7)" }, Math.max(0, i - 0.35));
    });
  }

  const vline = $1("[data-learn-vline]", root);
  if (vline) {
    const list = $1("[data-learn-vertical]", root)!;
    gsap.fromTo(vline, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: list, start: "top 70%", end: "bottom 60%", scrub: true } });
    $("[data-learn-vstep]", root).forEach((s) =>
      gsap.fromTo(s, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: s, start: "top 88%", toggleActions: "play none none reverse" } }),
    );
  }

  const st = $1("[data-learn-statement]", root);
  if (st) {
    gsap.fromTo(st, { scale: env.mobile ? 0.96 : 0.88, opacity: 0 }, { scale: 1, opacity: 1, ease: "power3.out", scrollTrigger: { trigger: st, start: "top 90%", end: "top 55%", scrub: 0.7 } });
  }
}
