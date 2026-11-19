"use client";

import styled, { keyframes } from "styled-components";

const pop = keyframes`
  0% { transform: scale(0.4); opacity: 0; }
  70% { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Eyebrow = styled.span`
  display: inline-block;
  font-family: var(--display);
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.18em;
  background: linear-gradient(100deg, var(--cyan), var(--violet));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const Title = styled.h2`
  margin-top: 8px;
  font-family: var(--display);
  font-weight: 800;
  font-stretch: 85%;
  font-size: clamp(28px, 5vw, 38px);
  line-height: 1.15;
  letter-spacing: -0.02em;
`;

export const Desc = styled.p`
  margin-top: 10px;
  color: var(--mute);
  font-size: 15.5px;
  line-height: 1.65;
`;

export const Form = styled.form`
  display: grid;
  gap: 18px;
  margin-top: 26px;
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Chip = styled.label`
  position: relative;
  cursor: pointer;

  input {
    position: absolute;
    opacity: 0;
    inset: 0;
    cursor: pointer;
  }

  span {
    display: inline-block;
    padding: 9px 16px;
    border: 1px solid var(--line);
    border-radius: 999px;
    font-size: 15px;
    color: var(--mute);
    transition: all 0.2s;
  }

  input:checked + span {
    border-color: transparent;
    background: linear-gradient(100deg, var(--cyan), var(--violet));
    color: var(--ink);
    font-weight: 700;
  }

  input:focus-visible + span {
    outline: 2px solid var(--cyan);
    outline-offset: 3px;
  }

  &:hover span {
    border-color: var(--ice);
    color: var(--ice);
  }
  input:checked + span:hover {
    color: var(--ink);
  }
`;

export const Hint = styled.p`
  min-height: 20px;
  margin-top: 8px;
  font-size: 13.5px;
  color: var(--mute);
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  /* 한쪽에 오류 문구가 생겨도 옆 칸이 같이 늘어나거나 어긋나지 않게 위쪽에 맞춰요 */
  align-items: start;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  display: grid;
  align-content: start;
  gap: 7px;

  label {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    font-size: 14px;
    font-weight: 600;
    color: var(--ice);
  }

  label small {
    font-weight: 400;
    color: var(--mute);
  }

  input,
  textarea {
    width: 100%;
    padding: 13px 15px;
    border: 1px solid var(--line);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.03);
    color: var(--ice);
    font: inherit;
    font-size: 16px;
    line-height: 1.5;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }

  textarea {
    min-height: 150px;
    resize: vertical;
  }

  input::placeholder,
  textarea::placeholder {
    color: rgba(154, 164, 207, 0.55);
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: var(--cyan);
    background: rgba(79, 227, 214, 0.05);
    box-shadow: 0 0 0 4px rgba(79, 227, 214, 0.12);
  }

  input[aria-invalid="true"],
  textarea[aria-invalid="true"] {
    border-color: var(--rose);
    box-shadow: 0 0 0 4px rgba(255, 138, 208, 0.12);
  }
`;

export const ErrorText = styled.p`
  font-size: 13.5px;
  color: var(--rose);
`;

export const Honeypot = styled.div`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

export const Consent = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 11px;
  padding: 14px 16px;
  border: 1px solid var(--line);
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--mute);
  cursor: pointer;

  input {
    flex: none;
    width: 18px;
    height: 18px;
    margin-top: 3px;
    accent-color: var(--violet);
  }

  b {
    color: var(--ice);
    font-weight: 600;
  }
`;

export const Submit = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 56px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(100deg, var(--cyan), var(--violet) 70%, var(--rose));
  color: var(--ink);
  font-family: var(--display);
  font-weight: 800;
  font-size: 17px;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: transform 0.2s, filter 0.2s, opacity 0.2s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    filter: brightness(1.08);
  }

  &:disabled {
    opacity: 0.6;
    cursor: progress;
  }

  .spinner {
    width: 18px;
    height: 18px;
    border: 2.5px solid rgba(10, 14, 36, 0.3);
    border-top-color: var(--ink);
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
  }
`;

export const Banner = styled.p`
  padding: 13px 16px;
  border: 1px solid rgba(255, 138, 208, 0.4);
  border-radius: 14px;
  background: rgba(255, 138, 208, 0.08);
  color: var(--rose);
  font-size: 14.5px;
`;

export const Done = styled.div`
  display: grid;
  justify-items: center;
  gap: 14px;
  padding: 34px 6px 6px;
  text-align: center;

  .badge {
    display: grid;
    place-items: center;
    width: 84px;
    height: 84px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--cyan), var(--violet));
    color: var(--ink);
    animation: ${pop} 0.55s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  h3 {
    font-family: var(--display);
    font-weight: 800;
    font-size: 28px;
    letter-spacing: -0.01em;
  }

  p {
    max-width: 380px;
    color: var(--mute);
    font-size: 15.5px;
    line-height: 1.7;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
  }

  .actions button {
    padding: 12px 22px;
    border: 1px solid var(--line);
    border-radius: 999px;
    background: transparent;
    font-size: 15px;
    cursor: pointer;
    transition: border-color 0.2s;
  }

  .actions button:hover {
    border-color: var(--ice);
  }
`;
