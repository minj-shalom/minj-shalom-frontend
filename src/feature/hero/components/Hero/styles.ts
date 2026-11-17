"use client";

import styled from "styled-components";
import { media } from "@/styles";

export const HeroContainer = styled.section`
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 120px var(--pad) 56px;
  overflow: hidden;
  isolation: isolate;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    background:
      radial-gradient(
        ellipse 70% 55% at 15% 100%,
        rgba(10, 14, 36, 0.9),
        rgba(10, 14, 36, 0) 70%
      ),
      linear-gradient(to top, var(--ink) 0, rgba(10, 14, 36, 0) 26%);
  }

  ${media.tablet} {
    padding-bottom: 40px;
  }
`;

export const HeroCanvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  touch-action: pan-y;
`;

export const HeroHint = styled.div<{ $hidden: boolean }>`
  position: absolute;
  z-index: 3;
  top: 84px;
  left: var(--pad);
  font-size: 14px;
  color: var(--mute);
  padding: 8px 16px;
  border: 1px solid var(--line);
  border-radius: 99px;
  background: rgba(10, 14, 36, 0.6);
  backdrop-filter: blur(6px);
  transition: opacity 0.6s;
  pointer-events: none;
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};

  ${media.tablet} {
    top: 78px;
  }
`;

export const HeroCopy = styled.div`
  position: relative;
  z-index: 3;
`;

export const HeroNameKo = styled.p`
  font-size: clamp(20px, 2.4vw, 30px);
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--mute);
  margin-bottom: 8px;
  animation: rise 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.15s both;
`;

export const HeroTitle = styled.h1`
  font-family: var(--display);
  font-weight: 800;
  font-stretch: 80%;
  font-size: clamp(52px, 10.8vw, 176px);
  line-height: 0.92;
  letter-spacing: -0.02em;
  white-space: nowrap;
  background: linear-gradient(
    100deg,
    var(--ice) 0%,
    var(--ice) 38%,
    #c9c2ff 62%,
    var(--rose) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 26px;
  min-height: 0.95em;
`;

export const HeroLede = styled.p`
  max-width: 50ch;
  font-size: clamp(19px, 2.1vw, 25px);
  line-height: 1.5;
  color: var(--ice);
  margin-bottom: 44px;
  animation: rise 1s cubic-bezier(0.2, 0.8, 0.2, 1) 1.2s both;
`;

export const HeroAxis = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  border-top: 1px solid var(--line);
  padding-top: 22px;
  animation: rise 1s cubic-bezier(0.2, 0.8, 0.2, 1) 1.45s both;

  ${media.tablet} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const HeroAxisItem = styled.div<{
  $tone: "cyan" | "violet";
  $active: boolean;
  $right?: boolean;
}>`
  max-width: 30ch;
  transition: opacity 0.5s;
  opacity: ${({ $active }) => ($active ? 1 : 0.45)};
  text-align: ${({ $right }) => ($right ? "right" : "left")};

  b {
    display: block;
    font-family: var(--display);
    font-weight: 700;
    font-size: clamp(20px, 2.4vw, 28px);
    letter-spacing: -0.02em;
    color: var(--${({ $tone }) => $tone});
  }

  span {
    font-size: 14px;
    color: var(--mute);
  }

  ${media.tablet} {
    text-align: left;
  }
`;
