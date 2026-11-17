"use client";

import styled from "styled-components";
import { media } from "@/styles";

export const SectionRailContainer = styled.ul`
  position: fixed;
  right: clamp(10px, 1.6vw, 26px);
  top: 50%;
  transform: translateY(-50%);
  z-index: 25;
  display: grid;
  gap: 16px;
  list-style: none;

  ${media.laptop} {
    display: none;
  }
`;

export const SectionRailLink = styled.a<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;
  font-size: 12.5px;
  color: var(--mute);

  span {
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transform: ${({ $active }) => ($active ? "none" : "translateX(6px)")};
    color: ${({ $active }) => ($active ? "var(--ice)" : "inherit")};
    transition:
      opacity 0.25s,
      transform 0.25s;
  }

  &::after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 1.5px solid
      ${({ $active }) => ($active ? "var(--cyan)" : "var(--mute)")};
    transition: 0.3s;

    ${({ $active }) =>
      $active &&
      `
      background: var(--cyan);
      box-shadow: 0 0 12px var(--cyan);
      transform: scale(1.3);
    `}
  }

  &:hover span {
    opacity: 1;
    transform: none;
    color: var(--ice);
  }
`;
