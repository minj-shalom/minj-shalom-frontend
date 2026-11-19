"use client";

import { ReactNode, useEffect, useRef } from "react";
import { Close, Dialog, Grab, Inner, SHEET_QUERY } from "./styles";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** 제목 요소의 id (스크린 리더용) */
  labelledBy: string;
  children: ReactNode;
}

/**
 * 사이트 공용 모달 (네이티브 dialog: ESC 닫기 · 포커스 가두기를 브라우저가 처리).
 * 데스크톱에서는 가운데 카드, 모바일(≤640px)에서는 아래에서 올라오는 바텀 시트이고
 * 손잡이를 아래로 끌거나 바깥을 눌러 닫을 수 있어요. 새 모달은 이 컴포넌트를 써서 만드세요.
 */
export function Modal({ open, onClose, labelledBy, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  // 열고 닫기: dialog 는 showModal / close 로 제어해요
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    if (!open && el.open) el.close();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // 바텀 시트: 손잡이를 아래로 끌면 따라 내려가고, 충분히 내리면 닫아요
  const drag = useRef<{ y: number } | null>(null);
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!window.matchMedia(SHEET_QUERY).matches) return;
    drag.current = { y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
    if (ref.current) ref.current.style.transition = "none";
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !ref.current) return;
    const dy = Math.max(0, e.clientY - drag.current.y);
    ref.current.style.transform = `translateY(${dy}px)`;
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !ref.current) return;
    const dy = e.clientY - drag.current.y;
    drag.current = null;
    ref.current.style.transition = "transform 0.25s ease";
    ref.current.style.transform = "";
    if (dy > 90) onClose();
  };

  return (
    <Dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={(e) => {
        // 바깥(backdrop)을 누르면 닫아요
        if (e.target === ref.current) onClose();
      }}
    >
      <Inner>
        <Grab aria-hidden="true" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} />
        <Close type="button" onClick={onClose} aria-label="닫기">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </Close>
        {children}
      </Inner>
    </Dialog>
  );
}
