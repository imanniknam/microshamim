import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/blocks/Blocks";
import { getPage } from "@/lib/server/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPage(slug);
  if (!p || !p.published) return {};
  return { title: p.seo_title || p.title, description: p.seo_desc || undefined, openGraph: { title: p.seo_title || p.title, description: p.seo_desc || undefined } };
}

export default async function CmsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPage(slug);
  if (!p || !p.published) notFound();
  return <Blocks blocks={p.blocks} />;
}
