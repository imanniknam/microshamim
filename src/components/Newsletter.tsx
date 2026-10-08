"use client";
import { useState } from "react";

export function Newsletter() {
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("busy");
    try {
      const r = await fetch("/api/newsletter", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: fd.get("email"), website: fd.get("website") }) });
      const j = await r.json();
      setState(r.ok ? "ok" : "err"); setMsg(j.message ?? "");
    } catch { setState("err"); setMsg("ارتباط با سرور برقرار نشد."); }
  }
  return (
    <form onSubmit={onSubmit} aria-label="عضویت در خبرنامه">
      <div className="flex w-full max-w-md items-stretch overflow-hidden rounded-[14px] border-2 border-white/25 focus-within:border-yellow">
        <label htmlFor="nl-email" className="sr-only">ایمیل</label>
        <input id="nl-email" name="email" type="email" required placeholder="ایمیل خود را وارد کنید..." disabled={state === "ok"} dir="ltr"
          className="min-w-0 flex-1 bg-white/5 px-4 py-3 text-white placeholder:text-white/45 text-right outline-none" />
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
        <button type="submit" disabled={state === "busy" || state === "ok"} className="bg-purple px-5 font-display font-black text-white hover:bg-[#7d4ae6] transition-colors disabled:opacity-80">
          {state === "ok" ? "ثبت شد ✓" : state === "busy" ? "…" : "عضویت"}
        </button>
      </div>
      {msg && <p role="status" className={`mt-2 text-sm ${state === "ok" ? "text-green" : "text-coral"}`}>{msg}</p>}
    </form>
  );
}
