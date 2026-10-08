import { $, $1, type Env, type G } from "./types";

export function intentMotion({ gsap }: G, env: Env) {
  const sec = $1('[data-chapter="intent"]');
  if (!sec) return;
  const bg = $1("[data-intent-bg]", sec);
  if (bg && !env.mobile) gsap.fromTo(bg, { yPercent: -6, scale: 1.12 }, { yPercent: 6, scale: 1.12, ease: "none", scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: true } });
  const cards = $("[data-intent-card]", sec);
  gsap.fromTo(cards, { y: 80, opacity: 0, rotation: () => gsap.utils.random(-6, 6) }, { y: 0, opacity: 1, rotation: 0, duration: 0.9, ease: "power3.out", stagger: 0.09, scrollTrigger: { trigger: "[data-intent-list]", start: "top 88%", toggleActions: "play none none reverse" } });
}
