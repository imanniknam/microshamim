import { $, $1, type Env, type G } from "./types";

/** Mid-page chapter: the scale model opens up like a window, then slowly pushes in; close-ups drop onto its edge. */
export function modelMotion({ gsap }: G, env: Env) {
  const sec = $1('[data-chapter="model"]');
  if (!sec) return;
  const clip = $1("[data-model-clip]", sec);
  const img = $1("[data-model-img]", sec);
  const frame = $1("[data-model-frame]", sec);
  if (clip) gsap.fromTo(clip, { clipPath: env.mobile ? "inset(14% 10% 14% 10%)" : "inset(22% 18% 22% 18%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: frame ?? clip, start: "top 90%", end: "top 35%", scrub: 0.7 } });
  if (img) gsap.fromTo(img, { scale: 1.22 }, { scale: 1.02, ease: "none", scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: 0.6 } });
  const thumbs = $("[data-model-thumb]", sec);
  if (thumbs.length) gsap.fromTo(thumbs, { y: env.mobile ? 40 : -120, opacity: 0, rotation: (i: number) => (i % 2 ? 8 : -8) }, { y: 0, opacity: 1, rotation: 0, ease: "bounce.out", duration: 1.1, stagger: 0.16, scrollTrigger: { trigger: "[data-model-thumbs]", start: "top 92%", toggleActions: "play none none reverse" } });
}
