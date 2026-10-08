export type Btn = { label: string; href: string; variant?: "purple" | "yellow" | "outline" | "navy" };
export type Tone = "cream" | "lavender" | "mint" | "navy" | "purple" | "yellow";
export type CardItem = { title: string; text?: string; list?: string[]; icon?: string; button?: Btn; image?: string; tint?: string };

export type Block =
  | { type: "hero"; eyebrow?: string; title: string; subtitle?: string; paragraphs?: string[]; buttons?: Btn[]; image?: string; tone?: Tone }
  | { type: "text"; eyebrow?: string; title?: string; paragraphs: string[]; highlight?: string; tone?: Tone }
  | { type: "cards"; eyebrow?: string; title?: string; intro?: string; items: CardItem[]; columns?: 2 | 3 | 4; tone?: Tone }
  | { type: "checklist"; eyebrow?: string; title?: string; intro?: string; items: string[]; footer?: string; tone?: Tone }
  | { type: "steps"; title?: string; intro?: string; items: string[]; statement?: string; tone?: Tone }
  | { type: "feature"; eyebrow?: string; title: string; paragraphs?: string[]; listTitle?: string; list?: string[]; image?: string; buttons?: Btn[]; reverse?: boolean; tone?: Tone }
  | { type: "faq"; title?: string; items: { q: string; a: string }[] }
  | { type: "cta"; title: string; text?: string; buttons: Btn[]; tone?: Tone }
  | { type: "courses"; title?: string; intro?: string }
  | { type: "flow"; title?: string; intro?: string; items: string[]; text?: string };

export type BlockType = Block["type"];

export type SiteSettings = {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  mapUrl: string;
  socials: { instagram: string; telegram: string; linkedin: string; aparat: string; whatsapp: string };
  copyright: string;
  footerAbout: string;
  seo: { title: string; description: string; ogImage: string };
  nav: { label: string; href: string }[];
  headerCta: { label: string; href: string };
  footerLinks: { label: string; href: string }[];
};

export type NotifySettings = {
  email: string; // recipient(s), comma separated
  webhook: string;
  smtp: { host: string; port: number; secure: boolean; user: string; pass: string; from: string };
};

export type FormType = "cowork" | "studio" | "meeting" | "event" | "visit" | "school" | "contact";
