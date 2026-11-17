"use client";

import { useEffect, useState } from "react";

const POOL = "01{}<>/\\#=+*~";

/**
 * @description 글자가 무작위 기호에서 차례로 풀리는 디코딩 효과입니다. 첫 화면에서 한 번만 실행됩니다.
 * @returns value 현재 표시할 문자열, done 디코딩이 끝났는지 여부
 */
export function useScrambleText(text: string, enabled: boolean) {
  const [value, setValue] = useState(text);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const start = performance.now() + 350;
    let raf = 0;

    const tick = (now: number) => {
      let out = "";
      let finished = true;

      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (c === " ") {
          out += c;
        } else if (now >= start + i * 85 + 420) {
          out += c;
        } else {
          finished = false;
          out += POOL[(Math.random() * POOL.length) | 0];
        }
      }

      setValue(out);
      if (finished) setDone(true);
      else raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [text, enabled]);

  return { value, done };
}
