import "server-only";
import nodemailer from "nodemailer";
import { getNotify, getSite } from "./data";
import { FORMS } from "../forms";
import type { FormType } from "../types";

type Sub = { id: number; type: FormType; name: string; phone: string; email: string; data: Record<string, string> };

/** Fire-and-forget: e-mail (SMTP from admin settings) + webhook. Failures are logged, never block the visitor. */
export async function notifySubmission(sub: Sub) {
  const n = getNotify();
  const site = getSite();
  const def = FORMS[sub.type];
  const lines = def.fields.map((f) => `${f.label}: ${sub.data[f.name] ?? "-"}`).join("\n");
  const subject = `[${site.name}] ${def.label} — ${sub.name}`;
  const text = `${def.label} (#${sub.id})\n\n${lines}`;

  const jobs: Promise<unknown>[] = [];
  if (n.email && n.smtp.host) {
    jobs.push(
      nodemailer
        .createTransport({ host: n.smtp.host, port: n.smtp.port, secure: n.smtp.secure, auth: n.smtp.user ? { user: n.smtp.user, pass: n.smtp.pass } : undefined })
        .sendMail({ from: n.smtp.from || n.smtp.user, to: n.email, replyTo: sub.email || undefined, subject, text })
        .catch((e) => console.error("[notify:mail]", e?.message)),
    );
  }
  if (n.webhook) {
    jobs.push(
      fetch(n.webhook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ event: "submission.created", id: sub.id, type: sub.type, label: def.label, name: sub.name, phone: sub.phone, email: sub.email, data: sub.data, text }), signal: AbortSignal.timeout(8000) }).catch((e) => console.error("[notify:webhook]", e?.message)),
    );
  }
  await Promise.allSettled(jobs);
}
