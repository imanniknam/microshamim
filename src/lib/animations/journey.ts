import { $, $1, type Env, type G } from "./types";

/** Level 3 — Chapter 07: desktop pins and travels horizontally along the growth route; mobile is a vertical timeline. */
export function journeyMotion({ gsap, ScrollTrigger }: G, env: Env) {
  const sec = $1("[data-journey]");
  if (!sec) return;
  const pin = $1("[data-journey-pin]", sec)!;
  const track = $1("[data-journey-track]", sec)!;
  const wave = $1("[data-journey-wave]", sec);
  const girl = $1("[data-journey-girl]", sec);
  const steps = $("[data-journey-step]", sec);

  {
    const dist = () => Math.max(0, track.offsetWidth - pin.clientWidth);
    // RTL: the track starts flush with the right edge; moving it to +x reveals what lies to the left
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: pin, pin: true, start: "top top", end: () => "+=" + dist() * 1.05, scrub: 0.7, anticipatePin: 1, invalidateOnRefresh: true },
    });
    tl.to(track, { x: () => dist(), duration: 1 }, 0);
    if (wave) tl.fromTo(wave, { clipPath: "inset(-20px 0 -20px 100%)" }, { clipPath: "inset(-20px 0 -20px 0%)", duration: 0.92 }, 0.04);
    if (girl) tl.to(girl, { x: () => -dist() * 0.14, duration: 1 }, 0);
    // dots wake up as the route reaches them
    steps.forEach((s, i) => {
      const dot = $1("[data-journey-dot]", s);
      if (dot) tl.fromTo(dot, { scale: 0.4, backgroundColor: "#ffffff" }, { scale: 1.25, backgroundColor: "#FFD629", duration: 0.04, ease: "back.out(3)" }, 0.08 + (i / steps.length) * 0.8);
    });
  }
  void ScrollTrigger; void env;
}
