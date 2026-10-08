import type { SVGProps } from "react";

/** Small stroke icon set (24px grid). Hand-tuned, 2px strokes, round caps. */
const paths = {
  cap: <><path d="M2 9l10-5 10 5-10 5L2 9z" /><path d="M6 11.5V16c0 1.2 2.7 3 6 3s6-1.8 6-3v-4.5" /><path d="M22 9v6" /></>,
  laptop: <><rect x="4" y="5" width="16" height="11" rx="1.5" /><path d="M2 19h20" /><path d="M9 19l.5-3h5l.5 3" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" /></>,
  camera: <><path d="M4 8h3l1.6-2.5h6.8L17 8h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z" /><circle cx="12" cy="13" r="3.8" /></>,
  mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0014 0M12 18v3M8.5 21h7" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" /><circle cx="17" cy="9" r="2.5" /><path d="M16.5 14.3c2.7-.2 4.5 1.6 4.5 4.2" /></>,
  coffee: <><path d="M4 9h12v6a4 4 0 01-4 4H8a4 4 0 01-4-4V9z" /><path d="M16 10h2a2.5 2.5 0 010 5h-2M7 3c0 1.3 1 1.7 1 3M11 3c0 1.3 1 1.7 1 3" /></>,
  network: <><circle cx="12" cy="12" r="2.4" /><circle cx="5" cy="5.5" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="19" cy="18.5" r="2" /><path d="M6.5 7l4 3.5M17.5 7.5l-4 3.2M7.5 17.5l3.2-3.3M17.5 17l-4-3.2" /></>,
  megaphone: <><path d="M3 10v4a1 1 0 001 1h3l8 4V5L7 9H4a1 1 0 00-1 1z" /><path d="M18.5 9a4 4 0 010 6M7 15l1 5h2.5l-.8-4.5" /></>,
  play: <><rect x="3" y="4.5" width="18" height="12" rx="2" /><path d="M10.5 8.2v4.6l4-2.3-4-2.3zM8 20h8M12 16.5V20" /></>,
  building: <><rect x="4" y="3.5" width="16" height="17" rx="1.5" /><path d="M8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01M10 20.5v-4h4v4" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5L21 21" /></>,
  arrow: <path d="M20 12H5M11 5l-7 7 7 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  star: <path d="M12 3.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.8l6-.8L12 3.5z" />,
  heart: <path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0112 7.3 4.3 4.3 0 0119.5 10c0 5.600-7.500 10-7.500 10z" />,
  user: <><circle cx="12" cy="8" r="3.6" /><path d="M5 20c0-3.800 3.100-6 7-6s7 2.200 7 6" /></>,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.300 5.300l2.100 2.100M16.600 16.600l2.100 2.100M18.700 5.300l-2.100 2.100M7.400 16.600l-2.100 2.100" /></>,
  coin: <><circle cx="12" cy="12" r="8.500" /><path d="M14.500 9.200c-.5-.8-1.400-1.200-2.500-1.200-1.400 0-2.400.7-2.400 1.800 0 2.500 5 1.200 5 3.800 0 1.100-1 1.900-2.600 1.900-1.200 0-2.100-.5-2.600-1.300M12 6.500V8M12 16v1.500" /></>,
  briefcase: <><rect x="3" y="7.500" width="18" height="12" rx="2" /><path d="M8.500 7.500V5.500a1 1 0 011-1h5a1 1 0 011 1v2M3 13h18" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  bulb: <><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.500 10.900c.6.500 1 1.200 1 2V16h5v-.1c0-.8.4-1.500 1-2A6 6 0 0012 3z" /></>,
  puzzle: <path d="M10 4a2 2 0 114 0v2h4v4h-2a2 2 0 100 4h2v4h-4v-2a2 2 0 10-4 0v2H6v-4h2a2 2 0 100-4H6V6h4V4z" />,
  chat: <><path d="M4 5h16v11H9l-5 4V5z" /><path d="M8 9.500h8M8 12.500h5" /></>,
  insta: <><rect x="3.500" y="3.500" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.200" cy="6.800" r=".6" /></>,
  link: <><path d="M10 14a4 4 0 005.700 0l3-3a4 4 0 00-5.700-5.700l-1 1M14 10a4 4 0 00-5.700 0l-3 3a4 4 0 005.700 5.700l1-1" /></>,
  video: <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10.500l5-3v9l-5-3" /></>,
  send: <path d="M21 3L3 10.500l7 2.500 2.500 7L21 3zM10 13l5-5" />,
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className, ...rest }: { name: IconName; className?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
