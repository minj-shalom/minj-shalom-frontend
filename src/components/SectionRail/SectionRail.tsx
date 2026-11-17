"use client";

import { NAV_ITEMS } from "@/constants";
import { useActiveSection } from "@/hooks";
import { SectionRailContainer, SectionRailLink } from "./styles";

export function SectionRail() {
  const active = useActiveSection();

  return (
    <SectionRailContainer aria-label="섹션 이동">
      {NAV_ITEMS.map(({ id, label }, index) => (
        <li key={id}>
          <SectionRailLink href={`#${id}`} $active={index === active}>
            <span>{label}</span>
          </SectionRailLink>
        </li>
      ))}
    </SectionRailContainer>
  );
}
