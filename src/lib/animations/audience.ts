import { $, $1, type Env, type G } from "./types";

export function audienceMotion({ gsap }: G, env: Env) {
  const list = $1("[data-aud-list]");
  if (!list) return;
  const cards = $("[data-aud-card] > a", list);
  const rot = [-9, 7, -6];
  cards.forEach((c, i) => {
    gsap.fromTo(c, { y: env.mobile ? 50 : 110, x: env.mobile ? 0 : (i - 1) * -60, rotation: (c.style.rotate ? parseFloat(c.style.rotate) : 0) + rot[i % 3], opacity: 0 }, { y: 0, x: 0, rotation: parseFloat(c.style.rotate || "0"), opacity: 1, duration: 1.05, ease: "power3.out", scrollTrigger: { trigger: c, start: "top 92%", toggleActions: "play none none reverse" } });
  });
}
