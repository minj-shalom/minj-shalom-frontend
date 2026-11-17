"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useMediaQuery";

/**
 * @description 화면에 들어올 때 한 번 떠오르는 등장 효과입니다.
 * 반환값을 요소에 그대로 펼쳐서 사용합니다. (`{...reveal}`)
 * @param index 같은 묶음 안에서의 순서. 순서대로 0.09초씩 늦게 등장합니다.
 */
export function useReveal<T extends HTMLElement>(index = 0) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (reduced || shown || !el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [reduced, shown]);

  return {
    ref,
    "data-reveal": reduced ? "off" : shown ? "shown" : "hidden",
    style: { "--d": `${Math.min(index, 5) * 0.09}s` } as CSSProperties,
  };
}
