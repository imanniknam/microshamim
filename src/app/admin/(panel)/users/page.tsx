import { all } from "@/lib/server/db";
import { requireAdmin } from "@/lib/server/auth";
import { Badge, Card, Title, fdate } from "@/components/admin/ui";
import { ActionForm, ConfirmButton, Field, inputCls } from "@/components/admin/Forms";
import { changePasswordAction, createUserAction, deleteUserAction, updateUserAction } from "../../actions";

export const metadata = { title: "کاربران" };
export default async function Users() {
  const me = await requireAdmin();
  const users = me.role === "admin" ? all<{ id: number; email: string; name: string; role: string; created_at: string; last_login: string | null }>("SELECT id,email,name,role,created_at,last_login FROM users ORDER BY id") : [];
  return (
    <>
      <Title sub="مدیر کل به همه‌چیز دسترسی دارد؛ ویراستار فقط محتوا را ویرایش می‌کند">کاربران پنل</Title>
      <Card className="mb-6 max-w-xl"><h2 className="mb-3 font-black">تغییر گذرواژه‌ی من</h2>
        <ActionForm action={changePasswordAction} submit="تغییر گذرواژه">
          <Field label="گذرواژه‌ی فعلی"><input name="current" type="password" required dir="ltr" className={inputCls} autoComplete="current-password" /></Field>
          <Field label="گذرواژه‌ی جدید (حداقل ۸ نویسه)"><input name="password" type="password" required minLength={8} dir="ltr" className={inputCls} autoComplete="new-password" /></Field>
          <Field label="تکرار گذرواژه‌ی جدید"><input name="password2" type="password" required minLength={8} dir="ltr" className={inputCls} autoComplete="new-password" /></Field>
        </ActionForm></Card>
      {me.role === "admin" && (<>
        <div className="grid gap-3">{users.map((u) => (
          <Card key={u.id}>
            <form action={updateUserAction} className="grid items-end gap-3 sm:grid-cols-[1.2fr_1fr_.8fr_1fr_auto]">
              <input type="hidden" name="id" value={u.id} />
              <div><p className="font-bold" dir="ltr">{u.email}</p><p className="text-xs text-slate-400">آخرین ورود: {fdate(u.last_login)} {u.id === me.id && <Badge tone="violet">شما</Badge>}</p></div>
              <input name="name" defaultValue={u.name} placeholder="نام" className={inputCls} />
              <select name="role" defaultValue={u.role} className={inputCls}><option value="admin">مدیر کل</option><option value="editor">ویراستار</option></select>
              <input name="password" type="password" placeholder="گذرواژه‌ی جدید (اختیاری)" dir="ltr" className={inputCls} autoComplete="new-password" />
              <button className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-bold text-white">ذخیره</button>
            </form>
            {u.id !== me.id && <form action={deleteUserAction} className="mt-2"><input type="hidden" name="id" value={u.id} /><ConfirmButton message="این کاربر حذف شود؟" className="text-xs font-bold text-red-600">حذف کاربر</ConfirmButton></form>}
          </Card>))}</div>
        <Card className="mt-6 max-w-xl"><h2 className="mb-3 font-black">کاربر جدید</h2>
          <ActionForm action={createUserAction} submit="ساخت کاربر">
            <Field label="نام"><input name="name" className={inputCls} /></Field>
            <Field label="ایمیل"><input name="email" type="email" required dir="ltr" className={inputCls} /></Field>
            <Field label="گذرواژه (حداقل ۸ نویسه)"><input name="password" type="password" required minLength={8} dir="ltr" className={inputCls} autoComplete="new-password" /></Field>
            <Field label="نقش"><select name="role" className={inputCls}><option value="editor">ویراستار</option><option value="admin">مدیر کل</option></select></Field>
          </ActionForm></Card></>)}
    </>
  );
}
