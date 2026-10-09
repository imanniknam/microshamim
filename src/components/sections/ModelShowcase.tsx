import type { HomeContent } from "@/data/home-defaults";
import { Btn } from "../ui/Button";
import { Doodle } from "../ui/Doodle";
import { Photo } from "../ui/Photo";
import { PolaroidCard } from "../ui/PolaroidCard";

/** The scale model of the space: one big plan view + three close-ups, so visitors meet the place, not only the people. */
export function ModelShowcase({ h }: { h: HomeContent }) {
  const t = h.texts;
  const m = h.model;
  const rot = [-5, 3.5, -3];
  return (
    <section id="model" className="chapter relative overflow-x-clip py-12 sm:py-16 lg:py-28 bg-tint-mint/45 paper-fibre" aria-labelledby="model-title" data-chapter="model">
      <div className="container-x relative">
        <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="hand text-purple text-lg">{t.mdEyebrow}</p>
            <h2 id="model-title" className="display-lg mt-1" data-reveal>{t.mdA}<span className="marker" style={{ ["--marker" as string]: "var(--color-yellow)" }}>{t.mdB}</span></h2>
          </div>
          <div data-reveal>
            <p className="lead text-navy/80">{t.mdIntro}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Btn href="/spaces" variant="purple" icon="arrow-end">{t.mdBtn}</Btn>
              <Btn href="/request/visit" variant="outline">{t.mdBtn2}</Btn>
            </div>
          </div>
        </div>

        <div className="relative mt-9 lg:mt-14">
          <div className="paper-card relative p-[8px] sm:p-[10px] rotate-[-.6deg]" data-model-frame>
            <div className="relative aspect-[1.85/1] overflow-hidden bg-navy/10" data-model-clip>
              <div className="absolute inset-0" data-model-img>
                <Photo name="model/m01" alt="نمای از بالای ماکت میکروشمیم؛ پلان اتاق‌ها، محوطه و تجهیزات" sizes="(min-width:1360px) 1280px, 96vw" quality={90} pos="50% 50%" />
              </div>
            </div>
            <span className="tape -top-3 start-[18%] !w-28" style={{ ["--tape" as string]: "var(--color-purple)", rotate: "-6deg" }} />
            <span className="tape -top-3 end-[18%] !w-28" style={{ ["--tape" as string]: "var(--color-coral)", rotate: "5deg" }} />
          </div>

          <ul className="mt-6 grid grid-cols-3 gap-3 sm:gap-5 lg:absolute lg:-bottom-16 lg:inset-x-[6%] lg:mt-0 lg:gap-8" data-model-thumbs>
            {m.map((it, i) => (
              <li key={i} data-model-thumb>
                <PolaroidCard photo={it.image} caption={it.caption} rotate={rot[i % 3]} alt={it.caption} sizes="(min-width:1024px) 300px, 32vw" aspect="aspect-[4/3.2]" tape={["var(--color-yellow)", "var(--color-green)", "var(--color-coral)"][i % 3]} />
              </li>
            ))}
          </ul>

          <div className="hand pointer-events-none absolute -top-10 end-2 hidden sm:block text-[1.35rem] leading-[1.5] text-navy rotate-[5deg] text-center z-10">
            <span className="whitespace-pre-line">{t.mdNote}</span>
            <Doodle name="doodles/doodle-arrow-bend" w={70} className="static mx-auto mt-1" rotate={110} />
          </div>
          <Doodle name="doodles/leaf-branch-dark" w={130} className="-bottom-6 -start-4 hidden lg:block z-20" rotate={-10} speed={0.2} />
          <Doodle name="doodles/doodle-star-yellow" w={46} className="-top-5 start-[30%]" anim="pop" />
        </div>
        <div className="hidden lg:block h-16" aria-hidden />
      </div>
    </section>
  );
}
