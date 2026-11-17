"use client";

import styled from "styled-components";

export const ScrollProgressBarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 2px;
  width: 100%;
  z-index: 30;
  transform-origin: left;
  transform: scaleX(0);
  background: linear-gradient(90deg, var(--cyan), var(--violet), var(--rose));
`;
