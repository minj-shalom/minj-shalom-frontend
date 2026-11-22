"use client";

import { useEffect } from "react";
import { NAV_ITEMS } from "@/constants";
import { getVisitEvents, trackVisit } from "../../api";

/** 페이지를 떠날 때 체류 시간 · 도달한 섹션 · 유입 경로를 한 번만 보냅니다. (화면에는 아무것도 그리지 않음) */
export function VisitTracker() {
  useEffect(() => {
    const startedAt = Date.now();
    // 서버(콘솔 통계)는 섹션을 화면에 보이는 이름(소개 · 기술 · 학력 · 경력 · 연락)으로 집계합니다.
    const labelOf = new Map<string, string>(NAV_ITEMS.map(({ id, label }) => [id, label]));
    const reached = new Set<string>([labelOf.get("top") ?? "소개"]);
    let sent = false;

    // 화면에 들어온 섹션을 기록
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && reached.add(labelOf.get(entry.target.id) ?? entry.target.id)),
      { threshold: 0.3 },
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const send = () => {
      if (sent) return;
      sent = true;
      trackVisit({
        referrer: document.referrer || undefined,
        durationSec: Math.min(Math.round((Date.now() - startedAt) / 1000), 86_400),
        reached: [...reached].slice(0, 10),
        events: getVisitEvents(),
      });
    };
    // 모바일 브라우저는 unload 가 불안정하므로 숨김 처리될 때 보냄
    const onVisibility = () => document.visibilityState === "hidden" && send();

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", send);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", send);
      observer.disconnect();
    };
  }, []);

  return null;
}
