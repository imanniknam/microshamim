import type { HomeContent } from "@/data/home-defaults";
import { Btn } from "../ui/Button";
import { Doodle } from "../ui/Doodle";
import { Icon } from "../ui/Icon";
import { Photo } from "../ui/Photo";
import { PolaroidCard } from "../ui/PolaroidCard";

export function CoworkingSection({ h }: { h: HomeContent }) {
  const t = h.texts;
  const { coworkAudience } = h;
  return (
    <section id="cowork" className="chapter relative py-12 sm:py-16 lg:py-28 overflow-x-clip bg-tint-mint/35 paper-fibre" aria-labelledby="cowork-title" data-chapter="cowork">
      <div className="container-x relative">
        <div className="grid items-center gap-12 lg:gap-6 lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)]">
          <div className="relative z-10">
            <p className="hand text-purple text-lg">{t.cwEyebrow}</p>
            <h2 id="cowork-title" className="display-lg mt-1" data-reveal>
              {t.cwA}<span className="marker" style={{ ["--marker" as string]: "var(--color-yellow)" }}>{t.cwB}</span>{t.cwC}
            </h2>
            <p className="lead mt-5 text-navy/80" data-reveal>
              {t.cwIntro}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="این فضا برای چه کسانی است">
              {coworkAudience.map((a, i) => (
                <li key={a} className="rounded-full border-2 border-navy bg-paper px-4 py-1.5 text-[0.88rem] font-bold shadow-[3px_3px_0_-1px_rgba(16,22,47,.9)]" style={{ rotate: `${[-1.5, 1, -0.5, 1.4][i]}deg` }}>{a}</li>
              ))}
            </ul>
            <div className="mt-8"><Btn href="/request/cowork" variant="navy" icon="arrow-end">{t.cwBtn}</Btn></div>
          </div>

          {/* connected collage */}
          <div className="relative mx-auto w-full max-w-[680px] aspect-[1.08/1]" data-cowork-art>
            <svg viewBox="0 0 680 630" className="absolute inset-0 size-full overflow-visible z-20 pointer-events-none" aria-hidden="true">
              <path data-cowork-line d="M170 310 C 230 410, 330 420, 400 345" fill="none" stroke="#6C35D9" strokeWidth="3.5" strokeLinecap="round"  />
              <path data-cowork-line d="M420 200 C 470 250, 530 280, 560 380" fill="none" stroke="#10162F" strokeWidth="3" strokeLinecap="round" />
              <path data-cowork-line d="M180 130 C 240 80, 330 70, 400 110" fill="none" stroke="#F58D9B" strokeWidth="3.5" strokeLinecap="round"  />
            </svg>
            {[["start-[24%]", "top-[48%]", "users", "var(--color-yellow)"], ["start-[59%]", "top-[54%]", "network", "var(--color-lavender)"], ["start-[28%]", "top-[17%]", "chat", "var(--color-coral)"], ["start-[78%]", "top-[60%]", "heart", "var(--color-green)"]].map(([x, y, ic, c], i) => (
              <span key={i} data-cowork-node className={`absolute ${x} ${y} z-30 grid place-items-center size-11 rounded-full border-2 border-navy shadow-[3px_3px_0_-1px_#10162f] -translate-x-1/2`} style={{ background: c }}>
                <Icon name={ic as "users"} className="size-5" />
              </span>
            ))}

            <div className="absolute top-[0%] end-[0%] w-[72%]" data-cowork-item>
              <div className="paper-card p-[7px] rotate-[1.4deg]">
                <div className="relative aspect-[1.28/1] overflow-hidden torn">
                  <Photo name="photos/p2-cowork" alt="دختری پشت میز چوبی بلند فضای کار اشتراکی با لپ‌تاپ" sizes="(min-width:1024px) 480px, 90vw" pos="45% 50%" />
                </div>
              </div>
              <span className="tape -top-3 end-[20%]" style={{ ["--tape" as string]: "var(--color-green)" }} />
            </div>
            <div className="absolute bottom-[2%] start-[0%] w-[48%] z-10" data-cowork-item>
              <PolaroidCard photo="photos/p3-collab" pos="50% 40%" rotate={-4} caption="کار در کنار هم‌مسیرها" alt="دختران جوان در حال همکاری" tape="var(--color-lavender)" sizes="(min-width:1024px) 330px, 50vw" />
            </div>
            <div className="absolute bottom-[0%] end-[4%] w-[36%] z-10" data-cowork-item>
              <PolaroidCard photo="photos/p7-event" pos="50% 62%" rotate={5} caption="شبکه‌سازی" alt="گفت‌وگو و شبکه‌سازی در رویداد میکروشمیم" tape="var(--color-coral)" sizes="(min-width:1024px) 250px, 40vw" />
            </div>
            <Doodle name="doodles/doodle-arrow-bend" w={120} className="-bottom-12 start-[38%] z-30 hidden lg:block" rotate={80} speed={0.25} />
            <Doodle name="doodles/leaf-green-tall" w={70} className="top-[8%] start-[-3%] z-30" rotate={-20} speed={0.3} />
          </div>
        </div>
      </div>
    </section>
  );
}
