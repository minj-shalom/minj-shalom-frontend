"use client";

import styled, { keyframes } from "styled-components";

const rise = keyframes`
  from { opacity: 0; transform: translateY(18px) scale(0.985); }
  to { opacity: 1; transform: none; }
`;

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: none; }
`;

/** 모바일(≤640px)에서는 화면 아래에서 올라오는 바텀 시트가 돼요 */
export const SHEET_QUERY = "(max-width: 640px)";

export const Dialog = styled.dialog`
  position: fixed;
  inset: 0;
  margin: auto;
  width: min(580px, calc(100vw - 28px));
  max-height: calc(100dvh - 28px);
  padding: 0;
  border: 1px solid var(--line);
  border-radius: 28px;
  background:
    radial-gradient(120% 60% at 100% 0%, rgba(143, 123, 255, 0.18), transparent 60%),
    radial-gradient(90% 50% at 0% 100%, rgba(79, 227, 214, 0.1), transparent 60%),
    var(--ink-2);
  color: var(--ice);
  overflow: auto;
  overscroll-behavior: contain;
  box-shadow: 0 40px 120px rgba(0, 0, 0, 0.55);

  &[open] {
    animation: ${rise} 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  &::backdrop {
    background: rgba(5, 8, 22, 0.72);
    backdrop-filter: blur(6px);
  }

  @media ${SHEET_QUERY} {
    inset: auto 0 0 0;
    margin: 0;
    width: 100%;
    max-width: 100%;
    max-height: 92dvh;
    border-width: 1px 0 0;
    border-radius: 28px 28px 0 0;

    &[open] {
      animation: ${slideUp} 0.38s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
  }
`;

export const Inner = styled.div`
  position: relative;
  padding: 34px clamp(22px, 5vw, 38px) 30px;

  @media ${SHEET_QUERY} {
    padding: 8px 20px calc(24px + env(safe-area-inset-bottom));
  }
`;

/** 바텀 시트 위쪽의 손잡이 (아래로 끌어서 닫을 수 있어요). 데스크톱에서는 숨겨요 */
export const Grab = styled.div`
  display: none;
  place-items: center;
  height: 28px;
  margin: 0 -20px;
  touch-action: none;
  cursor: grab;

  &::before {
    content: "";
    width: 44px;
    height: 5px;
    border-radius: 99px;
    background: var(--line);
  }

  @media ${SHEET_QUERY} {
    display: grid;
  }
`;

export const Close = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: transparent;
  color: var(--mute);
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;

  &:hover {
    color: var(--ice);
    border-color: var(--ice);
  }

  @media ${SHEET_QUERY} {
    top: 14px;
    right: 14px;
  }
`;
