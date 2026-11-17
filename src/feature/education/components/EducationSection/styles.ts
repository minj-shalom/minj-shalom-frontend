"use client";

import styled from "styled-components";
import { media } from "@/styles";

export const SubTitle = styled.h3`
  font-family: var(--display);
  font-weight: 700;
  font-size: clamp(24px, 3vw, 36px);
  letter-spacing: -0.03em;
  margin: clamp(44px, 6vw, 80px) 0 18px;
`;

export const LicenseList = styled.ul`
  list-style: none;
  border-top: 1px solid var(--line);
`;

export const LicenseItem = styled.li`
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr) auto;
  gap: 20px;
  align-items: baseline;
  padding: 18px 0;
  border-bottom: 1px solid var(--line);

  time {
    color: var(--mute);
    font-size: 15px;
  }

  b {
    font-weight: 600;
    font-size: 18px;
  }

  span {
    color: var(--mute);
    font-size: 15px;
    text-align: right;
  }

  ${media.tablet} {
    grid-template-columns: 1fr;
    gap: 2px;

    span {
      text-align: left;
    }
  }
`;
