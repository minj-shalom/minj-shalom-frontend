import type { TimelineEntry } from "@/components";
import type { LicenseInterface } from "@/feature/education/types";
import type { StackGroupInterface } from "@/feature/stack/types";

export type SectionKey = "stack" | "edu" | "path" | "contact";

export interface HeroContent {
  nameKo: string;
  nameEn: string;
  lede1: string;
  lede2: string;
  leftTitle: string;
  leftDesc: string;
  rightTitle: string;
  rightDesc: string;
}

export interface ContactLinkInterface {
  label: string;
  href: string;
  external: boolean;
}

export interface MarqueeContentRow {
  items: string[];
  tone: "cyan" | "violet";
}

export interface SeoContent {
  title: string;
  description: string;
  keywords: string[];
  jobTitle: string;
  employer: string;
  almaMater: string;
  email: string;
}

export interface SectionContent {
  title: string;
  description?: string;
}

/** 화면이 그리는 사이트 콘텐츠 (서버 응답을 정리한 모양, 서버에 연결하지 못하면 기본 상수 사용) */
export interface SiteContentInterface {
  hero: HeroContent;
  sections: Record<SectionKey, SectionContent>;
  career: TimelineEntry[];
  education: TimelineEntry[];
  licenses: LicenseInterface[];
  stack: StackGroupInterface[];
  marquee: MarqueeContentRow[];
  contact: ContactLinkInterface[];
  seo: SeoContent;
}

/** GET /site/content 응답 (PublicContentDto) */
export interface PublicContentResponse {
  versionNo: number;
  publishedAt: string;
  hero: HeroContent;
  career: { id: string; period: string; title: string; description: string }[];
  education: { id: string; period: string; title: string; description: string }[];
  licenses: { id: string; date: string; name: string; issuer: string }[];
  stack: { id: string; title: string; tone: "cyan" | "violet"; items: { id: string; label: string; skills: string }[] }[];
  contact: { id: string; label: string; href: string; external: boolean }[];
  seoDescription: string;
  sections: Record<string, { title: string; description: string | null }>;
  marquee: { id: string; items: string; tone: "cyan" | "violet" }[];
  seo: {
    siteUrl: string;
    email: string;
    title: string;
    description: string;
    keywords: string[];
    jobTitle: string | null;
    employer: string | null;
    almaMater: string | null;
  } | null;
}
