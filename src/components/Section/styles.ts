"use client";

import styled from "styled-components";

export const SectionContainer = styled.section<{ $compactBottom?: boolean }>`
  position: relative;
  padding: clamp(80px, 12vw, 160px) var(--pad);

  ${({ $compactBottom }) => $compactBottom && "padding-bottom: 72px;"}
`;
