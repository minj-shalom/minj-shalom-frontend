import { CONTACT_LINKS, NAME_EN, NAME_KO } from "@/constants";
import { CAREER_ENTRIES } from "@/feature/career/constants";
import { EDUCATION_ENTRIES } from "@/feature/education/constants";
import { STACK_GROUPS } from "@/feature/stack/constants";
import { JOB_TITLE, SITE_DESCRIPTION } from "../constants";

const clean = (text: string) => text.replace(/ /g, " ");

/**
 * @description AI 에이전트(AEO)가 읽기 쉬운 요약 문서(/llms.txt)를 만듭니다.
 * 화면과 같은 상수에서 생성하므로 내용이 항상 동기화됩니다.
 */
export const buildLlmsTxt = () =>
  [
    `# ${NAME_KO} (${NAME_EN})`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "## 소개",
    `- 직무: ${JOB_TITLE}`,
    "",
    "## 경력",
    ...CAREER_ENTRIES.map(
      (e) => `- ${e.period}: ${e.title} — ${e.description}`,
    ),
    "",
    "## 학력",
    ...EDUCATION_ENTRIES.map(
      (e) => `- ${e.period}: ${e.title} (${e.description})`,
    ),
    "",
    "## 기술",
    ...STACK_GROUPS.flatMap((group) =>
      group.items.map(
        (item) => `- ${group.title} / ${item.label}: ${clean(item.skills)}`,
      ),
    ),
    "",
    "## 링크",
    ...CONTACT_LINKS.map(
      (link) => `- ${link.label}: ${link.href.replace(/^mailto:/, "")}`,
    ),
    "",
  ].join("\n");
