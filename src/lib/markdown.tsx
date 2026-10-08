import React from "react";

const safeUrl = (u: string) => (/^(https?:\/\/|\/|#|mailto:|tel:)/i.test(u) ? u : "#");

function inline(text: string, key = "i"): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\))/g;
  let last = 0, m: RegExpExecArray | null, n = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const t = m[0], k = `${key}${n++}`;
    if (t.startsWith("**")) out.push(<strong key={k}>{t.slice(2, -2)}</strong>);
    else if (t.startsWith("`")) out.push(<code key={k} className="rounded bg-navy/10 px-1.5 py-0.5 text-[0.9em]" dir="ltr">{t.slice(1, -1)}</code>);
    else if (t.startsWith("![")) {
      const mm = /!\[([^\]]*)\]\(([^)]+)\)/.exec(t)!;
      // eslint-disable-next-line @next/next/no-img-element
      out.push(<img key={k} src={safeUrl(mm[2])} alt={mm[1]} loading="lazy" className="my-6 w-full rounded-2xl" />);
    } else if (t.startsWith("[")) {
      const mm = /\[([^\]]+)\]\(([^)]+)\)/.exec(t)!;
      out.push(<a key={k} href={safeUrl(mm[2])} className="font-bold text-purple underline underline-offset-4" {...(/^https?:/.test(mm[2]) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{mm[1]}</a>);
    } else out.push(<em key={k}>{t.slice(1, -1)}</em>);
    last = m.index + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Minimal, XSS-safe Markdown → React (no raw HTML is ever interpreted). */
export function Markdown({ source }: { source: string }) {
  const lines = source.replace(/\r/g, "").split("\n");
  const els: React.ReactNode[] = [];
  let i = 0, k = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    let m: RegExpExecArray | null;
    if ((m = /^(#{1,4})\s+(.*)$/.exec(l))) {
      const lvl = m[1].length;
      const cls = ["", "display-md mt-10", "font-display font-black text-[1.6rem] mt-9", "font-display font-extrabold text-[1.3rem] mt-7", "font-display font-bold text-lg mt-6"][lvl];
      els.push(React.createElement(`h${Math.min(lvl + 1, 5)}`, { key: k++, className: cls }, inline(m[2], `h${k}`))); i++;
    } else if (/^\s*[-*]\s+/.test(l)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*[-*]\s+/, ""));
      els.push(<ul key={k++} className="my-4 grid gap-2 ps-6 list-disc marker:text-purple">{items.map((t, j) => <li key={j}>{inline(t, `u${k}${j}`)}</li>)}</ul>);
    } else if (/^\s*\d+[.)]\s+/.test(l)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*\d+[.)]\s+/, ""));
      els.push(<ol key={k++} className="my-4 grid gap-2 ps-6 list-decimal marker:text-purple marker:font-bold">{items.map((t, j) => <li key={j}>{inline(t, `o${k}${j}`)}</li>)}</ol>);
    } else if (/^>\s?/.test(l)) {
      const q: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) q.push(lines[i++].replace(/^>\s?/, ""));
      els.push(<blockquote key={k++} className="my-6 border-s-4 border-yellow bg-yellow/20 px-5 py-3 font-display font-bold text-lg">{inline(q.join(" "), `q${k}`)}</blockquote>);
    } else if (/^---+$/.test(l.trim())) { els.push(<hr key={k++} className="my-8 border-dashed border-navy/30" />); i++; }
    else {
      const p: string[] = [];
      while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|\s*[-*]\s|\s*\d+[.)]\s|>\s?|---+$)/.test(lines[i])) p.push(lines[i++]);
      els.push(<p key={k++} className="my-4 leading-[2.15]">{inline(p.join(" "), `p${k}`)}</p>);
    }
  }
  return <>{els}</>;
}
