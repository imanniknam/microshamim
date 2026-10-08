import { adminAssets, adminMedia } from "@/lib/server/admin-data";
import { LinkBtn, Title } from "@/components/admin/ui";
import { CourseForm } from "../CourseForm";
export const metadata = { title: "دوره‌ی جدید" };
export default function NewCourse() { return <><Title actions={<LinkBtn href="/admin/courses">← دوره‌ها</LinkBtn>}>دوره‌ی جدید</Title><CourseForm c={{}} media={adminMedia()} assets={adminAssets()} /></>; }
