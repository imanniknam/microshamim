import { $, $1, type Env, type G } from "./types";

/** Level 3 — Chapter 05: cream gives way to the navy cinema, then slow-camera moves. */
export function studioMotion({ gsap }: G, env: Env) {
  const sec = $1('[data-chapter="studio"]');
  const shell = $1("[data-studio-shell]", sec ?? document);
  if (!sec || !shell) return;

  {
    // expanding dark paper: starts as a rounded card, ends full-bleed
    gsap.fromTo(
      shell,
      { clipPath: env.mobile ? "inset(8% 4% 3% 4% round 36px)" : "inset(16% 5% 6% 5% round 64px)" },
      { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: sec, start: "top 92%", end: "top 12%", scrub: 0.6 } },
    );
    // slow push-in on the studio photo
    const zoom = $1("[data-studio-zoom]", sec);
    if (zoom) gsap.fromTo(zoom, { scale: 1.1, yPercent: -2 }, { scale: 1.0, yPercent: 2, ease: "none", scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: 0.5 } });
    // "text tracking": letter-spacing relaxes as the line settles
    const tr = $1("[data-studio-tracking]", sec);
    if (tr) gsap.fromTo(tr, { letterSpacing: "0.14em", opacity: 0.2 }, { letterSpacing: "0em", opacity: 1, ease: "power2.out", scrollTrigger: { trigger: tr, start: "top 92%", end: "top 55%", scrub: 0.6 } });
  }

  // camera-like horizontal reveal of the capability cards
  const cards = $("[data-studio-card]", sec);
  const list = $1("[data-studio-cards]", sec);
  if (list) {
    gsap.fromTo(
      cards,
      { x: env.mobile ? 0 : 130, y: env.mobile ? 40 : 0, opacity: 0, clipPath: "inset(0% 0% 0% 100%)" },
      { x: 0, y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power3.out", stagger: 0.11, clearProps: "clipPath", scrollTrigger: { trigger: list, start: "top 88%", toggleActions: "play none none reverse" } },
    );
  }
}
