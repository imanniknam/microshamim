import Image from "next/image";
import { Btn } from "../ui/Button";
import { Doodle } from "../ui/Doodle";
import { Icon, type IconName } from "../ui/Icon";
import { resolveImage } from "@/lib/assets";
import { listCourses } from "@/lib/server/data";
import type { Block, Btn as BtnT, CardItem, Tone } from "@/lib/types";
import { cn } from "@/lib/cn";

const TONE: Record<Tone, string> = {
  cream: "",
  lavender: "bg-lavender/55 paper-fibre",
  mint: "bg-tint-mint/45 paper-fibre",
  yellow: "bg-yellow/60 paper-fibre",
  navy: "bg-navy text-white on-dark",
  purple: "bg-purple text-white on-purple",
};
const isDark = (t?: Tone) => t === "navy" || t === "purple";
const ICONS = new Set<string>(["cap","laptop","calendar","camera","mic","users","coffee","network","megaphone","play","building","star","heart","user","gear","coin","briefcase","bulb","puzzle","chat","link","video","send"]);
const ic = (n?: string) => (n && ICONS.has(n) ? (n as IconName) : null);

function Buttons({ list, dark }: { list?: BtnT[]; dark?: boolean }) {
  if (!list?.length) return null;
  return (
    <div className="mt-7 flex flex-wrap gap-3">
      {list.map((b, i) => (
        <Btn key={i} href={b.href} variant={b.variant ?? (i === 0 ? (dark ? "yellow" : "purple") : "outline")} icon={i === 0 ? "arrow-end" : undefined}>{b.label}</Btn>
      ))}
    </div>
  );
}

function Img({ v, alt, sizes, className, priority }: { v?: string; alt: string; sizes: string; className?: string; priority?: boolean }) {
  const a = resolveImage(v);
  if (!a) return null;
  return <Image src={a.src} alt={alt} fill sizes={sizes} priority={priority} quality={85} className={cn("object-cover", className)} />;
}

const Paras = ({ list, className }: { list?: string[]; className?: string }) => (
  <>{list?.map((t, i) => <p key={i} className={cn("lead mt-4 whitespace-pre-line", className)}>{t}</p>)}</>
);

function Head({ eyebrow, title, intro, dark, center, h = 2 }: { eyebrow?: string; title?: string; intro?: string; dark?: boolean; center?: boolean; h?: 1 | 2 }) {
  if (!eyebrow && !title && !intro) return null;
  const H = h === 1 ? "h1" : "h2";
  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center")} data-reveal>
      {eyebrow && <p className={cn("hand text-lg", dark ? "text-yellow" : "text-purple")}>{eyebrow}</p>}
      {title && <H className="display-md mt-1">{title}</H>}
      {intro && <p className={cn("lead mt-4", dark ? "text-white/80" : "text-navy/75")}>{intro}</p>}
    </div>
  );
}

function Hero({ b, first }: { b: Extract<Block, { type: "hero" }>; first: boolean }) {
  const dark = isDark(b.tone);
  const H = first ? "h1" : "h2";
  return (
    <section className={cn("relative overflow-x-clip pt-[calc(var(--header-h)+28px)] pb-12 lg:pb-20", TONE[b.tone ?? "cream"], !b.tone && "paper-fibre")} data-chapter="page-hero">
      <div className="container-x relative grid items-center gap-9 lg:gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)]">
        <div className="relative z-10">
          {b.eyebrow && <p className={cn("hand text-lg", dark ? "text-yellow" : "text-purple")} data-reveal>{b.eyebrow}</p>}
          <H className="display-lg mt-1" data-reveal><span className="marker" style={{ ["--marker" as string]: dark ? "rgba(108,53,217,.85)" : "var(--color-yellow)" }}>{b.title}</span></H>
          {b.subtitle && <p className="display-md mt-5 !text-[clamp(1.2rem,1rem+1vw,1.9rem)] !font-extrabold" data-reveal>{b.subtitle}</p>}
          {b.paragraphs?.map((p, i) => <p key={i} className={cn("lead mt-4", dark ? "text-white/80" : "text-navy/80")} data-reveal>{p}</p>)}
          <Buttons list={b.buttons} dark={dark} />
        </div>
        {b.image && (
          <div className="relative mx-auto w-full max-w-[520px]" data-reveal>
            <div className="paper-card p-[7px] rotate-[1.6deg] bg-paper">
              <div className="relative aspect-[1.05/1] overflow-hidden torn">
                <Img v={b.image} alt={b.title} sizes="(min-width:1024px) 480px, 90vw" priority={first} />
              </div>
            </div>
            <span className="tape -top-3 start-[34%]" style={{ ["--tape" as string]: "var(--color-purple)" }} />
            <Doodle name="doodles/doodle-crown" w={70} className="-top-9 end-[8%]" rotate={8} speed={0.25} />
            <Doodle name="stickers/brush-yellow-scribble" w={120} className="-bottom-6 -start-6 -z-10" rotate={-10} speed={0.15} />
            <Doodle name="doodles/doodle-burst-pink" w={52} className="bottom-6 -end-4" speed={0.3} />
          </div>
        )}
      </div>
    </section>
  );
}

function TextBlock({ b }: { b: Extract<Block, { type: "text" }> }) {
  const dark = isDark(b.tone);
  return (
    <section className={cn("relative overflow-x-clip py-9 sm:py-12 lg:py-20", TONE[b.tone ?? "cream"])}>
      <div className="container-x">
        <div className="max-w-3xl" data-reveal>
          {b.eyebrow && <p className={cn("hand text-lg", dark ? "text-yellow" : "text-purple")}>{b.eyebrow}</p>}
          {b.title && <h2 className="display-md mt-1">{b.title}</h2>}
          <Paras list={b.paragraphs} className={dark ? "text-white/85" : "text-navy/80"} />
          {b.highlight && <p className="display-md mt-7 !text-[clamp(1.25rem,1rem+1.2vw,2rem)]"><span className="marker" style={{ ["--marker" as string]: dark ? "rgba(108,53,217,.85)" : "var(--color-yellow)" }}>{b.highlight}</span></p>}
        </div>
      </div>
    </section>
  );
}

const TINTS = ["var(--color-tint-lilac)", "var(--color-tint-peach)", "var(--color-tint-mint)", "var(--color-tint-pink)", "var(--color-tint-sky)", "var(--color-tint-lime)"];

function Cards({ b }: { b: Extract<Block, { type: "cards" }> }) {
  const dark = isDark(b.tone);
  const cols = b.columns ?? 3;
  const grid = cols === 2 ? "sm:grid-cols-2" : cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <section className={cn("relative overflow-x-clip py-9 sm:py-12 lg:py-20", TONE[b.tone ?? "cream"])}>
      <div className="container-x">
        <Head eyebrow={b.eyebrow} title={b.title} intro={b.intro} dark={dark} />
        <ul className={cn("mt-6 lg:mt-12 grid gap-4 lg:gap-6", grid, !b.title && "mt-0 lg:mt-0")} data-reveal-stagger>
          {b.items.map((it: CardItem, i) => {
            const icon = ic(it.icon);
            return (
              <li key={i} data-reveal-item className="relative" style={{ rotate: `${[-0.8, 0.6, -0.4, 0.9, -0.6, 0.5][i % 6]}deg` }}>
                <article className="paper-card h-full overflow-hidden rounded-[16px] border-2 border-navy/10 text-navy flex flex-col" style={{ background: it.tint ?? TINTS[i % TINTS.length] }}>
                  {it.image && <div className="relative aspect-[16/9] sm:aspect-[16/8] overflow-hidden torn-bottom"><Img v={it.image} alt={it.title} sizes="(min-width:1024px) 420px, 92vw" /></div>}
                  <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-1">
                    <h3 className="font-display font-black text-[1.08rem] sm:text-[1.2rem] lg:text-[1.35rem] leading-snug flex items-start gap-2.5">
                      {icon && <span className="grid place-items-center size-10 shrink-0 rounded-full bg-paper/80 border-2 border-navy/80"><Icon name={icon} className="size-5" /></span>}
                      <span className="pt-0.5">{it.title}</span>
                    </h3>
                    {it.text && <p className="mt-2 sm:mt-3 text-[0.88rem] sm:text-[0.94rem] leading-[1.85] sm:leading-[1.95] text-navy/80 whitespace-pre-line">{it.text}</p>}
                    {it.list && (
                      <ul className="mt-4 grid gap-1.5 text-[0.9rem]">
                        {it.list.map((l) => <li key={l} className="flex gap-2"><Icon name="star" className="size-4 mt-1.5 shrink-0 text-purple" />{l}</li>)}
                      </ul>
                    )}
                    {it.button && <div className="mt-auto pt-5"><Btn href={it.button.href} variant={it.button.variant ?? "purple"} small>{it.button.label}</Btn></div>}
                  </div>
                </article>
                <span className="tape -top-3 start-1/2 -ms-10 !w-20 !h-6" style={{ ["--tape" as string]: TINTS[(i + 2) % TINTS.length] }} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Checklist({ b }: { b: Extract<Block, { type: "checklist" }> }) {
  const dark = isDark(b.tone);
  return (
    <section className={cn("relative overflow-x-clip py-9 sm:py-12 lg:py-20", TONE[b.tone ?? "cream"])}>
      <div className="container-x grid gap-8 lg:grid-cols-[.8fr_1.2fr] items-start">
        <Head eyebrow={b.eyebrow} title={b.title} intro={b.intro} dark={dark} />
        <div>
          <ul className="grid gap-3" data-reveal-stagger>
            {b.items.map((t, i) => (
              <li key={i} data-reveal-item className={cn("flex items-start gap-3 rounded-2xl border-2 px-4 py-3.5 font-display font-extrabold text-[1.05rem] lg:text-[1.2rem]", dark ? "border-white/25 bg-white/5" : "border-navy bg-paper shadow-[4px_5px_0_-1px_#10162f]")} style={{ rotate: `${[0.4, -0.4, 0.3, -0.3, 0.4][i % 5]}deg` }}>
                <span className="grid place-items-center size-8 shrink-0 rounded-full bg-yellow text-navy mt-0.5"><Icon name="star" className="size-4" /></span>
                {t}
              </li>
            ))}
          </ul>
          {b.footer && <p className="display-md mt-8 !text-[clamp(1.25rem,1rem+1.2vw,2rem)] text-yellow" data-reveal>{b.footer}</p>}
        </div>
      </div>
    </section>
  );
}

function Steps({ b }: { b: Extract<Block, { type: "steps" }> }) {
  return (
    <section className={cn("relative overflow-x-clip py-9 sm:py-12 lg:py-20", TONE[b.tone ?? "cream"])}>
      <div className="container-x">
        <Head title={b.title} intro={b.intro} />
        <ol className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-4" data-reveal-stagger>
          {b.items.map((t, i) => (
            <li key={i} data-reveal-item className="flex items-center gap-2">
              <span className="rounded-full border-2 border-navy px-5 py-2 font-display font-black text-[1.05rem] lg:text-[1.25rem] shadow-[3px_4px_0_-1px_#10162f]" style={{ background: TINTS[i % TINTS.length], rotate: `${[-1.5, 1, -0.5, 1.4, -1, 0.8][i % 6]}deg` }}>{t}</span>
              {i < b.items.length - 1 && <Icon name="arrow" className="size-6 text-purple" />}
            </li>
          ))}
        </ol>
        {b.statement && (
          <p className="display-lg mt-10 relative inline-block" data-reveal>
            «<span className="marker">{b.statement}</span>»
            <Doodle name="doodles/doodle-star-outline" w={56} className="-top-7 -end-5" rotate={10} anim="pop" />
          </p>
        )}
      </div>
    </section>
  );
}

function Feature({ b }: { b: Extract<Block, { type: "feature" }> }) {
  const dark = isDark(b.tone);
  const a = resolveImage(b.image);
  return (
    <section className={cn("relative overflow-x-clip py-9 sm:py-12 lg:py-20", TONE[b.tone ?? "cream"])}>
      <div className={cn("container-x grid items-center gap-9 lg:gap-14", a && "lg:grid-cols-2")}>
        <div className={cn("relative z-10", b.reverse && a && "lg:order-2")}>
          {b.eyebrow && <p className={cn("hand text-lg", dark ? "text-yellow" : "text-purple")}>{b.eyebrow}</p>}
          <h2 className="display-md mt-1" data-reveal><span className="marker" style={{ ["--marker" as string]: dark ? "rgba(108,53,217,.85)" : "var(--color-lavender)" }}>{b.title}</span></h2>
          <Paras list={b.paragraphs} className={dark ? "text-white/85" : "text-navy/80"} />
          {b.list && (
            <div className="mt-5">
              {b.listTitle && <p className="font-display font-black">{b.listTitle}</p>}
              <ul className="mt-2 flex flex-wrap gap-2">
                {b.list.map((l, i) => <li key={l} className={cn("rounded-full border-2 px-3.5 py-1 text-[0.88rem] font-bold", dark ? "border-white/40 bg-white/10" : "border-navy bg-paper")} style={{ rotate: `${[-1.5, 1, -0.6, 1.4, -1][i % 5]}deg` }}>{l}</li>)}
              </ul>
            </div>
          )}
          <Buttons list={b.buttons} dark={dark} />
        </div>
        {a && (
          <div className="relative mx-auto w-full max-w-[560px]" data-reveal>
            <div className={cn("paper-card p-[7px] bg-paper", b.reverse ? "-rotate-2" : "rotate-2")}>
              <div className="relative aspect-[1.2/1] overflow-hidden torn"><Img v={b.image} alt={b.title} sizes="(min-width:1024px) 520px, 92vw" /></div>
            </div>
            <span className="tape -top-3 start-[30%]" style={{ ["--tape" as string]: b.reverse ? "var(--color-coral)" : "var(--color-yellow)" }} />
            <Doodle name={b.reverse ? "doodles/leaf-branch-dark" : "doodles/doodle-arrow-diag"} w={b.reverse ? 120 : 80} className={cn("-bottom-6", b.reverse ? "-start-6" : "-end-4")} rotate={b.reverse ? -8 : -10} speed={0.2} style={dark ? { filter: "invert(1)" } : undefined} />
          </div>
        )}
      </div>
    </section>
  );
}

function Faq({ b }: { b: Extract<Block, { type: "faq" }> }) {
  return (
    <section className="relative py-9 sm:py-12 lg:py-20">
      <div className="container-x max-w-4xl">
        <Head title={b.title} />
        <div className="mt-8 grid gap-3" data-reveal-stagger>
          {b.items.map((it, i) => (
            <details key={i} data-reveal-item className="group rounded-2xl border-2 border-navy bg-paper px-5 py-4 shadow-[4px_5px_0_-1px_#10162f] open:bg-tint-lilac/60">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-extrabold text-[1.05rem] [&::-webkit-details-marker]:hidden">
                {it.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-yellow border-2 border-navy transition-transform duration-300 group-open:rotate-45"><Icon name="plus" className="size-4" /></span>
              </summary>
              <p className="mt-3 text-[0.97rem] leading-[2] text-navy/80">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta({ b }: { b: Extract<Block, { type: "cta" }> }) {
  const dark = isDark(b.tone);
  return (
    <section className="relative overflow-x-clip py-9 sm:py-12 lg:py-20">
      <div className="container-x">
        <div className={cn("relative mx-auto max-w-4xl px-5 py-12 text-center sm:px-14 sm:py-16", dark ? "bg-navy text-white torn on-dark" : "paper-card torn bg-paper")} style={dark ? undefined : { border: 0 }} data-reveal>
          {!dark && <><span className="tape -top-1 start-[10%] !w-24" style={{ ["--tape" as string]: "var(--color-purple)", rotate: "-8deg" }} /><span className="tape -top-1 end-[10%] !w-24" style={{ ["--tape" as string]: "var(--color-green)", rotate: "7deg" }} /></>}
          <h2 className="display-md relative">{b.title}</h2>
          {b.text && <p className={cn("lead mt-4 mx-auto max-w-2xl relative", dark ? "text-white/80" : "text-navy/75")}>{b.text}</p>}
          <div className="relative flex flex-wrap justify-center gap-3 [&>div]:justify-center"><Buttons list={b.buttons} dark={dark} /></div>
          <Doodle name="doodles/doodle-burst-yellow" w={54} className="top-[14%] start-[5%]" speed={0.3} />
          <Doodle name="doodles/doodle-burst-pink" w={58} className="bottom-[12%] end-[5%]" speed={0.25} />
        </div>
      </div>
    </section>
  );
}

function Flow({ b }: { b: Extract<Block, { type: "flow" }> }) {
  return (
    <section className="relative overflow-x-clip py-9 sm:py-12 lg:py-20 bg-tint-lilac/40 paper-fibre">
      <div className="container-x">
        <Head title={b.title} intro={b.intro} />
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:flex lg:items-stretch lg:gap-0" data-reveal-stagger>
          {b.items.map((t, i) => (
            <li key={i} data-reveal-item className="relative lg:flex-1 lg:flex lg:items-center">
              <div className="h-full rounded-2xl border-2 border-navy bg-paper px-4 py-4 text-center font-display font-black shadow-[4px_5px_0_-1px_#10162f]" style={{ rotate: `${[-1, 0.8, -0.6, 1][i % 4]}deg` }}>
                <span className="mx-auto mb-2 grid size-8 place-items-center rounded-full bg-purple text-white text-sm">{(i + 1).toLocaleString("fa-IR")}</span>
                {t}
              </div>
              {i < b.items.length - 1 && <Icon name="arrow" className="hidden lg:block size-7 shrink-0 mx-1 text-purple" />}
            </li>
          ))}
        </ol>
        {b.text && <p className="lead mt-8 max-w-3xl text-navy/80" data-reveal>{b.text}</p>}
      </div>
    </section>
  );
}

function Gallery({ b }: { b: Extract<Block, { type: "gallery" }> }) {
  const dark = isDark(b.tone);
  const tapes = ["var(--color-yellow)", "var(--color-coral)", "var(--color-green)", "var(--color-lavender)", "var(--color-purple)"];
  return (
    <section className={cn("relative overflow-x-clip py-9 sm:py-12 lg:py-20", TONE[b.tone ?? "cream"])}>
      <div className="container-x">
        <Head eyebrow={b.eyebrow} title={b.title} intro={b.intro} dark={dark} />
        <ul className="mt-8 columns-2 gap-4 sm:gap-6 lg:columns-3 [&>li]:mb-5 sm:[&>li]:mb-7" data-reveal-stagger>
          {b.items.map((it, i) => {
            const a = resolveImage(it.image);
            if (!a) return null;
            const ratio = a.w && a.h ? a.w / a.h : 1.33;
            return (
              <li key={i} data-reveal-item className="break-inside-avoid" style={{ rotate: `${[-1.6, 1.2, -0.7, 1.8, -1.1, 0.8][i % 6]}deg` }}>
                <a href={a.src} target="_blank" rel="noopener noreferrer" className="polaroid group relative block transition-transform duration-500 hover:-translate-y-2 hover:rotate-0" aria-label={`${it.caption || "تصویر"} — نمایش بزرگ`}>
                  <div className="relative overflow-hidden bg-navy/10" style={{ aspectRatio: String(ratio) }}>
                    <Image src={a.src} alt={it.caption ?? ""} fill sizes="(min-width:1024px) 400px, 46vw" quality={85} className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  {it.caption && <span className="cap hand text-[0.82rem] sm:text-[0.95rem] text-navy px-1">{it.caption}</span>}
                  <span className="tape -top-3 start-1/2 -ms-10 !w-16 sm:!w-20 !h-5 sm:!h-6" style={{ ["--tape" as string]: tapes[i % tapes.length] }} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Courses({ b }: { b: Extract<Block, { type: "courses" }> }) {
  const list = listCourses();
  const aud: Record<string, string> = { teen: "۱۳ تا ۱۸ سال", youth: "۱۸ تا ۳۰ سال", all: "همه‌ی مسیرها" };
  return (
    <section id="courses" className="relative overflow-x-clip py-9 sm:py-12 lg:py-20 bg-tint-mint/40 paper-fibre scroll-mt-24">
      <div className="container-x">
        <Head title={b.title} intro={b.intro} />
        {list.length === 0 ? (
          <div className="mt-8 rounded-2xl border-2 border-dashed border-navy/40 bg-paper/70 p-8 text-center" data-reveal>
            <p className="font-display font-black text-xl">دوره‌ی فعالی در حال حاضر ثبت نشده است.</p>
            <p className="mt-2 text-navy/70">ثبت‌نام اولیه را انجام بده تا به‌محض شروع دوره‌های جدید به تو اطلاع بدهیم.</p>
            <div className="mt-5"><Btn href="/request/school" variant="purple">ثبت‌نام در مدرسه مهارت</Btn></div>
          </div>
        ) : (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger>
            {list.map((c, i) => (
              <li key={c.id} data-reveal-item>
                <article className="paper-card h-full overflow-hidden rounded-[16px] flex flex-col">
                  {c.image && <div className="relative aspect-[16/10]"><Img v={c.image} alt={c.title} sizes="(min-width:1024px) 400px, 92vw" /></div>}
                  <div className="p-5 flex-1 flex flex-col">
                    <span className="self-start rounded-full bg-yellow px-3 py-0.5 text-xs font-bold border border-navy">{aud[c.audience] ?? aud.all}</span>
                    <h3 className="mt-3 font-display font-black text-xl">{c.title}</h3>
                    <p className="mt-2 text-[0.92rem] text-navy/75 leading-[1.9]">{c.summary}</p>
                    <div className="mt-auto pt-4"><Btn href={c.link || "/request/school"} variant={i % 2 ? "outline" : "purple"} small>ثبت‌نام</Btn></div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "hero": return <Hero key={i} b={b} first={i === 0} />;
          case "text": return <TextBlock key={i} b={b} />;
          case "cards": return <Cards key={i} b={b} />;
          case "checklist": return <Checklist key={i} b={b} />;
          case "steps": return <Steps key={i} b={b} />;
          case "feature": return <Feature key={i} b={b} />;
          case "faq": return <Faq key={i} b={b} />;
          case "cta": return <Cta key={i} b={b} />;
          case "gallery": return <Gallery key={i} b={b} />;
          case "courses": return <Courses key={i} b={b} />;
          case "flow": return <Flow key={i} b={b} />;
          default: return null;
        }
      })}
    </>
  );
}
