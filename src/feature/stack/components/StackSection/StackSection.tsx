"use client";

import { Section, SectionHead } from "@/components";
import { useReveal, useScrollProgress } from "@/hooks";
import type { SectionContent } from "@/feature/content/types";
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

export function StackSection({ section, groups }: { section: SectionContent; groups: StackGroupInterface[] }) {
  const splitRef = useScrollProgress<HTMLDivElement>();

  return (
    <Section id="stack">
      <SectionHead title={section.title} description={section.description} />
      <StackSplit ref={splitRef}>
        {groups.map((group) => (
          <StackGroup key={group.id} group={group} />
        ))}
      </StackSplit>
    </Section>
  );
}
