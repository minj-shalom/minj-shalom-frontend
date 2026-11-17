"use client";

import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";
import { media } from "./media";

const { colors } = theme;

export const GlobalStyle = createGlobalStyle`
  :root {
    --ink: ${colors.ink};
    --ink-2: ${colors.ink2};
    --ice: ${colors.ice};
    --mute: ${colors.mute};
    --line: ${colors.line};
    --cyan: ${colors.cyan};
    --violet: ${colors.violet};
    --rose: ${colors.rose};
    --display: var(--font-bricolage), "Pretendard Variable", Pretendard, system-ui, sans-serif;
    --body: "Pretendard Variable", Pretendard, -apple-system, "Segoe UI", sans-serif;
    --pad: clamp(20px, 5vw, 72px);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 70px;
    background: var(--ink);
  }

  body {
    background: var(--ink);
    color: var(--ice);
    font-family: var(--body);
    font-size: 17px;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    word-break: keep-all;
    overflow-wrap: break-word;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font: inherit;
    color: inherit;
  }

  :focus-visible {
    outline: 2px solid var(--cyan);
    outline-offset: 4px;
    border-radius: 4px;
  }

  ::selection {
    background: var(--violet);
    color: #fff;
  }

  /* 스크롤 등장: 아래로 내릴 때 자연스럽게 떠오릅니다 */
  [data-reveal="hidden"] {
    opacity: 0;
  }

  [data-reveal="shown"] {
    opacity: 1;
    animation: rise 0.95s cubic-bezier(0.2, 0.8, 0.2, 1) var(--d, 0s) backwards;
  }

  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(38px);
      filter: blur(8px);
    }
    to {
      opacity: 1;
      transform: none;
      filter: blur(0);
    }
  }

  ${media.reducedMotion} {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      transition: none !important;
      animation: none !important;
    }
  }
`;
