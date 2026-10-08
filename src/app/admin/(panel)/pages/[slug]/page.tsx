import { notFound } from "next/navigation";
import { getPage } from "@/lib/server/data";
import { adminAssets, adminMedia } from "@/lib/server/admin-data";
import { Title, LinkBtn } from "@/components/admin/ui";
import { ConfirmButton, PageForm } from "@/components/admin/Forms";
import { deletePageAction, savePageAction } from "../../../actions";
import { requireAdmin } from "@/lib/server/auth";

export const metadata = { title: "ویرایش صفحه" };

export default async function EditPage({ params }: { params: Promise<{ slug: string }> }) {
  const me = await requireAdmin();
  const slug = decodeURIComponent((await params).slug);
  const p = getPage(slug);
  if (!p) notFound();
  return (
    <>
      <Title sub={`/${p.slug}`} actions={<LinkBtn href="/admin/pages">← همه‌ی صفحات</LinkBtn>}>ویرایش «{p.title}»</Title>
      <PageForm action={savePageAction} page={{ ...p, blocks: p.blocks as unknown as Record<string, unknown>[] }} media={adminMedia()} assets={adminAssets()} />
      {me.role === "admin" && (
        <form action={deletePageAction} className="mt-8"><input type="hidden" name="slug" value={p.slug} />
          <ConfirmButton message="این صفحه برای همیشه حذف شود؟" className="rounded-lg border border-red-300 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-50">حذف صفحه</ConfirmButton></form>)}
    </>
  );
}
