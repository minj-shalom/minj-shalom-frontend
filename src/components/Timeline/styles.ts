"use client";

import styled from "styled-components";
import { media } from "@/styles";

export const TimelineContainer = styled.ol`
  position: relative;
  list-style: none;
  border-left: 1px solid var(--line);
  margin-left: 6px;

  &::after {
    content: "";
    position: absolute;
    left: -2px;
    top: 0;
    width: 3px;
    height: calc(var(--p, 0) * 100%);
    background: linear-gradient(var(--violet), var(--rose));
    border-radius: 3px;
  }
`;

export const TimelineItem = styled.li`
  position: relative;
  padding: 0 0 44px 34px;
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 20px;

  &::before {
    content: "";
    position: absolute;
    left: -7px;
    top: 10px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--ink);
    border: 2px solid var(--line);
    transition:
      border-color 0.4s,
      background 0.4s,
      box-shadow 0.4s;
    z-index: 1;
  }

  &[data-on="true"]::before {
    background: var(--violet);
    border-color: var(--violet);
    box-shadow: 0 0 16px var(--violet);
  }

  time {
    color: var(--mute);
    font-size: 15px;
    padding-top: 2px;
  }

  b {
    display: block;
    font-family: var(--display);
    font-size: 22px;
    letter-spacing: -0.02em;
    font-weight: 700;
  }

  p {
    color: var(--mute);
    max-width: 56ch;
  }

  ${media.tablet} {
    grid-template-columns: 1fr;
    gap: 4px;
  }
`;
