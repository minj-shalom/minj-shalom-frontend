"use client";

import styled from "styled-components";

export const ContactMail = styled.a`
  display: inline-block;
  font-family: var(--display);
  font-weight: 800;
  font-stretch: 80%;
  font-size: clamp(34px, 8.2vw, 128px);
  line-height: 1;
  letter-spacing: -0.02em;
  background: linear-gradient(
    100deg,
    var(--cyan),
    var(--violet) 55%,
    var(--rose)
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  padding-bottom: 0.08em;
`;

export const ContactLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 26px;
  margin-top: 36px;
  font-size: 17px;

  a {
    display: inline-block;
    border-bottom: 1px solid var(--line);
    padding-bottom: 3px;
    transition: border-color 0.2s;
  }

  a:hover {
    border-color: var(--ice);
  }
`;

export const ContactFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 96px;
  padding-top: 22px;
  border-top: 1px solid var(--line);
  color: var(--mute);
  font-size: 14px;
`;
