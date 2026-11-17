"use client";

import { RefObject, useEffect } from "react";
import { clamp } from "@/utils";
import { useFinePointer } from "./useMediaQuery";

/**
 * @description 컨테이너 안의 `[data-magnet]` 요소가 커서가 가까워지면 살짝 끌려옵니다.
 */
export function useMagnet(containerRef: RefObject<HTMLElement | null>) {
  const fine = useFinePointer();

  useEffect(() => {
    const container = containerRef.current;
    if (!fine || !container) return;

    const targets = [
      ...container.querySelectorAll<HTMLElement>("[data-magnet]"),
    ];
    targets.forEach((el) => {
      el.style.transition = "transform .35s cubic-bezier(.2,.8,.2,1)";
    });

    const onMove = (e: PointerEvent) => {
      for (const el of targets) {
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const reach = Math.max(rect.width, rect.height) / 2 + 60;

        if (Math.hypot(dx, dy) < reach) {
          el.style.transform = `translate(${clamp(dx * 0.22, -14, 14)}px,${clamp(dy * 0.3, -10, 10)}px)`;
        } else if (el.style.transform) {
          el.style.transform = "";
        }
      }
    };

    document.addEventListener("pointermove", onMove);

    return () => {
      document.removeEventListener("pointermove", onMove);
      targets.forEach((el) => {
        el.style.transition = "";
        el.style.transform = "";
      });
    };
  }, [fine, containerRef]);
}
