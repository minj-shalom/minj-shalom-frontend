"use client";

import styled from "styled-components";
import { media } from "@/styles";

export const StackSplit = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(40px, 8vw, 120px);

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
    transform-origin: top;
    transform: scaleY(var(--p, 0));
    background: linear-gradient(
      to bottom,
      var(--cyan),
      var(--violet) 60%,
      var(--rose)
    );
  }

  ${media.tablet} {
    grid-template-columns: 1fr;

    &::before {
      display: none;
    }
  }
`;

export const StackColumn = styled.div<{ $tone: "cyan" | "violet" }>`
  h3 {
    font-family: var(--display);
    font-weight: 700;
    font-size: clamp(26px, 3vw, 40px);
    letter-spacing: -0.03em;
    margin-bottom: 26px;
    color: var(--${({ $tone }) => $tone});
  }

  ul {
    list-style: none;
    display: grid;
    gap: 18px;
  }

  ${media.tablet} {
    &:last-child {
      padding-top: 36px;
      border-top: 1px solid var(--line);
    }
  }
`;

export const StackItem = styled.li`
  strong {
    display: block;
    font-weight: 600;
    font-size: 18px;
  }

  span {
    color: var(--mute);
    font-size: 15px;
  }
`;
