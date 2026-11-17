export const media = {
  /** 모바일·태블릿 (≤ 820px) */
  tablet: "@media (max-width: 820px)",
  /** 섹션 레일을 숨기는 구간 (≤ 1100px) */
  laptop: "@media (max-width: 1100px)",
  /** 마우스 등 정밀한 포인터 */
  finePointer: "@media (hover: hover) and (pointer: fine)",
  /** 모션 줄이기 설정 */
  reducedMotion: "@media (prefers-reduced-motion: reduce)",
} as const;
