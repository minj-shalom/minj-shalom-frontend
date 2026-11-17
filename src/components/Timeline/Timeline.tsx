"use client";

import { useReveal, useScrollProgress } from "@/hooks";
import { TimelineContainer, TimelineItem } from "./styles";

export type TimelineEntry = {
  period: string;
  title: string;
  description: string;
};

function TimelineRow({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}) {
  const reveal = useReveal<HTMLLIElement>(index);

  return (
    <TimelineItem {...reveal}>
      <time>{entry.period}</time>
      <div>
        <b>{entry.title}</b>
        <p>{entry.description}</p>
      </div>
    </TimelineItem>
  );
}

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  // 선이 차오르는 만큼 지나간 항목의 점이 켜집니다.
  const ref = useScrollProgress<HTMLOListElement>((progress, el, reduced) => {
    el.querySelectorAll<HTMLElement>(":scope > li").forEach((li) => {
      const on = reduced || li.offsetTop + 10 <= progress * el.offsetHeight;
      li.dataset.on = String(on);
    });
  });

  return (
    <TimelineContainer ref={ref}>
      {entries.map((entry, index) => (
        <TimelineRow key={entry.title} entry={entry} index={index} />
      ))}
    </TimelineContainer>
  );
}
