import Link from "next/link";
import Image from "next/image";
import type { HomeContent } from "@/data/home-defaults";
import { asset } from "@/lib/assets";
import { Doodle } from "../ui/Doodle";
import { Icon } from "../ui/Icon";

export function IntentSelector({ h }: { h: HomeContent }) {
  const t = h.texts;
  const { intents } = h;
  const sky = asset("photos/p8-skyline");
  return (
    <section id="intent" className="chapter on-dark relative overflow-hidden py-12 sm:py-16 lg:py-28 text-white" aria-labelledby="intent-title" data-chapter="intent">
      {/* sunset city, cropped to the sky + skyline (right half of the photo) */}
      <div aria-hidden className="absolute inset-0 -z-0">
        <Image src={sky.src} alt="" fill sizes="100vw" quality={75} className="object-cover" style={{ objectPosition: "50% 50%" }} data-intent-bg />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a1470]/70 via-[#4b2aa8]/45 to-navy/95" />
      </div>
      <Doodle name="stickers/brush-yellow-scribble" w={260} className="top-[6%] -end-6 hidden md:block opacity-95" rotate={18} speed={0.18} />
      <Doodle name="stickers/brush-green" w={210} className="top-[18%] -end-10 hidden md:block" rotate={-12} speed={0.28} />
      <Doodle name="stickers/halftone-purple" w={220} className="bottom-0 -start-10 opacity-70" speed={0.1} />

      <div className="container-x relative z-10">
        <h2 id="intent-title" className="display-lg max-w-3xl" data-reveal>
          {t.inA}<span className="marker" style={{ ["--marker" as string]: "rgba(255,214,41,.55)" }}>{t.inB}</span>{t.inC}
        </h2>

        <ul className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-6" data-intent-list>
          {intents.map((x) => (
            <li key={x.title} data-intent-card>
              <Link href={x.href} className="intent-card group relative flex h-full flex-col items-center text-center rounded-[22px] bg-paper text-navy px-3 pt-8 pb-5 shadow-[0_14px_30px_-14px_rgba(0,0,0,.65)]" style={{ ["--r" as string]: `${x.r}deg` }}>
                <span className="grid place-items-center size-14 rounded-full -mt-2" style={{ background: x.c }}>
                  <Icon name={x.icon} className="size-7" style={{ color: x.ink }} />
                </span>
                <span className="mt-3 font-display font-black text-[1.02rem] leading-snug">{x.title}</span>
                <span className="mt-auto pt-3 text-[0.8rem] font-bold leading-snug" style={{ color: x.ink }}>{x.cta}</span>
                <span className="mt-2 inline-flex"><Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:-translate-x-1.5" style={{ color: x.ink }} /></span>
                <Doodle name="doodles/doodle-star-yellow" w={36} className="i-doodle -top-4 -start-3" />
                <span className="absolute inset-0 rounded-[22px] after:absolute after:inset-0" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
