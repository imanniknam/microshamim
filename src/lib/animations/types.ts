import type gsapNS from "gsap";
import type { ScrollTrigger as ST } from "gsap/ScrollTrigger";
import type { DrawSVGPlugin as DS } from "gsap/DrawSVGPlugin";

export type G = { gsap: typeof gsapNS; ScrollTrigger: typeof ST; DrawSVGPlugin: typeof DS };
export type Env = { desktop: boolean; tablet: boolean; mobile: boolean };
/** Every motion module may return a cleanup for non-GSAP resources (observers, listeners). */
export type Cleanup = void | (() => void);

export const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));
export const $1 = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel);
