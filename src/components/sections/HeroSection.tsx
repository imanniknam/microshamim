import Image from "next/image";
import Link from "next/link";
import type { HomeContent } from "@/data/home-defaults";
import { asset } from "@/lib/assets";
import { Btn } from "../ui/Button";
import { Doodle } from "../ui/Doodle";
import { Icon } from "../ui/Icon";
import { Lines } from "../ui/Lines";
import { Photo } from "../ui/Photo";

/** Jagged "pow" burst behind the hero portrait (hand-cut feel, not a perfect star). */
function Burst({ className, ...rest }: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" focusable="false" {...rest}>
      <path
        fill="#FFD629"
        d="M214 6l24 108 62-86-12 118 96-48-52 98 66 6-84 66 70 54-98 4 36 74-84-34-10 78-52-70-62 60 4-90-96 20 70-70-92-30 98-34-56-76 100 20-8-84 76 52z"
      />
      <path fill="none" stroke="#10162F" strokeOpacity=".16" strokeWidth="3" strokeLinejoin="round"
        d="M214 6l24 108 62-86-12 118 96-48-52 98 66 6-84 66 70 54-98 4 36 74-84-34-10 78-52-70-62 60 4-90-96 20 70-70-92-30 98-34-56-76 100 20-8-84 76 52z" />
    </svg>
  );
}

export function HeroSection({ h }: { h: HomeContent }) {
  const t = h.texts;
  const { quickNav } = h;
  const girl = asset("collage/cutout-hero");
  return (
    <section id="top" className="chapter relative paper-fibre pt-[calc(var(--header-h)+8px)] overflow-x-clip" aria-labelledby="hero-title" data-chapter="hero">
      <div className="container-x relative">
        <div className="grid items-center gap-8 lg:gap-4 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,1fr)] min-h-[calc(100svh-var(--header-h)-130px)] lg:min-h-[640px]">
          {/* ───── text (right in RTL) ───── */}
          <div className="relative z-10 lg:pe-6 order-2 lg:order-1 pb-6">
            <h1 id="hero-title" className="hero-title display-xl text-navy">
              <span className="relative inline-block">
                <Lines lines={[t.heroL1]} />
                <Doodle name="doodles/doodle-sparkle" hero="doodle" w={34} className="-top-1 -start-9" speed={0.12} eager />
              </span>
              <Lines lines={[t.heroL2, <span key="x" className="relative inline-block">{t.heroL3a}<span className="marker">{t.heroL3b}</span><Doodle name="doodles/doodle-burst-dark" hero="doodle" w={40} className="-bottom-3 -start-12" eager /></span>]} />
            </h1>

            <p className="lead mt-6 max-w-[34rem] text-navy/85" data-hero-in="text">
              {t.heroP1}
            </p>
            <p className="mt-3 max-w-[34rem] text-navy/70 text-[0.98rem]" data-hero-in="text">
              {t.heroP2a}<strong className="font-extrabold text-purple">{t.heroP2b}</strong>
            </p>

            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4" data-hero-in="cta">
              <Btn href={t.heroCta1Href} variant="purple">{t.heroCta1Label}</Btn>
              <Btn href={t.heroCta2Href} variant="outline" icon="plus">{t.heroCta2Label}</Btn>
            </div>
          </div>

          {/* ───── collage art (left in RTL) ───── */}
          <div className="relative order-1 lg:order-2 mx-auto w-full max-w-[640px] lg:max-w-none aspect-[1/0.96]" data-hero-art>
            <div className="absolute inset-0" data-hero-parallax>
              <Doodle name="stickers/brush-yellow-big" hero="brush" w={250} className="top-[18%] end-[2%] hidden sm:block" rotate={-10} speed={0.14} style={{ filter: "saturate(1.15)" }} eager />
              <Burst className="absolute top-[8%] start-[-8%] w-[58%] rotate-[8deg]" data-hero-in="brush" />
              <Doodle name="stickers/brush-purple-halftone" hero="brush" w={300} className="top-[0%] start-[20%] opacity-95" rotate={-6} speed={0.2} eager />
            </div>

            <div className="absolute start-[2%] w-[84%] bottom-0 top-[5%]" data-hero-in="girl" data-hero-girl>
              <Image
                src={girl.src}
                alt="دختر جوانی پشت لپ‌تاپ با نگاه رو به آینده"
                width={girl.w}
                height={girl.h}
                priority
                fetchPriority="high"
                quality={90}
                sizes="(min-width:1024px) 640px, 92vw"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-none select-none"
                style={{ filter: "drop-shadow(0 18px 26px rgba(16,22,47,.22))" }}
              />
            </div>

            <div className="absolute inset-0 pointer-events-none" data-hero-parallax-fast>
              <Doodle name="doodles/doodle-crown" hero="doodle" w={96} className="top-[-5%] start-[30%]" rotate={6} speed={0.35} eager />
              <Doodle name="doodles/doodle-arrow-curve" hero="doodle" w={120} className="top-[22%] end-[10%] hidden sm:block" rotate={-14} speed={0.3} eager />
              <Doodle name="doodles/doodle-star-yellow" hero="doodle" w={46} className="top-[48%] start-[2%]" rotate={12} speed={0.5} eager />
              <Doodle name="doodles/doodle-burst-purple" hero="doodle" w={50} className="bottom-[20%] end-[-1%]" speed={0.4} />
              <Doodle name="doodles/doodle-scribble-vertical" hero="doodle" w={34} className="bottom-[30%] start-[-1%] hidden sm:block" speed={0.3} />
              <div className="hand absolute top-[36%] end-[2%] text-[clamp(1.25rem,1rem+1.1vw,2rem)] text-navy -rotate-6 leading-[1.5] hidden sm:block" data-hero-in="hand">
                <div>{t.heroHand1}</div>
                <div className="ms-4">{t.heroHand2}</div>
                <div className="ms-1">{t.heroHand3}</div>
                <Doodle name="doodles/doodle-squiggle" hero="doodle" w={120} className="top-full mt-1 start-0" />
              </div>
            </div>

            <div className="absolute bottom-[5%] end-[1%] w-[22%] min-w-[110px] rotate-[-5deg] z-10 hidden sm:block" data-hero-polaroid>
              <div className="polaroid !p-[6px] !pb-[6px]">
                <div className="relative aspect-[1.1/1]">
                  <Photo name="photos/p2-cowork" alt="" sizes="160px" pos="50% 45%" />
                </div>
                <span className="tape -top-3 start-[22%]" style={{ width: 60, height: 20, ["--tape" as string]: "var(--color-yellow)" }} />
              </div>
            </div>

            {/* torn paper edge under the portrait */}
            <div aria-hidden className="absolute -bottom-[1.5%] inset-x-[-3%] h-[7%] bg-paper torn-top shadow-[0_-6px_14px_-8px_rgba(16,22,47,.35)]" />
          </div>
        </div>

        {/* ───── quick nav ───── */}
        <nav aria-label="دسترسی سریع به بخش‌ها" className="relative z-10 mt-2 lg:-mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4 pb-14" data-quick>
          {quickNav.map((q, i) => (
            <Link
              key={q.label}
              href={q.href}
              data-quick-item
              className="group relative isolate flex flex-col items-center justify-end gap-1 px-3 pt-16 pb-4 text-center rounded-[10px] border border-dashed border-navy/20 bg-paper/70 hover:bg-paper transition-colors"
              style={{ rotate: `${[-1, 0.8, -0.6, 1, -0.9][i]}deg` }}
            >
              <span className="absolute top-2 inset-x-0 mx-auto w-[72%] aspect-[1.7/1] -z-10">
                <Image src={asset(q.blob).src} alt="" fill sizes="160px" unoptimized className="object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />
              </span>
              <Icon name={q.icon} className="absolute top-5 size-9 text-navy transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-6deg]" />
              <span className="font-display font-extrabold text-[0.98rem] leading-tight">{q.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* paper layer that wipes up from the bottom while scrolling out of the hero */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] origin-bottom bg-tint-lilac/70 torn-top mix-blend-multiply" data-hero-wipe style={{ transform: "scaleY(0)" }} />
    </section>
  );
}
