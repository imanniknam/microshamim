"use client";

import { useState } from "react";
import type { FormDef } from "@/lib/forms";

export function RequestForm({ def }: { def: FormDef }) {
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");
  const [errs, setErrs] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    setState("busy"); setErrs({});
    try {
      const r = await fetch(`/api/forms/${def.type}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      const j = await r.json();
      setMsg(j.message ?? ""); setErrs(j.errors ?? {});
      if (r.ok) { setState("ok"); form.reset(); } else setState("err");
    } catch { setState("err"); setMsg("ارتباط با سرور برقرار نشد. دوباره تلاش کن."); }
  }

  if (state === "ok") {
    return (
      <div role="status" className="rounded-[22px] border-2 border-navy bg-tint-mint p-8 text-center shadow-[6px_7px_0_-1px_#10162f]">
        <p className="font-display font-black text-2xl">ممنون! ✓</p>
        <p className="mt-3 leading-[2]">{msg}</p>
        <button onClick={() => setState("idle")} className="mt-5 underline underline-offset-4 font-bold">ثبت یک درخواست دیگر</button>
      </div>
    );
  }

  const input = "w-full rounded-xl border-2 border-navy/80 bg-paper px-4 py-3 text-[1rem] outline-none transition focus:border-purple focus:shadow-[0_0_0_4px_rgba(108,53,217,.18)]";
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2" aria-label={def.title}>
      {def.fields.map((f) => {
        const err = errs[f.name];
        const common = { id: `f-${f.name}`, name: f.name, required: f.required, "aria-invalid": !!err, "aria-describedby": err ? `e-${f.name}` : undefined, className: input, placeholder: f.placeholder };
        return (
          <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
            <label htmlFor={`f-${f.name}`} className="mb-1.5 block font-display font-extrabold text-[0.95rem]">
              {f.label}{f.required && <span className="text-coral" aria-hidden> *</span>}
            </label>
            {f.type === "textarea" ? <textarea {...common} rows={4} />
              : f.type === "select" ? (
                <select {...common} defaultValue="">
                  <option value="" disabled>انتخاب کن…</option>
                  {f.options?.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : <input {...common} type={f.type} inputMode={f.type === "tel" || f.type === "number" ? "numeric" : undefined} min={f.type === "number" ? 0 : undefined} dir={f.type === "tel" || f.type === "email" ? "ltr" : undefined} style={f.type === "tel" || f.type === "email" ? { textAlign: "right" } : undefined} />}
            {err && <p id={`e-${f.name}`} className="mt-1 text-sm text-[#c0245f] font-bold">{err}</p>}
          </div>
        );
      })}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div className="sm:col-span-2">
        {state === "err" && msg && <p role="alert" className="mb-3 rounded-xl bg-[#ffe3e8] px-4 py-3 font-bold text-[#a3153f]">{msg}</p>}
        <button type="submit" disabled={state === "busy"} className="btn btn-purple w-full justify-center sm:w-auto disabled:opacity-70">
          {state === "busy" ? "در حال ارسال…" : def.submit}
        </button>
      </div>
    </form>
  );
}
