export type InquiryType = "question" | "suggestion" | "collab" | "etc";

export const INQUIRY_TYPES: { id: InquiryType; label: string; hint: string }[] = [
  { id: "question", label: "문의", hint: "궁금한 점이 있어요" },
  { id: "suggestion", label: "제안", hint: "이런 걸 해보면 어때요" },
  { id: "collab", label: "협업 · 채용", hint: "함께 일해 보고 싶어요" },
  { id: "etc", label: "기타", hint: "그 밖의 이야기" },
];

export const INQUIRY_LIMITS = {
  nameMax: 30,
  titleMax: 60,
  messageMin: 10,
  messageMax: 2000,
} as const;

/** 모든 문의 · 제안에는 이메일이 필요해요 (답장과 확인을 위해) */
export const EMAIL_REQUIRED = true;
