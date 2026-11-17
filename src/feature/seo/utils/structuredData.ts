import { CONTACT_LINKS, EMAIL, NAME_EN, NAME_KO } from "@/constants";
import { SITE_URL } from "@/configs";
import { STACK_GROUPS } from "@/feature/stack";
import {
  ALMA_MATER,
  EMPLOYER,
  JOB_TITLE,
  SITE_DESCRIPTION,
  SITE_TITLE,
} from "../constants";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// "TanStack Query, Ant Design" 같은 문자열을 개별 기술 목록으로 풉니다.
const knowsAbout = [
  ...new Set(
    STACK_GROUPS.flatMap((group) =>
      group.items.flatMap((item) =>
        item.skills.split(",").map((skill) => skill.replace(/ /g, " ").trim()),
      ),
    ),
  ),
];

const sameAs = CONTACT_LINKS.filter((link) => link.external).map(
  (link) => link.href,
);

/** 이 사이트가 설명하는 사람 */
export const personJsonLd = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: NAME_KO,
  alternateName: NAME_EN,
  url: SITE_URL,
  email: EMAIL,
  description: SITE_DESCRIPTION,
  jobTitle: JOB_TITLE,
  worksFor: { "@type": "Organization", name: EMPLOYER },
  alumniOf: { "@type": "CollegeOrUniversity", name: ALMA_MATER },
  knowsAbout,
  knowsLanguage: "ko",
  sameAs,
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE_TITLE,
  description: SITE_DESCRIPTION,
  inLanguage: "ko-KR",
  publisher: { "@id": PERSON_ID },
};

export const profilePageJsonLd = {
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profile`,
  url: SITE_URL,
  name: SITE_TITLE,
  description: SITE_DESCRIPTION,
  inLanguage: "ko-KR",
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: { "@id": PERSON_ID },
};

/** 한 번에 내보내는 @graph */
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [personJsonLd, websiteJsonLd, profilePageJsonLd],
};
