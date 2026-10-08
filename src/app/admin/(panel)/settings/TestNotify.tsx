"use client";
import { useState, useTransition } from "react";
import { testNotifyAction } from "../../actions";
import { Banner } from "@/components/admin/Forms";
import type { State } from "../../actions";
export function TestNotify() {
  const [s, setS] = useState<State>(null);
  const [p, start] = useTransition();
  return <div className="flex flex-wrap items-center gap-3"><button type="button" disabled={p} onClick={() => start(async () => setS(await testNotifyAction()))} className="rounded-lg border px-4 py-2 text-sm font-bold hover:bg-slate-50">{p ? "در حال آزمایش…" : "ارسال آزمایشی (بعد از ذخیره)"}</button><Banner state={s} /></div>;
}
