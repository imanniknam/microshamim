import type { HomeContent } from "@/data/home-defaults";
import { Doodle } from "../ui/Doodle";
import { Icon } from "../ui/Icon";
import { Lines } from "../ui/Lines";

/* Hand-drawn route (viewBox 1200x420). Steps are positioned at the same coordinates (x/1200, y/420). */
const pts = [
  [1085, 310], [902, 170], [719, 320], [536, 175], [353, 320], [170, 190],
];
const d = (() => {
  let s = `M1190 380 C1150 380 1130 ${pts[0][1]} ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1];
    const [x, y] = pts[i];
    const mx = (px + x) / 2;
    s += ` C${mx + 30} ${py}, ${mx - 30} ${y}, ${x} ${y}`;
  }
  s += ` C110 ${pts[5][1]} 70 260 18 290`;
  return s;
})();

export function LearnLoopSection({ h }: { h: HomeContent }) {
  const t = h.texts;
  const { learnSteps } = h;
  return (
    <section id="learn" className="chapter relative py-12 sm:py-16 lg:py-28 bg-tint-lilac/55 paper-fibre overflow-x-clip" aria-labelledby="learn-title" data-chapter="learn">
      <div aria-hidden className="absolute inset-x-0 top-0 h-6 bg-cream torn-bottom" style={{ transform: "scaleY(-1)" }} />
      <div className="container-x relative">
        <div className="max-w-3xl">
          <p className="hand text-purple text-lg">{t.learnEyebrow}</p>
          <h2 id="learn-title" className="display-lg mt-1">
            <Lines lines={[t.learnL1, <span key="a" className="relative inline-block">{t.learnL2}<Doodle name="doodles/doodle-circle-yellow" w={300} className="-z-10" style={{ width: "calc(100% + 64px)", height: "calc(100% + 34px)", insetInlineStart: -32, top: -14, maxWidth: "none", objectFit: "fill" }} /></span>]} />
          </h2>
          <p className="lead mt-5 max-w-2xl text-navy/80" data-reveal>
            {t.learnIntro}
          </p>
        </div>

        {/* desktop: route drawn across the page */}
        <div className="relative mt-14 hidden lg:block aspect-[1200/480]" data-learn-route>
          <svg viewBox="0 0 1200 480" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
            <path d={d} fill="none" stroke="rgba(16,22,47,.14)" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 14" />
            <path data-learn-path d={d} fill="none" stroke="#6C35D9" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {learnSteps.map((s, i) => (
            <div key={s.title} data-learn-step className="absolute size-0" style={{ left: `${(pts[i][0] / 1200) * 100}%`, top: `${(pts[i][1] / 480) * 100}%` }}>
              {/* circle sits exactly on the route point */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center size-[88px] rounded-full border-2 border-navy shadow-[4px_5px_0_-1px_rgba(16,22,47,.9)]" style={{ background: s.color, rotate: `${[-6, 5, -4, 6, -5, 4][i]}deg` }}>
                <Icon name={s.icon} className="size-9" />
                <span className="absolute -top-2 -end-2 grid place-items-center size-8 rounded-full bg-navy text-white text-sm font-display font-black">{(i + 1).toLocaleString("fa-IR")}</span>
              </div>
              {/* label goes where the line is not: above the peaks, below the valleys */}
              <div className={`absolute left-1/2 -translate-x-1/2 w-[210px] text-center ${pts[i][1] < 250 ? "bottom-[58px]" : "top-[58px]"}`}>
                <h3 className="font-display font-black text-xl leading-tight">{s.title}</h3>
                <p className="mt-0.5 text-[0.8rem] leading-[1.7] text-navy/75">{s.text}</p>
              </div>
            </div>
          ))}
          <Doodle name="doodles/doodle-star-yellow" w={40} className="top-[2%] start-[44%]" anim="pop" />
          <Doodle name="doodles/doodle-heart" w={34} className="bottom-[6%] start-[24%]" rotate={10} />
        </div>

        {/* mobile / tablet: vertical route */}
        <ol className="relative mt-12 lg:hidden ps-0 pe-14 border-none" data-learn-vertical>
          <span aria-hidden className="absolute top-2 bottom-2 end-[26px] w-[5px] rounded bg-navy/10" />
          <span aria-hidden data-learn-vline className="absolute top-2 bottom-2 end-[26px] w-[5px] rounded bg-purple origin-top" />
          {learnSteps.map((s, i) => (
            <li key={s.title} data-learn-vstep className="relative pb-9 last:pb-0">
              <span className="absolute -end-14 top-0 grid place-items-center size-[54px] rounded-full border-2 border-navy" style={{ background: s.color }}>
                <Icon name={s.icon} className="size-6" />
              </span>
              <h3 className="font-display font-black text-xl pt-1">{s.title}</h3>
              <p className="mt-1 text-[0.92rem] text-navy/75">{s.text}</p>
            </li>
          ))}
        </ol>

        {/* the statement */}
        <div className="relative mt-10 lg:mt-20 text-center" data-learn-statement>
          <p className="font-display text-navy/70 font-extrabold mb-3">{t.learnLead}</p>
          <p className="display-lg relative inline-block max-w-4xl">
            «<span className="marker" style={{ ["--marker" as string]: "var(--color-yellow)" }}>{t.learnStatement}</span>»
            <Doodle name="doodles/doodle-star-outline" w={64} className="-top-8 -end-6" rotate={10} anim="pop" />
            <Doodle name="doodles/doodle-burst-pink" w={56} className="-bottom-6 -start-8" anim="pop" />
          </p>
        </div>
      </div>
    </section>
  );
}
