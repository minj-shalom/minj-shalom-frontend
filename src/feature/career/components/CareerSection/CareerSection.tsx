import { Section, SectionHead, Timeline } from "@/components";
import { CAREER_ENTRIES } from "../../constants";

export function CareerSection() {
  return (
    <Section id="path">
      <SectionHead title="일해 온 곳" />
      <Timeline entries={CAREER_ENTRIES} />
    </Section>
  );
}
