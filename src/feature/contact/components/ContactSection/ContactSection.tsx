"use client";

import { useEffect, useRef, useState } from "react";
import { Section, SectionHead } from "@/components";
import type { ContactLinkInterface, SectionContent } from "@/feature/content/types";
import { useMagnet, useReveal } from "@/hooks";
import { InquiryDialog } from "@/feature/inquiry";
import { recordVisitEvent } from "@/feature/visit/api";
import { ContactFooter, ContactLinks, ContactMail, InquiryButton } from "./styles";

export function ContactSection({
  section,
  links,
  email,
  nameKo,
  nameEn,
}: {
  section: SectionContent;
  links: ContactLinkInterface[];
  email: string;
  nameKo: string;
  nameEn: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mailReveal = useReveal<HTMLAnchorElement>();
  const inquiryReveal = useReveal<HTMLButtonElement>();
  const linksReveal = useReveal<HTMLDivElement>();
  const footerReveal = useReveal<HTMLElement>();
  const [year, setYear] = useState<number | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  useMagnet(containerRef);

  useEffect(() => {
    // 렌더링 중 현재 시각을 읽지 않도록 마운트 후에 채웁니다.
    const id = requestAnimationFrame(() => setYear(new Date().getFullYear()));

    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <Section id="contact" compactBottom>
      <SectionHead title={section.title} description={section.description} />
      <div ref={containerRef}>
        <ContactMail href={`mailto:${email}`} data-magnet {...mailReveal}>
          {email}
        </ContactMail>
        <InquiryButton
          type="button"
          data-magnet
          onClick={() => {
            recordVisitEvent("inquiry-open");
            setInquiryOpen(true);
          }}
          {...inquiryReveal}
        >
          문의 · 제안 남기기
          <span aria-hidden="true">→</span>
        </InquiryButton>
        <ContactLinks {...linksReveal}>
          {links.map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              data-magnet
              {...(external ? { target: "_blank", rel: "noopener" } : {})}
            >
              {label}
            </a>
          ))}
        </ContactLinks>
      </div>
      <ContactFooter {...footerReveal}>
        <span>
          © {year ?? 2026} {nameKo} ({nameEn})
        </span>
      </ContactFooter>
      <InquiryDialog open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </Section>
  );
}
