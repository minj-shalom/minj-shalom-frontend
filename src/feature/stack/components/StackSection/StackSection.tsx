"use client";

import { Section, SectionHead } from "@/components";
import { useReveal, useScrollProgress } from "@/hooks";
import { STACK_GROUPS } from "../../constants";
import { StackGroupInterface, StackItemInterface } from "../../types";
import { StackColumn, StackItem, StackSplit } from "./styles";

function StackListItem({
  item,
  index,
}: {
  item: StackItemInterface;
  index: number;
}) {
  const reveal = useReveal<HTMLLIElement>(index);

  return (
    <StackItem {...reveal}>
      <strong>{item.label}</strong>
      <span>{item.skills}</span>
    </StackItem>
  );
}

function StackGroup({ group }: { group: StackGroupInterface }) {
  const reveal = useReveal<HTMLHeadingElement>();

  return (
    <StackColumn $tone={group.tone}>
      <h3 {...reveal}>{group.title}</h3>
      <ul>
        {group.items.map((item, index) => (
          <StackListItem key={item.label} item={item} index={index} />
        ))}
      </ul>
    </StackColumn>
  );
}

export function StackSection() {
  const splitRef = useScrollProgress<HTMLDivElement>();

  return (
    <Section id="stack">
      <SectionHead
        title="다루는 기술"
        description="화면과 서버, 배포, 그리고 LLM 기반 AI를 만들 때 쓰는 기술입니다."
      />
      <StackSplit ref={splitRef}>
        {STACK_GROUPS.map((group) => (
          <StackGroup key={group.id} group={group} />
        ))}
      </StackSplit>
    </Section>
  );
}
