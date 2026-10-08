import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getEvent } from "@/lib/server/data";
import { resolveImage } from "@/lib/assets";
import { Markdown } from "@/lib/markdown";
import { Btn } from "@/components/ui/Button";

export const dynamic = "force-dynamic";
const fmt = (d: string | null) => (d ? new Date(d).toLocaleDateString("fa-IR", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "");

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = getEvent(decodeURIComponent((await params).slug));
  return e ? { title: e.title, description: e.description.slice(0, 160) } : {};
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const e = getEvent(decodeURIComponent((await params).slug));
  if (!e) notFound();
  const img = resolveImage(e.image);
  return (
    <article className="relative overflow-x-clip pt-[calc(var(--header-h)+28px)] pb-16 lg:pb-24 paper-fibre">
      <div className="container-x max-w-4xl">
        <p className="hand text-lg text-purple" data-reveal>{e.kind || "رویداد"}</p>
        <h1 className="display-lg mt-1" data-reveal>{e.title}</h1>
        <ul className="mt-5 flex flex-wrap gap-2" data-reveal>
          {e.starts_at && <li className="rounded-full border-2 border-navy bg-yellow px-4 py-1 font-bold text-sm">{fmt(e.starts_at)}</li>}
          {e.place && <li className="rounded-full border-2 border-navy bg-paper px-4 py-1 font-bold text-sm">{e.place}</li>}
        </ul>
        {img && (
          <div className="polaroid relative mt-8 rotate-[-1deg]" data-reveal>
            <div className="relative aspect-[16/9]"><Image src={img.src} alt={e.title} fill priority sizes="(min-width:1024px) 900px, 92vw" className="object-cover" /></div>
            <span className="tape -top-3 start-[44%]" style={{ ["--tape" as string]: "var(--color-coral)" }} />
          </div>
        )}
        <div className="mt-8 text-[1.05rem]"><Markdown source={e.description} /></div>
        <div className="mt-10 flex flex-wrap gap-3">
          {e.link && <Btn href={e.link} variant="purple" icon="arrow-end">ثبت‌نام / اطلاعات بیشتر</Btn>}
          <Btn href="/events" variant="outline" icon="arrow-end">همه‌ی رویدادها</Btn>
        </div>
      </div>
    </article>
  );
}
