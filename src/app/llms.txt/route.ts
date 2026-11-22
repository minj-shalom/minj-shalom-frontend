import { getSiteContent } from "@/feature/content";
import { buildLlmsTxt } from "@/feature/seo";

export async function GET() {
  return new Response(buildLlmsTxt(await getSiteContent()), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
