import { notFound } from "next/navigation";
import { get } from "@/lib/server/db";
import type { Course } from "@/lib/server/data";
import { adminAssets, adminMedia } from "@/lib/server/admin-data";
import { LinkBtn, Title } from "@/components/admin/ui";
import { ConfirmButton } from "@/components/admin/Forms";
import { CourseForm } from "../CourseForm";
import { deleteCourseAction } from "../../../actions";
export const metadata = { title: "ویرایش دوره" };
export default async function EditCourse({ params }: { params: Promise<{ id: string }> }) {
  const c = get<Course>("SELECT * FROM courses WHERE id=?", Number((await params).id));
  if (!c) notFound();
  return (<><Title actions={<LinkBtn href="/admin/courses">← دوره‌ها</LinkBtn>}>ویرایش «{c.title}»</Title><CourseForm c={c} media={adminMedia()} assets={adminAssets()} />
    <form action={deleteCourseAction} className="mt-8"><input type="hidden" name="id" value={c.id} /><ConfirmButton message="این دوره حذف شود؟" className="rounded-lg border border-red-300 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-50">حذف دوره</ConfirmButton></form></>);
}
