import type { Metadata } from "next";
import { NotFound } from "@/components";

// 404 화면은 색인되지 않아야 하므로 레이아웃의 robots, canonical 설정을 덮어씁니다.
export const metadata: Metadata = {
  title: "없는 페이지 | 이민재",
  robots: { index: false, follow: false },
  alternates: {},
};

export default function Page() {
  return <NotFound />;
}
