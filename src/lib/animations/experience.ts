import { $, $1, type Env, type G } from "./types";

/** Chapter 02 — the five/six cards arrive from different sides and settle into one composition. */
export function experienceMotion({ gsap }: G, env: Env) {
  const list = $1("[data-xp-list]");
  if (!list) return;
  const cards = $("[data-xp-card] > article", list);

  if (env.mobile || env.tablet) {
    cards.forEach((c) =>
      gsap.fromTo(c, { y: 60, rotation: (cards.indexOf(c) % 2 ? 4 : -4), opacity: 0 }, { y: 0, rotation: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: c, start: "top 90%", toggleActions: "play none none reverse" } }),
    );
    return;
  }

  const from = [
    { x: 220, y: 40, rotation: 9 },    // 1 — slides in from the right edge
    { x: 0, y: 190, rotation: -5 },    // 2 — rises and lands partly over card 1
    { x: -160, y: 90, rotation: 7 },   // 3 — drifts in from the other direction
    { x: 0, y: 150, rotation: -9, scale: 0.88 }, // 4 — tilts into place
    { x: 140, y: 110, rotation: 6 },   // 5
    { x: -240, y: 30, rotation: -7 },  // 6 — pushes forward last
  ];
  const tl = gsap.timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: list, start: "top 88%", end: "top 25%", scrub: 0.9 } });
  cards.forEach((c, i) => tl.fromTo(c, { ...from[i % from.length], opacity: 0 }, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 1 }, i * 0.18));
}
