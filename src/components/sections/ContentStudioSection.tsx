import Link from "next/link";
import type { HomeContent } from "@/data/home-defaults";
import { Btn } from "../ui/Button";
import { Doodle } from "../ui/Doodle";
import { Icon } from "../ui/Icon";
import { Lines } from "../ui/Lines";
import { Photo } from "../ui/Photo";

export function ContentStudioSection({ h }: { h: HomeContent }) {
  const t = h.texts;
  const { studioItems } = h;
  return (
    <section id="studio" className="chapter relative" aria-labelledby="studio-title" data-chapter="studio">
      {/* The dark shell expands (clip-path) as it enters: cream → navy cinema */}
      <div className="studio-shell on-dark relative bg-navy text-white overflow-hidden" data-studio-shell>
        <div className="relative min-h-[520px] lg:min-h-[720px]">
          {/* wide photo, fades into navy toward the text */}
          <div className="absolute inset-y-0 end-0 w-full lg:w-[64%] light-sweep overflow-hidden" data-studio-photo>
            <div className="absolute inset-0 will-change-transform" data-studio-zoom>
              <Photo name="photos/p4-podcast" alt="دختری در استودیو پادکست میکروشمیم با هدفون و میکروفون" sizes="(min-width:1024px) 66vw, 100vw" pos="58% 34%" quality={90} />
            </div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-l from-navy via-navy/60 lg:via-navy/10 to-transparent lg:to-transparent" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/50" />
          </div>

          <div className="container-x relative z-10 grid lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] items-center min-h-[inherit] py-14 lg:py-24">
            <div className="max-w-[34rem]">
              <p className="hand text-yellow text-lg">{t.stEyebrow}</p>
              <h2 id="studio-title" className="display-lg mt-2 relative">
                <Lines lines={[t.stL1, t.stL2]} />
                <Doodle name="doodles/doodle-wave-green" w={210} className="top-full -mt-1 end-0" style={{ filter: "hue-rotate(-60deg) saturate(2) brightness(1.6)" }} />
              </h2>
              <p className="mt-8 font-display font-extrabold text-[clamp(1.2rem,1rem+.9vw,1.75rem)] leading-[1.7] text-white" data-studio-tracking>
                <span className="whitespace-pre-line">{t.stSub}</span>
              </p>
              <p className="mt-5 text-white/80 leading-[2.05]">
                {t.stIntro}
              </p>
              <div className="mt-8"><Btn href="/request/studio" variant="yellow" icon="arrow-end">{t.stBtn}</Btn></div>
            </div>
          </div>

          <div aria-hidden className="hand absolute top-[7%] end-[4%] hidden lg:block text-white/90 text-[1.6rem] leading-[1.5] rotate-[5deg] text-center">
            <span className="whitespace-pre-line">{t.stHand}</span>
            <Doodle name="doodles/doodle-heart" w={34} className="static mx-auto mt-2" style={{ filter: "invert(1)" }} />
          </div>
          <Doodle name="doodles/doodle-crown" w={78} className="top-[41%] end-[18%] hidden lg:block" rotate={-6} style={{ filter: "invert(1) sepia(1) saturate(6) hue-rotate(5deg) brightness(1.2)" }} speed={0.2} />
          <Doodle name="doodles/doodle-arrow-bend" w={100} className="bottom-8 start-[8%] hidden lg:block" style={{ filter: "invert(1) sepia(1) saturate(7) hue-rotate(5deg) brightness(1.2)" }} speed={0.3} />
        </div>

        {/* what we make */}
        <div className="container-x relative z-10 pb-20 lg:pb-28">
          <h3 className="display-md text-white" data-reveal>
            <span className="marker" style={{ ["--marker" as string]: "rgba(108,53,217,.9)" }}>{t.stWhatA}</span>{t.stWhatB}
          </h3>
          <ul className="mt-6 lg:mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5" data-studio-cards>
            {studioItems.map((s, i) => (
              <li key={s.title} data-studio-card className="group" style={{ rotate: `${[-1.2, 0.9, -0.6, 1.1, -0.8][i]}deg` }}>
                <Link href="#studio" className="block h-full rounded-[16px] overflow-hidden text-navy transition-transform duration-500 group-hover:-translate-y-3 group-hover:rotate-0 shadow-[0_18px_34px_-18px_rgba(0,0,0,.8)]" style={{ background: s.tint }}>
                  <div className="relative aspect-[4/3] sm:aspect-[4/3.4] overflow-hidden">
                    <Photo name={s.photo} alt={s.title} sizes="(min-width:1024px) 260px, (min-width:640px) 45vw, 92vw" pos={s.pos} className="transition-transform duration-[1200ms] ease-out group-hover:scale-110" style={{ scale: s.zoom ?? 1, transformOrigin: s.pos }} />
                  </div>
                  <div className="p-3 pb-4 sm:p-4 sm:pb-5">
                    <h4 className="font-display font-black text-[0.92rem] sm:text-[1.05rem] leading-tight flex items-center gap-2"><Icon name={s.icon} className="size-5 shrink-0" />{s.title}</h4>
                    <p className="mt-1.5 text-[0.76rem] sm:text-[0.84rem] leading-[1.7] sm:leading-[1.85] text-navy/75 line-clamp-3 sm:line-clamp-none">{s.text}</p>
                    <span className="mt-3 inline-flex"><Icon name="arrow" className="size-5 transition-transform group-hover:-translate-x-1.5" /></span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
