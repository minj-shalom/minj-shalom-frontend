import { API_ENDPOINT } from "@/configs";

export interface TrackVisitPayload {
  /** 유입 경로 (없으면 직접 방문) */
  referrer?: string;
  /** 체류 시간(초) */
  durationSec?: number;
  /** 스크롤로 도달한 섹션 */
  reached?: string[];
  /** 행동 (이메일 클릭 · 문의 열기 · 문의 제출 등) */
  events?: string[];
}

/**
 * 방문 신호 보내기 (POST /site/visits - 응답을 기다리지 않는 fire-and-forget).
 * 탭을 닫는 순간에도 전달되도록 sendBeacon 을 쓰고, 지원하지 않으면 keepalive fetch 로 보냅니다.
 */
export const trackVisit = (data: TrackVisitPayload) => {
  const url = `${API_ENDPOINT}/api/site/visits`;
  const body = JSON.stringify(data);

  try {
    if (navigator.sendBeacon?.(url, new Blob([body], { type: "application/json" }))) return;
    void fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
  } catch {
    // 방문 기록 실패가 화면에 영향을 주면 안 되므로 무시
  }
};
