"use client";

import styled from "styled-components";

export const CursorRingContainer = styled.div<{ $hot: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
  pointer-events: none;
  width: 0;
  height: 0;

  i {
    position: absolute;
    left: -17px;
    top: -17px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 1px solid
      ${({ $hot }) => ($hot ? "var(--cyan)" : "rgba(190, 205, 255, 0.65)")};
    background: ${({ $hot }) =>
      $hot ? "rgba(79, 227, 214, 0.1)" : "transparent"};
    transform: ${({ $hot }) => ($hot ? "scale(1.5)" : "none")};
    transition:
      transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1),
      background 0.3s,
      border-color 0.3s;
  }
`;
