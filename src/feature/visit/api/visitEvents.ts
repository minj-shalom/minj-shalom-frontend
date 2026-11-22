/** 서버가 집계하는 행동 이름 (콘솔 Visitors 의 '문의 열기 · 문의 제출' 전환 통계) */
export type VisitEvent = "inquiry-open" | "inquiry-sent";

const events = new Set<VisitEvent>();

/** 이 방문에서 일어난 행동을 모아 두었다가 페이지를 떠날 때 방문 신호와 함께 보냅니다. */
export const recordVisitEvent = (event: VisitEvent) => {
  events.add(event);
};

export const getVisitEvents = (): VisitEvent[] => [...events];
