import { $, $1, type Env, type G } from "./types";

export function skillsMotion({ gsap }: G, env: Env) {
  const sec = $1('[data-chapter="skills"]');
  if (!sec) return;
  const tags = $(env.desktop ? "[data-skill] .skill-tag" : "[data-skill-m] .skill-tag", sec);
  gsap.fromTo(tags, { scale: 0.4, opacity: 0, y: 40, rotation: () => gsap.utils.random(-25, 25) }, {
    scale: 1, opacity: 1, y: 0, rotation: (_i: number, el: HTMLElement) => parseFloat(getComputedStyle(el).getPropertyValue("--r")) || 0,
    duration: 0.9, ease: "back.out(1.6)", stagger: { each: 0.06, from: "random" },
    scrollTrigger: { trigger: env.desktop ? "[data-skill-universe]" : sec, start: "top 75%", toggleActions: "play none none reverse" },
  });
}
