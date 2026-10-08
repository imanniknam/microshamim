import { $, $1, type Env, type G } from "./types";

/** Level 3 — Final chapter: the poster settles; CSS (sticky footer under a higher-z main) reveals the footer beneath it. */
export function finaleMotion({ gsap }: G, env: Env) {
  const poster = $1("[data-poster]");
  if (!poster) return;
  const sheets = $(":scope > div[aria-hidden]", poster);
  gsap.fromTo(poster, { y: env.mobile ? 40 : 110, scale: 0.94, rotation: -2 }, { y: 0, scale: 1, rotation: 0, ease: "none", scrollTrigger: { trigger: poster, start: "top 96%", end: "top 40%", scrub: 0.7 } });
  gsap.fromTo(sheets, { x: 0, y: 0, rotation: 0 }, { x: (i: number) => (i ? -14 : 16), y: (i: number) => (i ? 12 : 18), rotation: (i: number) => (i ? -2.4 : 2.6), ease: "none", scrollTrigger: { trigger: poster, start: "top 80%", end: "bottom 80%", scrub: 0.8 } });
  void $;
}
