"use client";

import { useActionState } from "react";
import { loginAction, setupAction } from "../actions";
import { Banner, btnCls, inputCls } from "@/components/admin/Forms";

/* Rendered for both states; the server decides which form is valid (setup only works while no user exists). */
export default function LoginPage() {
  const [ls, la, lp] = useActionState(loginAction, null);
  const [ss, sa, sp] = useActionState(setupAction, null);
  return (
    <div className="grid min-h-svh place-items-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-xl">
        <h1 className="text-2xl font-black">ورود به پنل مدیریت</h1>
        <p className="mt-1 text-sm text-slate-500">میکروشمیم</p>
        <form action={la} className="mt-6 grid gap-4">
          <label className="grid gap-1.5 text-sm font-bold">ایمیل<input name="email" type="email" required dir="ltr" className={inputCls} autoComplete="username" /></label>
          <label className="grid gap-1.5 text-sm font-bold">گذرواژه<input name="password" type="password" required dir="ltr" className={inputCls} autoComplete="current-password" /></label>
          <button className={btnCls} disabled={lp}>{lp ? "…" : "ورود"}</button>
          <Banner state={ls} />
        </form>
        <details className="mt-6 rounded-xl border bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-bold text-slate-600">اولین اجرا؟ ساخت مدیر اصلی</summary>
          <form action={sa} className="mt-4 grid gap-3">
            <input name="name" placeholder="نام" className={inputCls} />
            <input name="email" type="email" required placeholder="ایمیل" dir="ltr" className={inputCls} />
            <input name="password" type="password" required minLength={8} placeholder="گذرواژه (حداقل ۸ نویسه)" dir="ltr" className={inputCls} />
            <input name="password2" type="password" required minLength={8} placeholder="تکرار گذرواژه" dir="ltr" className={inputCls} />
            <button className={btnCls} disabled={sp}>ساخت مدیر</button>
            <Banner state={ss} />
          </form>
          <p className="mt-2 text-xs text-slate-500">این فرم فقط زمانی کار می‌کند که هیچ کاربری ساخته نشده باشد.</p>
        </details>
      </div>
    </div>
  );
}
