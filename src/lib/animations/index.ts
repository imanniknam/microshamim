import { globalMotion } from "./global";
import { heroMotion } from "./hero";
import { experienceMotion } from "./experience";
import { learnMotion } from "./learn";
import { collageMotion } from "./collage";
import { modelMotion } from "./model";
import { studioMotion } from "./studio";
import { coworkMotion } from "./coworking";
import { journeyMotion } from "./journey";
import { audienceMotion } from "./audience";
import { skillsMotion } from "./skills";
import { eventsMotion } from "./events";
import { intentMotion } from "./intent";
import { finaleMotion } from "./finale";
import type { Env, G } from "./types";

let introPlayed = false;

/**
 * Single entry point. gsap.matchMedia() owns lifecycle: when the viewport/reduced-motion
 * condition changes it reverts every tween + ScrollTrigger created here and re-runs us.
 */
export function initMotion(g: G) {
  introPlayed = false; // every (re)mount of a page replays its intro
  const { gsap, ScrollTrigger, DrawSVGPlugin } = g;
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsap.defaults({ overwrite: "auto" });

  const mm = gsap.matchMedia();
  mm.add(
    {
      desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      tablet: "(min-width: 768px) and (max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
      mobile: "(max-width: 767.98px) and (prefers-reduced-motion: no-preference)",
      reduce: "(prefers-reduced-motion: reduce)",
    },
    (ctx) => {
      const c = ctx.conditions as Record<string, boolean>;
      const root = document.documentElement;
      if (c.reduce) {
        root.classList.remove("motion-ok");
        return;
      }
      root.classList.add("motion-ok");
      const env: Env = { desktop: !!c.desktop, tablet: !!c.tablet, mobile: !!c.mobile };
      // calmer, more cinematic pace on desktop (scrubbed tweens catch up more softly too)
      gsap.globalTimeline.timeScale(env.desktop ? 0.68 : 1);

      const cleanups = [
        globalMotion(g, env),
        heroMotion(g, env, !introPlayed),
        experienceMotion(g, env),
        learnMotion(g, env),
        collageMotion(g, env),
        modelMotion(g, env),
        studioMotion(g, env),
        coworkMotion(g, env),
        journeyMotion(g, env),
        audienceMotion(g, env),
        skillsMotion(g, env),
        eventsMotion(g, env),
        intentMotion(g, env),
        finaleMotion(g, env),
      ];
      introPlayed = true;
      return () => cleanups.forEach((fn) => typeof fn === "function" && fn());
    },
  );

  // layout settles after webfonts / lazy images: recompute trigger positions
  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);
  window.addEventListener("load", refresh, { once: true });

  return () => mm.revert();
}
