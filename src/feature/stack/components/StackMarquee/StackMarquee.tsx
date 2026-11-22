"use client";

import { Marquee } from "@/components";
import type { MarqueeContentRow } from "@/feature/content/types";
import { STACK_MARQUEE_ROWS } from "../../constants";

/** 서버가 내려준 줄(문구 · 색 톤)을 화면용 줄(흐름 방향 · 색)로 바꿉니다. */
const TONE_COLOR = { cyan: "rgba(79,227,214,.75)", violet: "rgba(143,123,255,.8)" } as const;

export function StackMarquee({ rows }: { rows?: MarqueeContentRow[] }) {
  const data = rows
    ? rows.map((row, index) => ({ items: row.items, direction: (index % 2 === 0 ? 1 : -1) as 1 | -1, color: TONE_COLOR[row.tone] }))
    : STACK_MARQUEE_ROWS;

  return <Marquee rows={data} />;
}
