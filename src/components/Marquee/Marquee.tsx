"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion, useReveal } from "@/hooks";
import { clamp, lerp } from "@/utils";
import { MarqueeContainer, MarqueeRow } from "./styles";

export type MarqueeRowData = {
  items: string[];
  /** 1: 왼쪽으로, -1: 오른쪽으로 흐름 */
  direction: 1 | -1;
  color: string;
};

/**
 * @description 스크롤 속도에 반응하는 마키입니다. 보이는 동안에만 움직입니다.
 */
export function Marquee({ rows }: { rows: MarqueeRowData[] }) {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduced = useReducedMotion();
  const reveal = useReveal<HTMLElement>();

  useEffect(() => {
    const section = reveal.ref.current;
    const els = rowRefs.current.filter((el): el is HTMLDivElement => !!el);
    if (reduced || !section) return;

    const offsets = els.map(() => 0);
    let visible = false;
    let raf = 0;
    let last = performance.now();
    let lastY = scrollY;
    let velocity = 0;

    const frame = (now: number) => {
      const dt = Math.min(now - last, 50) / 1000;
      last = now;
      velocity = lerp(velocity, (scrollY - lastY) / Math.max(dt, 0.001), 0.12);
      lastY = scrollY;
      const skew = clamp(velocity * 0.01, -9, 9);

      els.forEach((el, i) => {
        const dir = rows[i].direction;
        const half = el.scrollWidth / 2;
        offsets[i] += (48 + velocity * 0.4) * dir * dt;
        const pos = ((offsets[i] % half) + half) % half;
        el.style.transform = `translate3d(${-pos}px,0,0) skewX(${-skew * dir}deg)`;
      });

      if (visible) raf = requestAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was) {
        last = performance.now();
        lastY = scrollY;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      }
    });
    observer.observe(section);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      els.forEach((el) => (el.style.transform = ""));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, rows]);

  return (
    <MarqueeContainer {...reveal} aria-hidden="true">
      {rows.map((row, i) => (
        <MarqueeRow
          key={i}
          ref={(el) => {
            rowRefs.current[i] = el;
          }}
          $color={row.color}
        >
          {/* 끊김 없이 이어지도록 두 번 렌더링합니다. */}
          {[...row.items, ...row.items].map((item, j) => (
            <span key={j}>{item}</span>
          ))}
        </MarqueeRow>
      ))}
    </MarqueeContainer>
  );
}
