"use client";

import { useRef } from "react";
import { clamp } from "@/utils";
import { useReducedMotion } from "./useMediaQuery";
import { useScrollEffect } from "./useScrollEffect";

const getProgress = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();

  return clamp((innerHeight * 0.72 - rect.top) / (rect.height * 0.85), 0, 1);
};

/**
 * @description 요소가 화면에 들어온 정도(0~1)를 CSS 변수 `--p`로 기록합니다.
 * 스크롤마다 리렌더하지 않도록 DOM에 직접 씁니다.
 */
export function useScrollProgress<T extends HTMLElement>(
  onProgress?: (progress: number, el: T, reduced: boolean) => void,
) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();

  useScrollEffect(() => {
    const el = ref.current;
    if (!el) return;

    const progress = reduced ? 1 : getProgress(el);
    el.style.setProperty("--p", String(progress));
    onProgress?.(progress, el, reduced);
  }, [reduced]);

  return ref;
}
