"use client";

import { useEffect, useRef, useState } from "react";
import { Section, SectionHead } from "@/components";
import { CONTACT_LINKS, EMAIL, NAME_EN, NAME_KO } from "@/constants";
import { useMagnet, useReveal } from "@/hooks";
import { ContactFooter, ContactLinks, ContactMail } from "./styles";

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mailReveal = useReveal<HTMLAnchorElement>();
  const linksReveal = useReveal<HTMLDivElement>();
  const footerReveal = useReveal<HTMLElement>();
  const [year, setYear] = useState<number | null>(null);

  useMagnet(containerRef);

  useEffect(() => {
    // 렌더링 중 현재 시각을 읽지 않도록 마운트 후에 채웁니다.
    const id = requestAnimationFrame(() => setYear(new Date().getFullYear()));

    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <Section id="contact" compactBottom>
      <SectionHead
        title="이야기 나눠요"
        description="채용, 협업, 연구 제안 모두 메일로 편하게 보내 주세요."
      />
      <div ref={containerRef}>
        <ContactMail href={`mailto:${EMAIL}`} data-magnet {...mailReveal}>
          {EMAIL}
        </ContactMail>
        <ContactLinks {...linksReveal}>
          {CONTACT_LINKS.map(({ label, href, external }) => (
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
          © {year ?? 2026} {NAME_KO} ({NAME_EN})
        </span>
      </ContactFooter>
    </Section>
  );
}
