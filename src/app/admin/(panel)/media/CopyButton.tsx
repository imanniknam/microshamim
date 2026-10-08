"use client";
import { useState } from "react";
export function CopyButton({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return <button type="button" className="rounded border px-2 py-1 font-bold" onClick={() => { navigator.clipboard?.writeText(location.origin + text); setOk(true); setTimeout(() => setOk(false), 1500); }}>{ok ? "کپی شد ✓" : "کپی لینک"}</button>;
}
