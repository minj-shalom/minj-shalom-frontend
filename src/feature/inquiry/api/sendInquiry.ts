import { axios } from "@/configs";
import { SEND_INQUIRY_MUTATE_KEY } from "@/constants";
import type { ResponseType } from "@/types";
import { useMutation } from "@tanstack/react-query";
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

/** 문의 · 제안 보내기 (POST /site/inquiries - IP 당 1시간에 5회) */
export const sendInquiry = async ({ data }: { data: InquiryPayload }) => {
  const response = await axios.post<ResponseType<null>>("/site/inquiries", data);

  return response?.data;
};

export function useSendInquiry() {
  return useMutation({
    mutationKey: [SEND_INQUIRY_MUTATE_KEY],
    mutationFn: ({ data }: { data: InquiryPayload }) => sendInquiry({ data }),
  });
}
