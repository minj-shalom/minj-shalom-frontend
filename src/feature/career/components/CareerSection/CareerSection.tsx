import { Section, SectionHead, Timeline, type TimelineEntry } from "@/components";
import type { SectionContent } from "@/feature/content/types";

export function CareerSection({ section, entries }: { section: SectionContent; entries: TimelineEntry[] }) {
  return (
    <Section id="path">
      <SectionHead title={section.title} description={section.description} />
      <Timeline entries={entries} />
    </Section>
  );
}
