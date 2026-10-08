import { getHome } from "@/lib/server/data";
import { adminAssets, adminMedia } from "@/lib/server/admin-data";
import { Title, LinkBtn } from "@/components/admin/ui";
import { ConfirmButton, JsonForm } from "@/components/admin/Forms";
import { resetHomeAction, saveHomeAction } from "../../actions";

export const metadata = { title: "صفحه اصلی" };

export default function HomeAdmin() {
  return (
    <>
      <Title sub="تمام متن‌ها، کارت‌ها، مراحل، مهارت‌ها و عکس‌های صفحه‌ی اصلی" actions={<LinkBtn href="/">مشاهده‌ی صفحه ↗</LinkBtn>}>ویرایش صفحه‌ی اصلی</Title>
      <JsonForm action={saveHomeAction} initial={getHome()} media={adminMedia()} assets={adminAssets()} plainAssets />
      <form action={resetHomeAction} className="mt-8"><ConfirmButton message="همه‌ی تغییرات صفحه‌ی اصلی به حالت اولیه برگردد؟" className="rounded-lg border border-red-300 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-50">بازگشت به محتوای اولیه</ConfirmButton></form>
    </>
  );
}
