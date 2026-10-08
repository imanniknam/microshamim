import { getNotify, getSite } from "@/lib/server/data";
import { adminAssets, adminMedia } from "@/lib/server/admin-data";
import { requireAdmin } from "@/lib/server/auth";
import { Card, Title } from "@/components/admin/ui";
import { ActionForm, ConfirmButton, Field, JsonForm, inputCls } from "@/components/admin/Forms";
import { resetSiteAction, saveNotifyAction, saveSiteAction } from "../../actions";
import { TestNotify } from "./TestNotify";

export const metadata = { title: "تنظیمات" };
export default async function Settings() {
  const me = await requireAdmin();
  const n = getNotify();
  return (
    <>
      <Title sub="اطلاعات تماس، شبکه‌های اجتماعی، منو، فوتر، سئو و اعلان‌ها">تنظیمات سایت</Title>
      <h2 className="mb-3 text-lg font-black">اطلاعات عمومی، منو و فوتر</h2>
      <JsonForm action={saveSiteAction} initial={getSite()} media={adminMedia()} assets={adminAssets()} />
      {me.role === "admin" && (
        <>
          <h2 className="mb-3 mt-12 text-lg font-black">اعلان درخواست‌ها (ایمیل و وب‌هوک)</h2>
          <Card className="max-w-3xl">
            <p className="mb-4 text-sm text-slate-500">با هر فرم جدید، اطلاعات آن به ایمیل ارسال می‌شود و/یا به آدرس وب‌هوک (JSON) POST می‌شود؛ مثلاً برای اتصال به n8n، Zapier، تلگرام‌بات یا CRM. درخواست‌ها در هر صورت در همین پنل ذخیره می‌شوند.</p>
            <ActionForm action={saveNotifyAction}>
              <Field label="ایمیل دریافت‌کننده (چند ایمیل با ویرگول)"><input name="email" defaultValue={n.email} dir="ltr" className={inputCls} /></Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="سرور SMTP"><input name="host" defaultValue={n.smtp.host} dir="ltr" className={inputCls} placeholder="smtp.example.com" /></Field>
                <Field label="پورت"><input name="port" type="number" defaultValue={n.smtp.port} dir="ltr" className={inputCls} /></Field>
                <Field label="نام کاربری SMTP"><input name="user" defaultValue={n.smtp.user} dir="ltr" className={inputCls} autoComplete="off" /></Field>
                <Field label="گذرواژه SMTP" hint={n.smtp.pass ? "ذخیره شده؛ برای تغییر مقدار جدید بنویس" : undefined}><input name="pass" type="password" dir="ltr" className={inputCls} autoComplete="new-password" /></Field>
                <Field label="فرستنده (From)"><input name="from" defaultValue={n.smtp.from} dir="ltr" className={inputCls} placeholder="میکروشمیم <no-reply@example.com>" /></Field>
                <label className="flex items-center gap-2 pt-7 text-sm font-bold"><input type="checkbox" name="secure" defaultChecked={n.smtp.secure} /> اتصال امن SSL (پورت ۴۶۵)</label>
              </div>
              <Field label="آدرس وب‌هوک"><input name="webhook" defaultValue={n.webhook} dir="ltr" className={inputCls} placeholder="https://" /></Field>
            </ActionForm>
            <div className="mt-4"><TestNotify /></div>
          </Card>
          <form action={resetSiteAction} className="mt-10"><ConfirmButton message="تنظیمات سایت (منو، فوتر، اطلاعات تماس، سئو) به حالت اولیه برگردد؟" className="rounded-lg border border-red-300 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-50">بازگشت تنظیمات سایت به حالت اولیه</ConfirmButton></form>
        </>)}
    </>
  );
}
