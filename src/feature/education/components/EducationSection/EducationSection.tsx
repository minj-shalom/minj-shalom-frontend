"use client";

import { Section, SectionHead, Timeline, type TimelineEntry } from "@/components";
import type { SectionContent } from "@/feature/content/types";
import { useReveal } from "@/hooks";
import { LicenseInterface } from "../../types";
import { LicenseItem, LicenseList, SubTitle } from "./styles";

function LicenseRow({
  license,
  index,
}: {
  license: LicenseInterface;
  index: number;
}) {
  const reveal = useReveal<HTMLLIElement>(index);

  return (
    <LicenseItem {...reveal}>
      <time>{license.date}</time>
      <b>{license.name}</b>
      <span>{license.issuer}</span>
    </LicenseItem>
  );
}

export function EducationSection({
  section,
  entries,
  licenses,
}: {
  section: SectionContent;
  entries: TimelineEntry[];
  licenses: LicenseInterface[];
}) {
  const subReveal = useReveal<HTMLHeadingElement>();

  return (
    <Section id="edu">
      <SectionHead title={section.title} description={section.description} />
      <Timeline entries={entries} />
      <SubTitle {...subReveal}>자격</SubTitle>
      <LicenseList>
        {licenses.map((license, index) => (
          <LicenseRow key={license.name} license={license} index={index} />
        ))}
      </LicenseList>
    </Section>
  );
}
