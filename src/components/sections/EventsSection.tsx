import type { HomeContent } from "@/data/home-defaults";
import { Btn } from "../ui/Button";
import { Doodle } from "../ui/Doodle";
import { PolaroidCard } from "../ui/PolaroidCard";

export function EventsSection({ h }: { h: HomeContent }) {
  const t = h.texts;
  const { events } = h;
  return (
    <section id="events" className="chapter relative py-12 sm:py-16 lg:py-28 bg-lavender paper-fibre overflow-x-clip" aria-labelledby="events-title" data-chapter="events">
      <div aria-hidden className="absolute inset-x-0 top-0 h-6 bg-navy torn-bottom -scale-y-100" style={{ transform: "scaleY(-1)", clipPath: "var(--torn-b)" }} />
      <div className="container-x grid items-center gap-9 sm:gap-12 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)]">
        <div className="relative z-10">
          <p className="hand text-purple text-lg">{t.evEyebrow}</p>
          <h2 id="events-title" className="display-lg mt-1" data-reveal>
            {t.evA}<span className="relative inline-block text-purple">{t.evB}<Doodle name="doodles/doodle-squiggle" w={150} className="top-full -mt-2 end-0" /></span>{t.evC}
          </h2>
          <p className="lead mt-5 text-navy/80" data-reveal>
            {t.evIntro}
          </p>
          <div className="mt-8"><Btn href="/events" variant="purple" icon="arrow-end">{t.evBtn}</Btn></div>
        </div>

        {/* event wall */}
        <div className="relative mx-auto w-full max-w-[720px] aspect-[1.2/1]" data-wall>
          <div className="absolute top-[2%] start-[0%] w-[48%] z-10" data-wall-item data-from="-1">
            <PolaroidCard photo={events[0].photo} pos={events[0].pos} rotate={events[0].r} caption={events[0].cap} tape={events[0].tape} alt="نشست شبکه‌سازی در میکروشمیم؛ جمعی از دختران در حال گفت‌وگو" sizes="(min-width:1024px) 340px, 50vw" />
          </div>
          <div className="absolute top-[0%] end-[10%] w-[44%] z-20" data-wall-item data-from="1">
            <PolaroidCard photo={events[1].photo} pos={events[1].pos} rotate={events[1].r} caption={events[1].cap} tape={events[1].tape} alt="کارگاه مهارتی؛ همکاری روی لپ‌تاپ" sizes="(min-width:1024px) 320px, 46vw" />
          </div>
          <div className="absolute bottom-[0%] start-[26%] w-[46%] z-30" data-wall-item data-from="-1">
            <PolaroidCard photo={events[2].photo} pos={events[2].pos} rotate={events[2].r} caption={events[2].cap} tape={events[2].tape} alt="ارائه دستاورد در استودیو" sizes="(min-width:1024px) 330px, 50vw" />
          </div>
          {/* handwritten sticky note */}
          <div className="absolute top-[34%] end-[0%] w-[27%] aspect-[.85/1] bg-tint-pink z-30 shadow-[0_16px_24px_-12px_rgba(16,22,47,.5)] p-3 hand text-navy text-[clamp(.95rem,.7rem+.9vw,1.5rem)] leading-[1.6]" style={{ rotate: "6deg", clipPath: "polygon(0 0,100% 0,100% 94%,92% 100%,0 100%)" }} data-wall-item data-from="1">
            <span className="whitespace-pre-line">{t.evNote}</span>
            <Doodle name="doodles/doodle-heart" w={34} className="static mt-1" />
            <span className="tape -top-3 start-[30%] !w-14 !h-5" style={{ ["--tape" as string]: "var(--color-yellow)" }} />
          </div>
          <Doodle name="doodles/doodle-arrow-bend" w={90} className="top-[46%] start-[2%] z-30" rotate={-30} speed={0.2} />
          <Doodle name="doodles/doodle-burst-purple" w={52} className="top-[52%] start-[54%] z-30" speed={0.3} />
          <Doodle name="stickers/brush-yellow-scribble" w={130} className="bottom-[2%] end-[2%] z-0" rotate={-10} speed={0.12} />
          <Doodle name="doodles/doodle-star-outline" w={50} className="-top-4 start-[46%] z-30" rotate={16} anim="pop" />
        </div>
      </div>
    </section>
  );
}
