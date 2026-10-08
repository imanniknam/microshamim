import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { listPosts } from "@/lib/server/data";
import { resolveImage } from "@/lib/assets";
import { Doodle } from "@/components/ui/Doodle";

export const metadata: Metadata = { title: "مجله شمیم", description: "مقاله‌ها، تجربه‌ها و خبرهای میکروشمیم." };
export const dynamic = "force-dynamic";
const fmt = (d: string | null) => (d ? new Date(d.replace(" ", "T") + "Z").toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" }) : "");

export default function BlogPage() {
  const posts = listPosts();
  return (
    <section className="relative overflow-x-clip pt-[calc(var(--header-h)+28px)] pb-16 lg:pb-24 paper-fibre min-h-[80svh]">
      <div className="container-x">
        <div className="max-w-2xl" data-reveal>
          <p className="hand text-lg text-purple">مجله شمیم</p>
          <h1 className="display-lg mt-1"><span className="marker">داستان‌ها و تجربه‌های شمیم</span></h1>
          <p className="lead mt-4 text-navy/75">مقاله‌ها، راهنماها و خبرهای میکروشمیم؛ برای یادگیری، کار، تولید محتوا و رشد.</p>
        </div>
        {posts.length === 0 ? (
          <div className="relative mt-10 rounded-2xl border-2 border-dashed border-navy/40 bg-paper/70 p-10 text-center" data-reveal>
            <p className="font-display font-black text-xl">هنوز مطلبی منتشر نشده است.</p>
            <p className="mt-2 text-navy/70">به‌زودی اولین مطلب‌ها اینجا منتشر می‌شوند.</p>
            <Doodle name="doodles/doodle-heart" w={40} className="static mx-auto mt-3" />
          </div>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger>
            {posts.map((p, i) => {
              const c = resolveImage(p.cover);
              return (
                <li key={p.id} data-reveal-item style={{ rotate: `${[-0.6, 0.5, -0.3][i % 3]}deg` }}>
                  <Link href={`/blog/${p.slug}`} className="group paper-card block h-full overflow-hidden rounded-[16px] transition-transform duration-500 hover:-translate-y-2">
                    {c && <div className="relative aspect-[16/10] overflow-hidden"><Image src={c.src} alt={p.title} fill sizes="(min-width:1024px) 400px, 92vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /></div>}
                    <div className="p-5">
                      <p className="text-xs text-navy/60">{[p.category, fmt(p.published_at ?? p.created_at)].filter(Boolean).join(" · ")}</p>
                      <h2 className="mt-2 font-display font-black text-xl leading-snug">{p.title}</h2>
                      <p className="mt-2 text-[0.92rem] leading-[1.9] text-navy/75 line-clamp-3">{p.excerpt}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
