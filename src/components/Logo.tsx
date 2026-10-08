/** MicroShamim wordmark with the "lotus leaf" mark. Pure SVG + live text so it stays crisp. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} aria-label="میکروشمیم">
      <svg viewBox="0 0 40 40" width="38" height="38" aria-hidden="true">
        <path d="M20 4c-1.500 6-6.500 8.500-6.500 15 0 4.500 3 8 6.500 9.500 3.500-1.500 6.500-5 6.500-9.500C26.500 12.500 21.500 10 20 4z" fill="#6c35d9" />
        <path d="M9 14c4 .5 8 3.500 8 9 0 2-1 4-2.500 5.500C9 27 6 22 9 14z" fill="#8f5cf2" />
        <path d="M31 14c-4 .5-8 3.500-8 9 0 2 1 4 2.500 5.500C31 27 34 22 31 14z" fill="#f58d9b" />
        <path d="M20 29v6" stroke="#10162f" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="font-display text-[1.7rem] leading-none font-black tracking-tight text-purple">شمیم</span>
    </span>
  );
}
