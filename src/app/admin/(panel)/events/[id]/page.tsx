import { notFound } from "next/navigation";
import { get } from "@/lib/server/db";
import type { EventRow } from "@/lib/server/data";
import { adminAssets, adminMedia } from "@/lib/server/admin-data";
import { LinkBtn, Title } from "@/components/admin/ui";
import { ConfirmButton } from "@/components/admin/Forms";
import { EventForm } from "../EventForm";
import { deleteEventAction } from "../../../actions";
export const metadata = { title: "ویرایش رویداد" };
export default async function EditEvent({ params }: { params: Promise<{ id: string }> }) {
  const e = get<EventRow>("SELECT * FROM events WHERE id=?", Number((await params).id));
  if (!e) notFound();
  return (<><Title actions={<LinkBtn href="/admin/events">← رویدادها</LinkBtn>}>ویرایش «{e.title}»</Title><EventForm ev={e} media={adminMedia()} assets={adminAssets()} />
    <form action={deleteEventAction} className="mt-8"><input type="hidden" name="id" value={e.id} /><ConfirmButton message="این رویداد حذف شود؟" className="rounded-lg border border-red-300 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-50">حذف رویداد</ConfirmButton></form></>);
}
