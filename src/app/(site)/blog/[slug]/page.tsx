import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/server/data";
import { resolveImage } from "@/lib/assets";
import { Markdown } from "@/lib/markdown";
import { Btn } from "@/components/ui/Button";

export const dynamic = "force-dynamic";
const fmt = (d: string | null) => (d ? new Date(d.replace(" ", "T") + "Z").toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" }) : "");

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPost(decodeURIComponent((await params).slug));
  if (!p) return {};
  const img = resolveImage(p.cover);
  return { title: p.title, description: p.excerpt, openGraph: { title: p.title, description: p.excerpt, type: "article", images: img ? [img.src] : undefined } };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost(decodeURIComponent((await params).slug));
  if (!p) notFound();
  const c = resolveImage(p.cover);
  return (
    <article className="relative overflow-x-clip pt-[calc(var(--header-h)+28px)] pb-16 lg:pb-24 paper-fibre">
      <div className="container-x max-w-3xl">
        <p className="text-sm text-navy/60" data-reveal>{[p.category, p.author, fmt(p.published_at ?? p.created_at)].filter(Boolean).join(" · ")}</p>
        <h1 className="display-lg mt-2" data-reveal>{p.title}</h1>
        {p.excerpt && <p className="lead mt-4 text-navy/75" data-reveal>{p.excerpt}</p>}
        {c && (
          <div className="paper-card relative mt-8 p-[7px] rotate-[-.8deg]" data-reveal>
            <div className="relative aspect-[16/9] overflow-hidden"><Image src={c.src} alt={p.title} fill priority sizes="(min-width:1024px) 768px, 92vw" className="object-cover" /></div>
            <span className="tape -top-3 start-[40%]" style={{ ["--tape" as string]: "var(--color-yellow)" }} />
          </div>
        )}
        <div className="mt-8 text-[1.05rem]"><Markdown source={p.body} /></div>
        <div className="mt-12 flex flex-wrap gap-3 border-t-2 border-dashed border-navy/20 pt-8">
          <Btn href="/blog" variant="outline" icon="arrow-end">همه‌ی مطالب</Btn>
          <Btn href="/request/visit" variant="purple">درخواست بازدید از میکروشمیم</Btn>
        </div>
      </div>
    </article>
  );
}
