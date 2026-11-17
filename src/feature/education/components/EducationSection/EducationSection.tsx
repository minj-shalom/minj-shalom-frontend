"use client";

import { Section, SectionHead, Timeline } from "@/components";
import { useReveal } from "@/hooks";
import { EDUCATION_ENTRIES, LICENSES } from "../../constants";
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

export function EducationSection() {
  const subReveal = useReveal<HTMLHeadingElement>();

  return (
    <Section id="edu">
      <SectionHead
        title="배운 곳"
        description="최종 학력은 인천대학교 졸업입니다."
      />
      <Timeline entries={EDUCATION_ENTRIES} />
      <SubTitle {...subReveal}>자격</SubTitle>
      <LicenseList>
        {LICENSES.map((license, index) => (
          <LicenseRow key={license.name} license={license} index={index} />
        ))}
      </LicenseList>
    </Section>
  );
}
