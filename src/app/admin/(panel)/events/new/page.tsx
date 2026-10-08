import { adminAssets, adminMedia } from "@/lib/server/admin-data";
import { LinkBtn, Title } from "@/components/admin/ui";
import { EventForm } from "../EventForm";
export const metadata = { title: "رویداد جدید" };
export default function NewEvent() { return <><Title actions={<LinkBtn href="/admin/events">← رویدادها</LinkBtn>}>رویداد جدید</Title><EventForm ev={{}} media={adminMedia()} assets={adminAssets()} /></>; }
