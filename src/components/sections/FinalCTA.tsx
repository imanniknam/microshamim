import type { HomeContent } from "@/data/home-defaults";
import { Btn } from "../ui/Button";
import { Doodle } from "../ui/Doodle";

export function FinalCTA({ h }: { h: HomeContent }) {
  const t = h.texts;
  return (
    <section id="start" className="chapter relative py-14 sm:py-20 lg:py-36 bg-cream paper-fibre overflow-x-clip" aria-labelledby="final-title" data-chapter="final">
      <div className="container-x relative">
        {/* the poster */}
        <div className="relative mx-auto max-w-[1040px]" data-poster>
          <div aria-hidden className="absolute inset-0 bg-tint-lilac translate-x-3 translate-y-4 rotate-[1.6deg] torn" />
          <div aria-hidden className="absolute inset-0 bg-yellow -translate-x-3 translate-y-2 rotate-[-1.2deg] torn" />
          <div className="paper-card torn relative bg-paper px-5 py-12 sm:px-14 sm:py-24 text-center" style={{ border: 0 }}>
            <div aria-hidden className="absolute inset-0 opacity-70" style={{ backgroundImage: "url(/assets/shamim/textures/paper.jpg)", backgroundSize: "480px", mixBlendMode: "multiply" }} />
            <span className="tape -top-1 start-[12%] !w-28" style={{ ["--tape" as string]: "var(--color-purple)", rotate: "-8deg" }} />
            <span className="tape -top-1 end-[12%] !w-28" style={{ ["--tape" as string]: "var(--color-green)", rotate: "7deg" }} />

            <div className="relative">
              <p className="hand text-purple text-xl">{t.fnEyebrow}</p>
              <h2 id="final-title" className="display-xl mt-2">
                <span className="line-mask"><span>{t.fnL1}</span></span>
                <span className="line-mask"><span>{t.fnL2a}<span className="marker">{t.fnL2b}</span></span></span>
              </h2>
              <p className="lead mt-8 mx-auto max-w-2xl text-navy/80" data-reveal>
                {t.fnP}
              </p>
              <p className="mt-6 font-display font-black text-[clamp(1.15rem,1rem+.8vw,1.7rem)] text-purple" data-reveal>
                {t.fnQuote}
              </p>
              <div className="mt-10 relative inline-block">
                <Btn href="/#intent" variant="purple" icon="arrow-end" className="!text-lg !min-h-[64px] !px-9">{t.fnBtn}</Btn>
                <Doodle name="doodles/doodle-arrow-curve" w={120} className="top-1/2 -end-36 -translate-y-1/2 hidden lg:block" rotate={190} style={{ scale: "-1 1" }} speed={0.3} />
              </div>
            </div>

            <Doodle name="doodles/doodle-crown" w={86} className="-top-8 start-1/2 -ms-10 !z-20" rotate={-6} />
            <Doodle name="doodles/doodle-burst-yellow" w={60} className="top-[18%] start-[7%]" speed={0.3} />
            <Doodle name="doodles/doodle-burst-pink" w={64} className="bottom-[14%] end-[7%]" speed={0.25} />
            <Doodle name="doodles/leaf-dark-corner" w={150} className="-bottom-6 start-[3%]" rotate={-8} />
            <Doodle name="doodles/leaf-yellow" w={90} className="top-[8%] end-[4%]" rotate={14} />
            <Doodle name="doodles/doodle-heart" w={40} className="bottom-[24%] start-[16%]" rotate={-10} anim="pop" />
          </div>
        </div>
      </div>
    </section>
  );
}
