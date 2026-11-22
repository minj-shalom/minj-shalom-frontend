import { SITE_URL } from "@/configs";
import type { SiteContentInterface } from "@/feature/content/types";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** 한 번에 내보내는 @graph (콘솔에서 반영한 콘텐츠로 만듭니다) */
export const buildSiteJsonLd = ({ hero, seo, stack, contact }: SiteContentInterface) => {
  // "TanStack Query, Ant Design" 같은 문자열을 개별 기술 목록으로 풉니다.
  const knowsAbout = [
    ...new Set(
      stack.flatMap((group) =>
        group.items.flatMap((item) => item.skills.split(",").map((skill) => skill.replace(/\u00a0/g, " ").trim())),
      ),
    ),
  ];
  const sameAs = contact.filter((link) => link.external).map((link) => link.href);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: hero.nameKo,
        alternateName: hero.nameEn,
        url: SITE_URL,
        email: seo.email,
        description: seo.description,
        jobTitle: seo.jobTitle,
        worksFor: { "@type": "Organization", name: seo.employer },
        alumniOf: { "@type": "CollegeOrUniversity", name: seo.almaMater },
        knowsAbout,
        knowsLanguage: "ko",
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: seo.title,
        description: seo.description,
        inLanguage: "ko-KR",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: seo.title,
        description: seo.description,
        inLanguage: "ko-KR",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
      },
    ],
  };
};
