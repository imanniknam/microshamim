import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { listEvents } from "@/lib/server/data";
import { resolveImage } from "@/lib/assets";
import { Btn } from "@/components/ui/Button";
import { Doodle } from "@/components/ui/Doodle";

export const metadata: Metadata = { title: "رویدادها", description: "نشست‌های شبکه‌سازی، کارگاه‌های مهارتی و رویدادهای تخصصی میکروشمیم." };
export const dynamic = "force-dynamic";
const fmtDate = (d: string | null) => (d ? new Date(d).toLocaleDateString("fa-IR", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "");

export default function EventsPage() {
  const all = listEvents();
  const now = new Date().toISOString().slice(0, 10);
  const upcoming = all.filter((e) => !e.starts_at || e.starts_at.slice(0, 10) >= now).reverse();
  const past = all.filter((e) => e.starts_at && e.starts_at.slice(0, 10) < now);
  const Card = ({ e, i }: { e: (typeof all)[number]; i: number }) => {
    const img = resolveImage(e.image);
    return (
      <li data-reveal-item style={{ rotate: `${[-0.7, 0.6, -0.4][i % 3]}deg` }}>
        <Link href={`/events/${e.slug}`} className="group polaroid block h-full transition-transform duration-500 hover:-translate-y-2">
          <div className="relative aspect-[4/3.2] overflow-hidden bg-lavender">{img && <Image src={img.src} alt={e.title} fill sizes="(min-width:1024px) 380px, 92vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}</div>
          <div className="px-1 pt-3 pb-8">
            <p className="hand text-sm text-purple">{[e.kind, fmtDate(e.starts_at)].filter(Boolean).join(" · ")}</p>
            <h3 className="mt-1 font-display font-black text-lg leading-snug">{e.title}</h3>
          </div>
          <span className="tape -top-3 start-1/2 -ms-10" style={{ ["--tape" as string]: ["var(--color-yellow)", "var(--color-coral)", "var(--color-green)"][i % 3] }} />
        </Link>
      </li>
    );
  };
  return (
    <section className="relative overflow-x-clip pt-[calc(var(--header-h)+28px)] pb-16 lg:pb-24 bg-lavender/50 paper-fibre min-h-[80svh]">
      <div className="container-x">
        <div className="max-w-2xl" data-reveal>
          <p className="hand text-lg text-purple">رویدادها</p>
          <h1 className="display-lg mt-1">همیشه <span className="marker">اتفاقی</span> در میکروشمیم در جریان است.</h1>
          <p className="lead mt-4 text-navy/75">از نشست‌های شبکه‌سازی و کارگاه‌های مهارتی تا رویدادهای تخصصی و برنامه‌های ارائه دستاوردها، میکروشمیم فضایی زنده برای یادگیری و ارتباط است.</p>
          <div className="mt-6"><Btn href="/request/event" variant="purple" icon="arrow-end">درخواست برگزاری ایونت</Btn></div>
        </div>
        {all.length === 0 ? (
          <div className="mt-10 rounded-2xl border-2 border-dashed border-navy/40 bg-paper/70 p-10 text-center" data-reveal>
            <p className="font-display font-black text-xl">رویداد جدیدی هنوز اعلام نشده است.</p>
            <p className="mt-2 text-navy/70">عضو خبرنامه شو تا اولین رویدادها را از دست ندهی.</p>
            <Doodle name="doodles/doodle-star-yellow" w={44} className="static mx-auto mt-3" />
          </div>
        ) : (
          <>
            {upcoming.length > 0 && <><h2 className="display-md mt-12">رویدادهای پیش‌رو</h2><ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger>{upcoming.map((e, i) => <Card key={e.id} e={e} i={i} />)}</ul></>}
            {past.length > 0 && <><h2 className="display-md mt-14">رویدادهای گذشته</h2><ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger>{past.map((e, i) => <Card key={e.id} e={e} i={i} />)}</ul></>}
          </>
        )}
      </div>
    </section>
  );
}
