"use client";

import styled from "styled-components";
import { media } from "@/styles";

export const SectionHeadContainer = styled.div`
  display: grid;
  gap: 14px;
  margin-bottom: clamp(36px, 6vw, 72px);
  max-width: 70ch;
`;

export const SectionHeadTitle = styled.h2`
  font-family: var(--display);
  font-weight: 700;
  font-stretch: 85%;
  font-size: clamp(34px, 5.4vw, 72px);
  line-height: 1.04;
  letter-spacing: -0.035em;
`;

export const SectionHeadWord = styled.span`
  display: inline-block;
  opacity: 0.16;

  ${media.reducedMotion} {
    opacity: 1;
  }
`;

export const SectionHeadDescription = styled.p`
  color: var(--mute);
  max-width: 46ch;
`;
