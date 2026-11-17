"use client";

import { Fragment, useRef } from "react";
import { useReducedMotion, useReveal, useScrollEffect } from "@/hooks";
import { clamp } from "@/utils";
import {
  SectionHeadContainer,
  SectionHeadDescription,
  SectionHeadTitle,
  SectionHeadWord,
} from "./styles";

type SectionHeadProps = {
  title: string;
  description?: string;
};

export function SectionHead({ title, description }: SectionHeadProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const reveal = useReveal<HTMLParagraphElement>();
  const words = title.trim().split(/\s+/);

  // 스크롤에 맞춰 단어가 차례로 밝아집니다.
  useScrollEffect(() => {
    const el = titleRef.current;
    if (!el || reduced) return;

    const rect = el.getBoundingClientRect();
    const p = clamp((innerHeight * 0.9 - rect.top) / (innerHeight * 0.4), 0, 1);

    [...el.children].forEach((word, i) => {
      (word as HTMLElement).style.opacity = String(
        0.16 + 0.84 * clamp(p * (words.length + 1) - i, 0, 1),
      );
    });
  }, [reduced, words.length]);

  return (
    <SectionHeadContainer>
      <SectionHeadTitle ref={titleRef}>
        {words.map((word, i) => (
          <Fragment key={i}>
            <SectionHeadWord>{word}</SectionHeadWord>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </SectionHeadTitle>
      {description && (
        <SectionHeadDescription {...reveal}>
          {description}
        </SectionHeadDescription>
      )}
    </SectionHeadContainer>
  );
}
