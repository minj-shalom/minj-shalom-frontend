"use client";

import { DependencyList, useEffect, useRef } from "react";

/**
 * @description 스크롤·리사이즈마다 (rAF로 묶어서) 콜백을 실행합니다.
 * 마운트 시와 deps가 바뀔 때도 한 번 실행합니다.
 */
export function useScrollEffect(
  callback: () => void,
  deps: DependencyList = [],
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    let ticking = false;

    const run = () => {
      ticking = false;
      callbackRef.current();
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(run);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    run();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
