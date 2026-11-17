"use client";

import Link from "next/link";
import styled from "styled-components";

export const NotFoundContainer = styled.main`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 14px;
  padding: 96px var(--pad);
  background: radial-gradient(
    ellipse 60% 50% at 85% 0%,
    rgba(143, 123, 255, 0.18),
    rgba(10, 14, 36, 0) 70%
  );
`;

export const NotFoundTitle = styled.h1`
  font-family: var(--display);
  font-weight: 700;
  font-stretch: 85%;
  font-size: clamp(34px, 5.4vw, 72px);
  line-height: 1.04;
  letter-spacing: -0.035em;
`;

export const NotFoundDescription = styled.p`
  color: var(--mute);
  max-width: 46ch;
`;

export const NotFoundHomeLink = styled(Link)`
  display: inline-block;
  margin-top: 22px;
  padding-bottom: 3px;
  font-size: 17px;
  border-bottom: 1px solid var(--line);
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--ice);
  }
`;
