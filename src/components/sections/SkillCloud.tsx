import type { HomeContent } from "@/data/home-defaults";
import { Btn } from "../ui/Button";
import { Doodle } from "../ui/Doodle";

export function SkillCloud({ h }: { h: HomeContent }) {
  const t = h.texts;
  const { skills } = h;
  return (
    <section id="skills" className="chapter on-dark relative bg-navy text-white py-12 sm:py-16 lg:py-28 overflow-hidden" aria-labelledby="skills-title" data-chapter="skills">
      <div aria-hidden className="absolute inset-0 opacity-[.07] halftone-dots text-white" style={{ maskImage: "radial-gradient(ellipse at 50% 0%, #000, transparent 65%)", WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, #000, transparent 65%)" }} />
      <div className="container-x relative">
        <div className="max-w-3xl" data-reveal>
          <p className="hand text-yellow text-lg">{t.skEyebrow}</p>
          <h2 id="skills-title" className="display-lg mt-1">
            {t.skA}<span className="marker" style={{ ["--marker" as string]: "rgba(108,53,217,.95)" }}>{t.skB}</span>
          </h2>
        </div>

        {/* desktop: free-floating universe */}
        <div className="relative mt-10 hidden lg:block h-[620px]" data-skill-universe>
          {skills.map((s, i) => (
            <span key={s.t} className="absolute" style={{ insetInlineStart: `${s.x}%`, top: `${s.y}%` }} data-skill data-speed={s.speed}>
              <span className="skill-tag text-navy select-none" style={{ background: s.c, color: s.ink ?? "#10162f", fontSize: `${s.s * 1.18}rem`, ["--r" as string]: `${s.r}deg` }} tabIndex={0}>
                {s.t}
              </span>
            </span>
          ))}
          <Doodle name="doodles/doodle-star-yellow" w={52} className="top-[6%] start-[56%]" speed={0.4} />
          <Doodle name="doodles/doodle-burst-pink" w={60} className="top-[56%] start-[40%]" speed={0.2} />
          <Doodle name="doodles/doodle-scribble-loop" w={150} className="top-[80%] start-[44%]" style={{ filter: "invert(1)" }} speed={0.3} />
          <Doodle name="doodles/doodle-burst-purple" w={50} className="top-[24%] start-[68%]" speed={0.35} />
          <Doodle name="doodles/doodle-crown" w={72} className="top-[2%] start-[26%]" style={{ filter: "invert(1)" }} rotate={-8} speed={0.28} />
        </div>

        {/* mobile / tablet */}
        <ul className="lg:hidden mt-10 flex flex-wrap gap-3" aria-label="مهارت‌ها">
          {skills.map((s) => (
            <li key={s.t} data-skill-m>
              <span className="skill-tag" style={{ background: s.c, color: s.ink ?? "#10162f", ["--r" as string]: `${s.r}deg`, fontSize: `${0.92 + (s.s - 1) * 0.5}rem` }}>{s.t}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto] items-center border-t-2 border-dashed border-white/20 pt-8">
          <p className="text-white/80 lead max-w-2xl">{t.skFoot}</p>
          <Btn href="/school" variant="yellow" icon="arrow-end">{t.skBtn}</Btn>
        </div>
      </div>
    </section>
  );
}
