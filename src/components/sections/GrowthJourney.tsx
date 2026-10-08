import Image from "next/image";
import type { HomeContent } from "@/data/home-defaults";
import { asset } from "@/lib/assets";
import { Btn } from "../ui/Button";
import { Doodle } from "../ui/Doodle";
import { Icon } from "../ui/Icon";

const wave = "M3000 120 C2850 40, 2700 200, 2550 120 S2250 40, 2100 120 S1800 200, 1650 120 S1350 40, 1200 120 S900 200, 750 120 S450 40, 300 120 S60 170, 0 120";

export function GrowthJourney({ h }: { h: HomeContent }) {
  const t = h.texts;
  const { journey } = h;
  const girl = asset("collage/cutout-journey");
  return (
    <section id="journey" className="chapter on-purple relative bg-purple text-white" aria-labelledby="journey-title" data-chapter="journey" data-journey>
      <div aria-hidden className="absolute inset-0 opacity-[.16] halftone-dots text-white pointer-events-none" style={{ maskImage: "radial-gradient(ellipse at 15% 100%, #000, transparent 55%)", WebkitMaskImage: "radial-gradient(ellipse at 15% 100%, #000, transparent 55%)" }} />
      <div aria-hidden className="absolute inset-0 opacity-30 mix-blend-multiply pointer-events-none" style={{ backgroundImage: "url(/assets/shamim/textures/paper.jpg)", backgroundSize: "480px" }} />

      <div className="relative overflow-hidden h-svh min-h-[560px] flex items-center" data-journey-pin>
        <div className="relative flex flex-row items-center h-full gap-6 lg:gap-8 w-max ps-[var(--gutter)] pe-[max(var(--gutter),calc((100vw-1360px)/2+var(--gutter)))]" data-journey-track>
          {/* intro */}
          <div className="relative z-10 w-[84vw] sm:w-[60vw] lg:w-[min(620px,46vw)] shrink-0 grid items-end">
            <div className="relative">
              <p className="hand text-yellow text-lg">{t.jyEyebrow}</p>
              <h2 id="journey-title" className="display-lg mt-1">
                {t.jyA}<span className="relative inline-block">{t.jyB}<Doodle name="doodles/doodle-wave-green" w={230} className="top-full -mt-3 end-0" style={{ filter: "hue-rotate(-62deg) saturate(2.2) brightness(1.7)" }} /></span>
              </h2>
              <p className="lead mt-12 max-w-[34rem] text-white/90">
                {t.jyIntro}
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-yellow font-display font-extrabold text-sm" aria-hidden>
                <Icon name="arrow" className="size-5" /> {t.jyHint}
              </p>
            </div>
          </div>

          {/* the traveller */}
          <div className="block relative z-10 h-[52%] lg:h-[74%] shrink-0 self-end" data-journey-girl aria-hidden="true">
            <Image src={girl.src} alt="" width={girl.w} height={girl.h} sizes="320px" quality={88} className="h-full w-auto max-w-none" style={{ filter: "drop-shadow(0 20px 30px rgba(10,6,40,.55))" }} />
            <div className="hand absolute top-[6%] -end-[70%] text-yellow text-[1.1rem] lg:text-[1.5rem] leading-[1.5] rotate-[-6deg] w-[150px] lg:w-[190px] hidden sm:block"><span className="whitespace-pre-line">{t.jyHand}</span><Doodle name="doodles/doodle-heart" w={32} className="static mt-1" style={{ filter: "invert(1)" }} /></div>
          </div>

          {/* steps + progress wave behind them (desktop) */}
          <div className="relative z-10">
          <svg viewBox="0 0 3000 240" preserveAspectRatio="none" className="block absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-[240px] pointer-events-none overflow-visible -z-10" aria-hidden="true">
            <path d={wave} fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 16" vectorEffect="non-scaling-stroke" />
            <path data-journey-wave d={wave} fill="none" stroke="#FFD629" strokeWidth="6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
          <ol className="relative flex flex-row gap-5 lg:gap-10" aria-label="مراحل مسیر رشد">
            {journey.map((s, i) => (
              <li key={s.title} data-journey-step className="relative w-[74vw] sm:w-[300px] shrink-0" style={{ marginTop: `${[0, 0, 0, 0, 0, 0][i]}px` }}>
                <div className="paper-card translate-y-[calc(var(--ty)*.6)] lg:translate-y-[var(--ty)] bg-paper text-navy rounded-[18px] px-5 pt-7 pb-5 lg:px-6 lg:pt-8 lg:pb-7 h-full lg:min-h-[250px]" style={{ rotate: `${[-2, 1.6, -1.2, 2.2, -1.8, 1.2][i]}deg`, ["--ty" as string]: `${[-40, 40, -30, 44, -36, 36][i]}px` }}>
                  <span className="absolute top-2 end-5 font-display font-black text-[4rem] leading-none text-transparent" style={{ WebkitTextStroke: "2px #6C35D9" }} aria-hidden>
                    {(i + 1).toLocaleString("fa-IR")}
                  </span>
                  <span className="grid place-items-center size-14 rounded-full bg-lavender border-2 border-navy">
                    <Icon name={s.icon} className="size-7 text-purple" />
                  </span>
                  <h3 className="mt-4 font-display font-black text-[1.45rem]">{s.title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-[1.95] text-navy/75">{s.text}</p>
                  <span className="tape -top-3 start-6 !w-16 !h-5" style={{ ["--tape" as string]: ["var(--color-yellow)", "var(--color-coral)", "var(--color-green)", "var(--color-yellow)", "var(--color-coral)", "var(--color-green)"][i] }} />
                </div>
                <span aria-hidden data-journey-dot className="hidden lg:block absolute top-1/2 -translate-y-1/2 start-1/2 -ms-2.5 size-5 rounded-full bg-yellow border-[3px] border-white -z-10" />
              </li>
            ))}
          </ol>
          </div>

          {/* final statement */}
          <div className="relative z-10 w-[84vw] lg:w-[min(560px,44vw)] shrink-0 lg:ps-6 pb-4" data-journey-final>
            <p className="display-lg leading-[1.4]">
              {t.jyF1a}<span className="text-yellow">{t.jyF1b}</span>{t.jyF1c}
            </p>
            <p className="display-lg mt-2 relative inline-block leading-[1.4]">
              {t.jyF2a}<span className="marker" style={{ ["--marker" as string]: "rgba(255,255,255,.2)" }}>{t.jyF2b}</span>{t.jyF2c}
              <Doodle name="doodles/doodle-star-yellow" w={56} className="-top-8 -end-8" anim="pop" rotate={12} />
            </p>
            <div className="mt-8"><Btn href="/#intent" variant="yellow" icon="arrow-end">{t.jyBtn}</Btn></div>
          </div>
        </div>
      </div>
    </section>
  );
}
