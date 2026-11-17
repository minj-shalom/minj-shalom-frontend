"use client";

import { RefObject, useEffect } from "react";
import { clamp } from "@/utils";

/**
 * @description 커서가 가까울수록 제목 글자(`[data-letter]`)의 폭이 넓어집니다.
 */
export function useLetterWave(
  heroRef: RefObject<HTMLElement | null>,
  titleRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    if (!enabled || !hero || !title) return;

    const letters = [...title.querySelectorAll<HTMLElement>("[data-letter]")];

    const onMove = (e: PointerEvent) => {
      letters.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const d = Math.hypot(
          e.clientX - (rect.left + rect.width / 2),
          e.clientY - (rect.top + rect.height / 2),
        );
        el.style.fontStretch = `${78 + clamp(1 - d / 300, 0, 1) * 22}%`;
      });
    };
    const onLeave = () => letters.forEach((el) => (el.style.fontStretch = ""));

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);

    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, [heroRef, titleRef, enabled]);
}
