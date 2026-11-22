import { cacheLife, cacheTag } from "next/cache";
import { axios } from "@/configs";
import type { ResponseType } from "@/types";
import { DEFAULT_SITE_CONTENT, SITE_CONTENT_TAG } from "../constants";
import type { PublicContentResponse, SectionKey, SiteContentInterface } from "../types";

/** 화면에서 쓰는 섹션 키 → 서버(/site/content)가 내려주는 섹션 키 (서버는 career · education 이라고 부릅니다) */
const SERVER_SECTION_KEY: Record<SectionKey, string> = { stack: "stack", edu: "education", path: "career", contact: "contact" };
const SECTION_KEYS = Object.keys(SERVER_SECTION_KEY) as SectionKey[];

/** 서버 응답을 화면이 그리는 모양으로 정리 (비어 있는 값은 기본 콘텐츠로 채움) */
const toSiteContent = (res: PublicContentResponse): SiteContentInterface => {
  const base = DEFAULT_SITE_CONTENT;
  const sections = { ...base.sections };
  SECTION_KEYS.forEach((key) => {
    const section = res.sections?.[SERVER_SECTION_KEY[key]];
    if (section?.title) sections[key] = { title: section.title, description: section.description ?? undefined };
  });

  return {
    hero: res.hero ?? base.hero,
    sections,
    career: res.career?.map(({ period, title, description }) => ({ period, title, description })) ?? base.career,
    education: res.education?.map(({ period, title, description }) => ({ period, title, description })) ?? base.education,
    licenses: res.licenses?.map(({ date, name, issuer }) => ({ date, name, issuer })) ?? base.licenses,
    stack: res.stack?.map(({ id, title, tone, items }) => ({ id, title, tone, items: items.map(({ label, skills }) => ({ label, skills })) })) ?? base.stack,
    marquee: res.marquee?.length
      ? res.marquee.map(({ items, tone }) => ({
          items: items.split(",").map((item) => item.trim()).filter(Boolean),
          tone,
        }))
      : base.marquee,
    contact: res.contact?.map(({ label, href, external }) => ({ label, href, external })) ?? base.contact,
    seo: res.seo
      ? {
          title: res.seo.title,
          description: res.seo.description,
          keywords: res.seo.keywords,
          jobTitle: res.seo.jobTitle ?? base.seo.jobTitle,
          employer: res.seo.employer ?? base.seo.employer,
          almaMater: res.seo.almaMater ?? base.seo.almaMater,
          email: res.seo.email,
        }
      : { ...base.seo, description: res.seoDescription || base.seo.description },
  };
};

/**
 * 운영 중인 사이트 콘텐츠 조회 (GET /site/content - 인증 없음).
 * 서버에서 1분 단위로 캐시하고, 서버에 연결하지 못하면 기본 콘텐츠를 돌려줍니다.
 * 콘솔에서 반영하면 SITE_CONTENT_TAG 가 무효화되어(/api/revalidate) 다음 요청에 바로 새 값이 나옵니다.
 */
export const getSiteContent = async (): Promise<SiteContentInterface> => {
  "use cache";
  cacheTag(SITE_CONTENT_TAG);
  // stale 이 5분 미만이면 정적 쉘(App Shell)에서 빠져 페이지가 데이터를 기다리며 막히므로 300초 이상으로 둔다.
  // 서버 쪽 갱신 주기는 revalidate(1분)로 그대로 유지된다.
  cacheLife({ stale: 300, revalidate: 60, expire: 60 * 60 });

  try {
    const response = await axios.get<ResponseType<PublicContentResponse>>("/site/content");

    return toSiteContent(response.data.data);
  } catch {
    return DEFAULT_SITE_CONTENT;
  }
};
