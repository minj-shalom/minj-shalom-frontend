import type { InquiryType } from "../constants/inquiry";

export interface InquiryPayload {
  type: InquiryType;
  name: string;
  email: string;
  title: string;
  message: string;
  /** 스팸 방지용 숨은 입력칸 (사람은 비워둬요) */
  website: string;
}

/**
 * 문의 · 제안 보내기.
 * 지금은 화면만 만든 단계라 서버로 보내지 않고 성공한 것처럼 응답해요.
 * 백엔드가 생기면 이 함수에서 API 를 호출하세요 (실패하면 예외를 던지면 화면이 오류 상태로 바뀌어요).
 */
export async function sendInquiry(payload: InquiryPayload): Promise<void> {
  void payload;
  await new Promise((resolve) => setTimeout(resolve, 900));
}
