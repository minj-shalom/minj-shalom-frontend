import { CONTACT_LINKS, EMAIL, NAME_EN, NAME_KO } from "@/constants";
import { CAREER_ENTRIES } from "@/feature/career/constants";
import { EDUCATION_ENTRIES, LICENSES } from "@/feature/education/constants";
import { ALMA_MATER, EMPLOYER, JOB_TITLE, SITE_DESCRIPTION, SITE_KEYWORDS, SITE_TITLE } from "@/feature/seo/constants";
import { STACK_GROUPS, STACK_MARQUEE_ROWS } from "@/feature/stack/constants";
import type { SiteContentInterface } from "../types";

/**
 * 서버에서 콘텐츠를 받지 못할 때(서버 점검 · 아직 반영 전 · 빌드 시점) 보여주는 기본 콘텐츠입니다.
 * 콘솔에서 반영한 내용이 있으면 항상 그쪽이 우선합니다.
 */
export const DEFAULT_SITE_CONTENT: SiteContentInterface = {
  hero: {
    nameKo: NAME_KO,
    nameEn: NAME_EN,
    lede1: "프론트엔드와 백엔드를 모두 다루는 풀스택 개발자입니다.",
    lede2: "AI 연구에서는 주로 에이전트를 만듭니다.",
    leftTitle: "풀스택 개발",
    leftDesc: "프론트엔드부터 백엔드까지 직접 구현합니다.",
    rightTitle: "AI 연구",
    rightDesc: "LLM 에이전트와 RAG를 구축합니다.",
  },
  sections: {
    stack: { title: "다루는 기술", description: "화면과 서버, 배포, 그리고 LLM 기반 AI를 만들 때 쓰는 기술입니다." },
    edu: { title: "배운 곳", description: "최종 학력은 인천대학교 졸업입니다." },
    path: { title: "일해 온 곳" },
    contact: { title: "이야기 나눠요", description: "채용, 협업, 연구 제안 등 어떤 이야기든 환영해요." },
  },
  career: CAREER_ENTRIES,
  education: EDUCATION_ENTRIES,
  licenses: LICENSES,
  stack: STACK_GROUPS,
  marquee: STACK_MARQUEE_ROWS.map((row, index) => ({ items: row.items, tone: index === 0 ? "cyan" : "violet" })),
  contact: CONTACT_LINKS,
  seo: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    keywords: SITE_KEYWORDS,
    jobTitle: JOB_TITLE,
    employer: EMPLOYER,
    almaMater: ALMA_MATER,
    email: EMAIL,
  },
};
