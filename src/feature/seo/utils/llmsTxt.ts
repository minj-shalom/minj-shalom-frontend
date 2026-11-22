import type { SiteContentInterface } from "@/feature/content/types";

const clean = (text: string) => text.replace(/\u00a0/g, " ");

/**
 * @description AI 에이전트(AEO)가 읽기 쉬운 요약 문서(/llms.txt)를 만듭니다.
 * 화면과 같은 콘텐츠에서 생성하므로 내용이 항상 동기화됩니다.
 */
export const buildLlmsTxt = ({ hero, seo, career, education, stack, contact }: SiteContentInterface) =>
  [
    `# ${hero.nameKo} (${hero.nameEn})`,
    "",
    `> ${seo.description}`,
    "",
    "## 소개",
    `- 직무: ${seo.jobTitle}`,
    "",
    "## 경력",
    ...career.map((e) => `- ${e.period}: ${e.title} — ${e.description}`),
    "",
    "## 학력",
    ...education.map((e) => `- ${e.period}: ${e.title} (${e.description})`),
    "",
    "## 기술",
    ...stack.flatMap((group) =>
      group.items.map((item) => `- ${group.title} / ${item.label}: ${clean(item.skills)}`),
    ),
    "",
    "## 링크",
    ...contact.map((link) => `- ${link.label}: ${link.href.replace(/^mailto:/, "")}`),
    "",
  ].join("\n");
