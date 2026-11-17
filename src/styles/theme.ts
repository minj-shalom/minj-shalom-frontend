export const theme = {
  colors: {
    ink: "#0a0e24", // 배경: 깊은 자정 남색
    ink2: "#121838",
    ice: "#e6ecff",
    mute: "#9aa4cf",
    line: "rgba(190,205,255,.16)",
    cyan: "#4fe3d6", // 풀스택
    violet: "#8f7bff", // AI 연구
    rose: "#ff8ad0",
  },
} as const;

export type Theme = typeof theme;
