import { adminAssets, adminMedia } from "@/lib/server/admin-data";
import { LinkBtn, Title } from "@/components/admin/ui";
import { PostForm } from "../PostForm";

export const metadata = { title: "مطلب جدید" };
export default function NewPost() {
  return <><Title actions={<LinkBtn href="/admin/posts">← مطالب</LinkBtn>}>مطلب جدید</Title><PostForm post={{}} media={adminMedia()} assets={adminAssets()} /></>;
}
