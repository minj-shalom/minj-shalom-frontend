import Axios from "axios";
import { API_ENDPOINT } from "./env";

/** 백엔드 호출용 axios 인스턴스 (방문자 사이트는 로그인이 없어 공개 API 만 호출합니다) */
export const axios = Axios.create({
  baseURL: `${API_ENDPOINT}/api`,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});
