import { CareerSection } from "@/feature/career";
import { ContactSection } from "@/feature/contact";
import { getSiteContent } from "@/feature/content";
import { EducationSection } from "@/feature/education";
import { Hero } from "@/feature/hero";
import { JsonLd, buildSiteJsonLd } from "@/feature/seo";
import { StackMarquee, StackSection } from "@/feature/stack";
import { VisitTracker } from "@/feature/visit";

export default async function Page() {
  const content = await getSiteContent();

  return (
    <main id="top">
      <JsonLd data={buildSiteJsonLd(content)} />
      <VisitTracker />
      <Hero content={content.hero} />
      <StackMarquee rows={content.marquee} />
      <StackSection section={content.sections.stack} groups={content.stack} />
      <EducationSection section={content.sections.edu} entries={content.education} licenses={content.licenses} />
      <CareerSection section={content.sections.path} entries={content.career} />
      <ContactSection
        section={content.sections.contact}
        links={content.contact}
        email={content.seo.email}
        nameKo={content.hero.nameKo}
        nameEn={content.hero.nameEn}
      />
    </main>
  );
}
