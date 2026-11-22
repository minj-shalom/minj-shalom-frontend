/**
 * @description 배포 도메인 (예: https://example.com). 끝의 슬래시는 제거합니다.
 * 프로덕션 배포 시 반드시 `NEXT_PUBLIC_SITE_URL`을 설정해야 canonical, sitemap, OG 이미지 주소가 올바르게 만들어집니다.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/+$/, "");

/** 검색엔진 소유권 확인 코드 (선택) */
export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
export const NAVER_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION;

/**
 * @description 백엔드(minj-shalom-backend) 주소. 끝의 슬래시는 제거하며 `/api` 는 axios 가 붙입니다.
 * 브라우저에서도 호출하므로 `NEXT_PUBLIC_` 값이고, 빌드 시점에 번들에 박힙니다.
 */
export const API_ENDPOINT = (
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4000"
).replace(/\/+$/, "");
