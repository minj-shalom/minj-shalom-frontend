import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { SITE_CONTENT_TAG } from "@/feature/content";

const safeEqual = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

/**
 * 콘솔에서 콘텐츠를 반영하면 백엔드가 호출하는 캐시 무효화 엔드포인트.
 * `x-revalidate-secret` 헤더가 REVALIDATE_SECRET 과 같을 때만 동작하고, 값이 설정되지 않았다면 항상 닫혀 있습니다.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return Response.json({ revalidated: false, message: "REVALIDATE_SECRET 이 설정되지 않았어요." }, { status: 503 });

  const given = request.headers.get("x-revalidate-secret") ?? "";
  if (!safeEqual(given, secret)) return Response.json({ revalidated: false, message: "인증에 실패했어요." }, { status: 401 });

  // expire: 0 → 오래된 값을 보여주지 않고 다음 요청에서 바로 새로 가져옴 (반영 직후 확인용)
  revalidateTag(SITE_CONTENT_TAG, { expire: 0 });

  return Response.json({ revalidated: true, tag: SITE_CONTENT_TAG });
}
