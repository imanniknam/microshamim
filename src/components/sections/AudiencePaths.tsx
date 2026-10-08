import Link from "next/link";
import type { HomeContent } from "@/data/home-defaults";
import { Doodle } from "../ui/Doodle";
import { Icon } from "../ui/Icon";

const deco = [
  <>
    <Doodle key="a" name="doodles/doodle-burst-pink" w={64} className="top-4 end-4" speed={0.2} />
    <Doodle key="b" name="doodles/doodle-star-yellow" w={44} className="bottom-24 end-6" rotate={14} />
    <Doodle key="c" name="paper/paper-purple-star" w={64} className="-top-6 end-[30%]" rotate={8} />
  </>,
  <>
    <Doodle key="a" name="doodles/doodle-arrow-up" w={70} className="top-5 end-5" rotate={10} />
    <Doodle key="b" name="stickers/brush-purple-sm" w={140} className="bottom-20 end-[-10px] opacity-60" rotate={-6} />
    <Doodle key="c" name="doodles/doodle-star-outline" w={48} className="-top-4 start-[16%]" rotate={-10} />
  </>,
  <>
    <Doodle key="a" name="doodles/leaf-green-tall" w={60} className="top-3 end-5" rotate={22} />
    <Doodle key="b" name="doodles/doodle-heart" w={36} className="bottom-24 end-7" rotate={-8} />
    <Doodle key="c" name="stickers/brush-green-sm" w={130} className="-top-3 start-[14%]" rotate={4} />
  </>,
];

export function AudiencePaths({ h }: { h: HomeContent }) {
  const t = h.texts;
  const { audiences } = h;
  return (
    <section id="audience" className="chapter relative py-12 sm:py-16 lg:py-28 overflow-x-clip" aria-labelledby="aud-title" data-chapter="audience">
      <div className="container-x relative">
        <div className="text-center max-w-3xl mx-auto" data-reveal>
          <p className="hand text-purple text-lg">{t.auEyebrow}</p>
          <h2 id="aud-title" className="display-lg mt-1">
            {t.auA}<span className="marker">{t.auB}</span>
          </h2>
          <p className="lead mt-4 text-navy/75">{t.auIntro}</p>
        </div>

        <ul className="mt-9 lg:mt-16 grid gap-7 lg:gap-6 lg:grid-cols-3 items-stretch" data-aud-list>
          {audiences.map((a, i) => (
            <li key={a.age} data-aud-card className={i === 1 ? "lg:mt-10" : i === 2 ? "lg:mt-3" : ""}>
              <Link href={a.href} className="group relative block h-full rounded-[18px] border-2 border-navy p-5 pt-7 sm:p-7 sm:pt-9 shadow-[7px_8px_0_-1px_#10162f] transition-transform duration-500 hover:-translate-y-3 hover:!rotate-0" style={{ background: a.tint, rotate: `${a.r}deg`, color: "#10162f" }}>
                {deco[i]}
                <p className="font-display font-black text-[clamp(1.9rem,1.4rem+1vw,2.6rem)] leading-[1.2] relative" style={{ color: a.ink }}>{a.age}</p>
                <h3 className="mt-1 font-display font-extrabold text-lg relative">{a.title}</h3>
                <p className="mt-3 text-[0.88rem] sm:text-[0.95rem] leading-[1.9] text-navy/80 relative">{a.text}</p>
                <ul className="mt-5 flex flex-wrap gap-2 relative" aria-label="ویژگی‌های مسیر">
                  {a.chips.map((c, j) => (
                    <li key={c} className="rounded-full border-[1.5px] border-navy/80 bg-paper/80 px-3 py-0.5 text-[0.8rem] font-bold" style={{ rotate: `${[-2, 1.5, -1, 2, -1.5][j]}deg` }}>{c}</li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-2 font-display font-black relative" style={{ color: a.ink }}>
                  {a.cta}
                  <Icon name="arrow" className="size-5 transition-transform duration-300 group-hover:-translate-x-2" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
