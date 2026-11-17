import type { MetadataRoute } from "next";
import { SITE_URL } from "@/configs";

export default function robots(): MetadataRoute.Robots {
  return {
    // 검색엔진과 AI 크롤러(GPTBot, ClaudeBot, PerplexityBot 등) 모두 허용합니다.
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
