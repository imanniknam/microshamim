import { notFound } from "next/navigation";
import { get, run } from "@/lib/server/db";
import { FORMS, STATUS_LABEL } from "@/lib/forms";
import { Card, LinkBtn, Title, fdate } from "@/components/admin/ui";
import { ActionForm, Field, inputCls } from "@/components/admin/Forms";
import { ConfirmButton } from "@/components/admin/Forms";
import { deleteSubmissionAction, updateSubmissionAction } from "../../../actions";
import type { FormType } from "@/lib/types";

export const metadata = { title: "جزئیات درخواست" };

export default async function SubmissionPage({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  const s = get<{ id: number; type: string; name: string; phone: string; email: string; data: string; status: string; note: string; source: string; created_at: string }>("SELECT * FROM submissions WHERE id=?", id);
  if (!s) notFound();
  if (s.status === "new") { run("UPDATE submissions SET status='seen' WHERE id=?", id); s.status = "seen"; }
  const def = FORMS[s.type as FormType];
  const data = JSON.parse(s.data) as Record<string, string>;
  return (
    <>
      <Title sub={`ثبت‌شده در ${fdate(s.created_at)}`} actions={<LinkBtn href="/admin/submissions">← بازگشت</LinkBtn>}>{def?.label ?? s.type} — {s.name}</Title>
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <dl className="grid gap-4 sm:grid-cols-2">
            {(def?.fields ?? Object.keys(data).map((k) => ({ name: k, label: k, type: "text" as const }))).map((f) => data[f.name] ? (
              <div key={f.name} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
                <dt className="text-xs font-bold text-slate-500">{f.label}</dt>
                <dd className="mt-1 whitespace-pre-wrap font-bold" dir={f.type === "tel" || f.type === "email" ? "ltr" : undefined}>{f.type === "tel" ? <a href={`tel:${data[f.name]}`} className="text-violet-700">{data[f.name]}</a> : f.type === "email" ? <a href={`mailto:${data[f.name]}`} className="text-violet-700">{data[f.name]}</a> : data[f.name]}</dd>
              </div>) : null)}
          </dl>
          {s.source && <p className="mt-5 text-xs text-slate-400">منبع: {s.source}</p>}
        </Card>
        <div className="grid content-start gap-5">
          <Card>
            <ActionForm action={updateSubmissionAction} submit="ذخیره‌ی وضعیت">
              <input type="hidden" name="id" value={s.id} />
              <Field label="وضعیت"><select name="status" defaultValue={s.status} className={inputCls}>{Object.entries(STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></Field>
              <Field label="یادداشت داخلی"><textarea name="note" defaultValue={s.note} rows={5} className={inputCls} /></Field>
            </ActionForm>
          </Card>
          <form action={deleteSubmissionAction}><input type="hidden" name="id" value={s.id} /><ConfirmButton message="این درخواست برای همیشه حذف شود؟" className="rounded-lg border border-red-300 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-50">حذف درخواست</ConfirmButton></form>
        </div>
      </div>
    </>
  );
}
