import { CareerSection } from "@/feature/career";
import { ContactSection } from "@/feature/contact";
import { EducationSection } from "@/feature/education";
import { Hero } from "@/feature/hero";
import { JsonLd, siteJsonLd } from "@/feature/seo";
import { StackMarquee, StackSection } from "@/feature/stack";

export default function Page() {
  return (
    <main id="top">
      <JsonLd data={siteJsonLd} />
      <Hero />
      <StackMarquee />
      <StackSection />
      <EducationSection />
      <CareerSection />
      <ContactSection />
    </main>
  );
}
