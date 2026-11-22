/** 서버의 성공 응답 래퍼 */
export type ResponseType<T = unknown> = {
  status: number;
  data: T;
  message: string;
};
