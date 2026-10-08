import Link from "next/link";
import type { HomeContent } from "@/data/home-defaults";
import { Doodle } from "../ui/Doodle";
import { Icon } from "../ui/Icon";
import { Photo } from "../ui/Photo";

export function ExperienceSection({ h }: { h: HomeContent }) {
  const t = h.texts;
  const { experiences } = h;
  return (
    <section id="experience" className="chapter relative pt-10 pb-14 sm:pt-14 sm:pb-20 lg:pt-24 lg:pb-32 overflow-x-clip" aria-labelledby="xp-title" data-chapter="experience">
      <div className="container-x relative">
        <Doodle name="stickers/brush-pink-scribble" w={150} className="top-0 end-[2%] hidden md:block" rotate={-8} speed={0.15} />
        <Doodle name="doodles/doodle-arrow-bend" w={110} className="top-14 end-[28%] hidden lg:block" rotate={20} speed={0.25} />

        <div className="max-w-2xl" data-reveal>
          <p className="hand text-purple text-lg mb-1">{t.xpEyebrow}</p>
          <h2 id="xp-title" className="display-lg">
            {t.xpA}<span className="relative inline-block">{t.xpB}<Doodle name="doodles/doodle-squiggle" w={190} className="top-full -mt-1 end-0" /></span>
          </h2>
        </div>

        <ul className="mt-8 lg:mt-20 grid gap-5 sm:gap-8 sm:grid-cols-2 lg:flex lg:gap-0 lg:items-start" data-xp-list>
          {experiences.map((x, i) => (
            <li
              key={x.id}
              data-xp-card
              className="xp-card relative lg:flex-1 lg:min-w-0 lg:not-first:-ms-2.5"
              style={{ ["--r" as string]: `${x.r}deg`, ["--y" as string]: `${x.y}px`, zIndex: i + 1 }}
            >
              <article className="paper-card overflow-hidden rounded-[16px] flex flex-row sm:flex-col h-full border-2 border-navy/10" style={{ background: x.tint }}>
                <div className="relative w-[34%] sm:w-auto shrink-0 sm:aspect-[4/3.1] overflow-hidden sm:torn-bottom">
                  <Photo name={x.photo} alt={`${x.title} — تصویری از فضای میکروشمیم`} sizes="(min-width:1280px) 260px, (min-width:640px) 45vw, 92vw" pos={x.pos} />
                </div>
                <div className="relative px-4 py-3 sm:px-5 sm:pt-4 sm:pb-6 flex-1 flex flex-col overflow-hidden">
                  <div aria-hidden className="xp-tex absolute -inset-4 opacity-40 halftone-dots pointer-events-none" style={{ color: x.accent, maskImage: "radial-gradient(circle at 100% 100%, #000 0, transparent 55%)", WebkitMaskImage: "radial-gradient(circle at 100% 100%, #000 0, transparent 55%)" }} />
                  <h3 className="relative font-display font-black text-[1.2rem] sm:text-[1.55rem] flex items-center gap-2">
                    <Icon name={x.icon} className="size-6" style={{ color: x.accent }} />
                    {x.title}
                  </h3>
                  <p className="relative mt-1.5 text-[0.82rem] sm:text-[0.9rem] leading-[1.8] sm:leading-[1.95] text-navy/80 flex-1 line-clamp-4 sm:line-clamp-none">{x.text}</p>
                  <Link href={x.href} className="link-arrow relative mt-3 sm:mt-5 after:absolute after:-inset-3" style={{ color: x.accent }}>
                    {x.cta}
                    <Icon name="arrow" />
                  </Link>
                  <Doodle name="doodles/doodle-star-yellow" w={44} className="xp-doodle top-3 start-3" />
                </div>
              </article>
              <span className="tape -top-3 start-1/2 -ms-12 !w-20 !h-6" style={{ ["--tape" as string]: ["var(--color-yellow)", "var(--color-coral)", "var(--color-green)", "var(--color-lavender)", "var(--color-yellow)", "var(--color-coral)"][i] }} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
