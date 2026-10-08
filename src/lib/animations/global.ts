import { $, type Cleanup, type Env, type G } from "./types";

/** Level 2 — generic reveals, headline line-masks and the lightweight parallax engine. */
export function globalMotion({ gsap }: G, env: Env): Cleanup {
  // plain block reveals (reversible: they go back when you scroll up)
  $("[data-reveal]").forEach((el) => {
    gsap.fromTo(
      el,
      { y: env.mobile ? 22 : 38, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" } },
    );
  });

  $("[data-reveal-stagger]").forEach((list) => {
    const items = $("[data-reveal-item]", list);
    gsap.fromTo(
      items,
      { x: env.mobile ? 0 : 56, y: env.mobile ? 24 : 0, opacity: 0 },
      { x: 0, y: 0, opacity: 1, duration: 0.8, stagger: 0.09, ease: "power3.out", scrollTrigger: { trigger: list, start: "top 85%", toggleActions: "play none none reverse" } },
    );
  });

  // headline lines — each line slides up out of its mask (hero has its own intro)
  const groups = new Map<Element, HTMLElement[]>();
  $("[data-line]").forEach((l) => {
    if (l.closest(".hero-title")) return;
    const key = l.parentElement!;
    groups.set(key, [...(groups.get(key) ?? []), l]);
  });
  groups.forEach((lines, parent) => {
    gsap.fromTo(
      lines.map((l) => l.firstElementChild!),
      { yPercent: 115 },
      { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.12, scrollTrigger: { trigger: parent, start: "top 88%", toggleActions: "play none none reverse" } },
    );
  });

  // pop-in doodles ("Star → achievement")
  $("[data-doodle='pop']").forEach((el) => {
    gsap.fromTo(el, { scale: 0, opacity: 0, rotation: -40 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: "back.out(2)", scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" } });
  });


  /* ── parallax engine ───────────────────────────────────────────────
     One scroll listener + IntersectionObserver; only on-screen [data-speed] nodes are
     touched, and only through the individual `translate` property (no clash with
     GSAP's transform or the CSS `rotate` used for paper tilt). */
  const nodes = $("[data-speed]");
  const live = new Set<HTMLElement>();
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => (e.isIntersecting ? live.add(e.target as HTMLElement) : live.delete(e.target as HTMLElement))),
    { rootMargin: "20% 0px 20% 0px" },
  );
  nodes.forEach((n) => io.observe(n));
  let raf = 0;
  const tick = () => {
    raf = 0;
    const vh = window.innerHeight;
    live.forEach((el) => {
      const speed = parseFloat(el.dataset.speed || "0");
      const r = el.getBoundingClientRect();
      const cur = parseFloat(el.dataset.py || "0");
      const center = r.top + r.height / 2 - cur;
      const p = (center - vh / 2) / vh; // -1 … 1
      const y = Math.round(-p * speed * (env.mobile ? 110 : 240) * 10) / 10;
      el.dataset.py = String(y);
      el.style.translate = `0 ${y}px`;
    });
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    io.disconnect();
    cancelAnimationFrame(raf);
    nodes.forEach((n) => { n.style.translate = ""; delete n.dataset.py; });
  };
}
