import { notFound } from "next/navigation";
import { get } from "@/lib/server/db";
import type { Post } from "@/lib/server/data";
import { adminAssets, adminMedia } from "@/lib/server/admin-data";
import { LinkBtn, Title } from "@/components/admin/ui";
import { ConfirmButton } from "@/components/admin/Forms";
import { PostForm } from "../PostForm";
import { deletePostAction } from "../../../actions";

export const metadata = { title: "ویرایش مطلب" };
export default async function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const p = get<Post>("SELECT * FROM posts WHERE id=?", Number((await params).id));
  if (!p) notFound();
  return (
    <>
      <Title sub={p.status === "published" ? `/blog/${p.slug}` : "پیش‌نویس"} actions={<>{p.status === "published" && <LinkBtn href={`/blog/${p.slug}`}>مشاهده ↗</LinkBtn>}<LinkBtn href="/admin/posts">← مطالب</LinkBtn></>}>ویرایش «{p.title}»</Title>
      <PostForm post={p} media={adminMedia()} assets={adminAssets()} />
      <form action={deletePostAction} className="mt-8"><input type="hidden" name="id" value={p.id} /><ConfirmButton message="این مطلب حذف شود؟" className="rounded-lg border border-red-300 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-50">حذف مطلب</ConfirmButton></form>
    </>
  );
}
