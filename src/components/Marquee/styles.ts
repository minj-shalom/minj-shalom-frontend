"use client";

import styled from "styled-components";

export const MarqueeContainer = styled.section`
  overflow: hidden;
  padding: clamp(26px, 4vw, 56px) 0;
  border-block: 1px solid var(--line);
  display: grid;
  gap: 4px;
`;

export const MarqueeRow = styled.div<{ $color: string }>`
  --sc: ${({ $color }) => $color};
  display: flex;
  width: max-content;
  will-change: transform;
  pointer-events: none;

  span {
    display: inline-flex;
    align-items: center;
    font-family: var(--display);
    font-weight: 800;
    font-stretch: 80%;
    font-size: clamp(44px, 8vw, 116px);
    letter-spacing: -0.03em;
    line-height: 1.15;
    padding-right: 0.45em;
    color: transparent;
    -webkit-text-stroke: 1.2px var(--sc);
  }

  span::after {
    content: "";
    width: 0.13em;
    height: 0.13em;
    border-radius: 50%;
    background: var(--sc);
    margin-left: 0.45em;
  }
`;
