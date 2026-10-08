import { $, $1, type Env, type G } from "./types";

/** Level 3 — Chapter 01: the creative space reveals itself, then transforms on scroll. */
export function heroMotion({ gsap }: G, env: Env, firstRun: boolean) {
  const hero = $1('[data-chapter="hero"]');
  if (!hero) return;
  const q = <T extends HTMLElement = HTMLElement>(s: string) => $<T>(s, hero);

  if (firstRun) {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(q('[data-hero-in="brush"]'), { opacity: 0, scale: 0.55 }, { opacity: 1, scale: 1, duration: 1.1, ease: "expo.out", stagger: 0.12 }, 0.05)
      .fromTo(q("[data-hero-girl]"), { opacity: 1, clipPath: "inset(100% 0% 0% 0%)", y: 36 }, { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 1.25, ease: "power4.out", clearProps: "clipPath" }, 0.3)
      .set(q(".hero-title .line-mask"), { opacity: 1 }, 0.45)
      .fromTo(q(".hero-title .line-mask > span"), { yPercent: 115 }, { yPercent: 0, duration: 0.95, ease: "power4.out", stagger: 0.13 }, 0.45)
      .fromTo(q('[data-hero-in="text"]'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, 0.95)
      .fromTo(q('[data-hero-in="doodle"]'), { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.75, ease: "back.out(1.9)", stagger: 0.07 }, 1.0)
      .fromTo(q('[data-hero-in="hand"]'), { opacity: 0, y: 16, rotation: -10 }, { opacity: 1, y: 0, rotation: -6, duration: 0.8 }, 1.2)
      .fromTo(q('[data-hero-in="cta"]'), { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 1.25)
      .fromTo(q("[data-quick-item]"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.07, clearProps: "opacity,transform" }, 1.35);
  } else {
    gsap.set($("[data-hero-in]", hero), { clearProps: "opacity,transform,clipPath" });
    gsap.set(q(".hero-title .line-mask"), { opacity: 1 });
    gsap.set(q(".hero-title .line-mask > span"), { yPercent: 0 });
  }

  // scroll transformation: "discover" → "experience"
  gsap
    .timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: hero, start: "top top", end: "bottom 20%", scrub: 0.8 } })
    .to(q("[data-hero-art]"), { scale: env.mobile ? 0.94 : 0.9, y: 36, transformOrigin: "50% 90%" }, 0)
    .to(q("[data-hero-girl]"), { y: -24 }, 0)
    .to(q("[data-hero-parallax]"), { y: -80, rotation: 2 }, 0)
    .to(q("[data-hero-parallax-fast]"), { y: -150 }, 0)
    .to(q("[data-hero-polaroid]"), { y: -60, rotation: -9 }, 0)
    .to(q(".hero-title"), { y: -46 }, 0)
    .to(q('[data-hero-in="text"], [data-hero-in="cta"]'), { y: -26 }, 0)
    .to(q("[data-hero-wipe]"), { scaleY: 1 }, 0.25);
}
