"use client";

import styled from "styled-components";
import { media } from "@/styles";

export const HeaderContainer = styled.header`
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 20;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 16px var(--pad);
  background: linear-gradient(
    to bottom,
    rgba(10, 14, 36, 0.85),
    rgba(10, 14, 36, 0)
  );
  backdrop-filter: blur(6px);
`;

export const HeaderBrand = styled.a`
  display: inline-flex;
  align-items: baseline;
  gap: 10px;
  font-family: var(--display);
  font-weight: 700;
  font-size: 19px;
  letter-spacing: -0.01em;

  small {
    font-weight: 500;
    font-size: 14px;
    color: var(--mute);
  }

  ${media.tablet} {
    small {
      display: none;
    }
  }
`;

export const HeaderMenu = styled.ul`
  display: flex;
  gap: clamp(14px, 3vw, 30px);
  list-style: none;
  font-size: 15px;
  color: var(--mute);

  ${media.tablet} {
    gap: 14px;
    font-size: 14px;
  }
`;

export const HeaderMenuLink = styled.a<{ $active: boolean }>`
  padding: 6px 0;
  border-bottom: 1px solid transparent;
  transition:
    color 0.2s,
    border-color 0.2s;

  &:hover {
    color: var(--ice);
    border-color: var(--ice);
  }

  ${({ $active }) =>
    $active &&
    `
    color: var(--ice);
    border-color: var(--ice);
  `}
`;
