import type { HomeContent } from "@/data/home-defaults";
import { Btn } from "../ui/Button";
import { Doodle } from "../ui/Doodle";
import { Icon } from "../ui/Icon";
import { Photo } from "../ui/Photo";
import { PolaroidCard } from "../ui/PolaroidCard";

export function SpacesSection({ h }: { h: HomeContent }) {
  const t = h.texts;
  const { spaces } = h;
  return (
    <section id="spaces" className="chapter relative py-12 sm:py-16 lg:py-28 overflow-x-clip" aria-labelledby="spaces-title" data-chapter="spaces">
      <div className="container-x grid items-center gap-9 sm:gap-12 lg:gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        {/* text — right in RTL */}
        <div className="relative z-10">
          <p className="hand text-purple text-lg">{t.spEyebrow}</p>
          <h2 id="spaces-title" className="display-lg mt-1" data-reveal>
            {t.spA}<span className="marker" style={{ ["--marker" as string]: "var(--color-lavender)" }}>{t.spB}</span>{t.spC}
          </h2>
          <p className="lead mt-5 text-navy/80" data-reveal>
            {t.spIntro}
          </p>

          <ul className="mt-8 grid gap-3" data-reveal-stagger>
            {spaces.map((s, i) => (
              <li key={s.title} data-reveal-item className="flex items-center gap-4 rounded-[14px] border-2 border-navy/90 bg-paper px-4 py-3 shadow-[4px_5px_0_-1px_rgba(16,22,47,.9)] transition-transform duration-300 hover:-translate-y-1 hover:rotate-[-.6deg]" style={{ rotate: `${[0.4, -0.5, 0.3, -0.3, 0.5][i]}deg` }}>
                <span className="grid place-items-center size-12 shrink-0 rounded-full border-2 border-navy" style={{ background: s.c }}>
                  <Icon name={s.icon} className="size-6" />
                </span>
                <span>
                  <strong className="block font-display font-black text-[1.08rem] leading-tight">{s.title}</strong>
                  <span className="block text-[0.85rem] text-navy/70 leading-[1.7]">{s.text}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8"><Btn href="/spaces" variant="outline" icon="plus">{t.spBtn}</Btn></div>
        </div>

        {/* scrapbook collage — left in RTL */}
        <div className="relative mx-auto w-full max-w-[680px] aspect-[1/1.02]" data-collage>
          <div className="absolute top-[2%] start-[0%] w-[66%] rotate-[-2.5deg]" data-collage-item data-from="start">
            <div className="paper-card p-[7px] bg-paper">
              <div className="relative aspect-[1.2/1] overflow-hidden torn">
                <Photo name="photos/p2-cowork" alt="فضای کار اشتراکی میکروشمیم با میزهای چوبی و گیاهان" sizes="(min-width:1024px) 450px, 70vw" pos="50% 42%" />
              </div>
            </div>
            <span className="tape -top-3 start-[34%]" style={{ ["--tape" as string]: "var(--color-purple)" }} />
          </div>

          <div className="absolute top-[34%] end-[0%] w-[47%] z-10" data-collage-item data-from="end">
            <PolaroidCard photo="model/m03" pos="50% 50%" rotate={4.5} caption="فضای مرکزی ماکت" alt="نمایی از فضای مرکزی ماکت میکروشمیم" tape="var(--color-coral)" sizes="(min-width:1024px) 320px, 50vw" />
          </div>

          <div className="absolute bottom-[0%] start-[5%] w-[44%] z-20" data-collage-item data-from="bottom">
            <PolaroidCard photo="model/m09" pos="50% 50%" rotate={-6} caption="چادر و محوطه" alt="چادر، درخت و آتشگاه در ماکت میکروشمیم" tape="var(--color-green)" sizes="(min-width:1024px) 300px, 46vw" />
          </div>

          <div className="absolute top-[3%] end-[3%] w-[26%] rotate-[7deg]" data-collage-item data-from="scale">
            <div className="relative aspect-[1/1.15] torn bg-lavender overflow-hidden shadow-[0_14px_22px_-12px_rgba(16,22,47,.5)]">
              <Photo name="model/m06" alt="اتاق‌ها و دیوارهای ماکت میکروشمیم" sizes="200px" pos="50% 50%" />
            </div>
            <span className="tape -top-3 start-[20%] !w-16 !h-5" style={{ ["--tape" as string]: "var(--color-yellow)" }} />
          </div>

          <div className="hand absolute hidden sm:block -bottom-[7%] start-[52%] w-[32%] text-[clamp(.95rem,.7rem+.8vw,1.35rem)] text-navy rotate-[-5deg] leading-[1.55] z-20" data-collage-item data-from="scale">
            <span className="whitespace-pre-line">{t.spNote}</span>
            <Doodle name="doodles/doodle-heart" w={34} className="static mt-1" />
          </div>

          <Doodle name="doodles/doodle-arrow-diag" w={92} className="top-[30%] start-[44%] z-30" rotate={-12} speed={0.25} />
          <Doodle name="doodles/leaf-branch-dark" w={150} className="bottom-[2%] end-[-2%] z-30" rotate={-8} speed={0.2} />
          <Doodle name="doodles/doodle-crown-sm" w={56} className="top-[-2%] start-[56%]" rotate={8} speed={0.3} />
          <Doodle name="paper/tape-dotted-yellow" w={130} className="top-[52%] start-[-3%] z-30" rotate={-62} speed={0.15} />
        </div>
      </div>
    </section>
  );
}
