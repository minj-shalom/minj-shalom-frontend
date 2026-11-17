import { TimelineEntry } from "@/components";
import { LicenseInterface } from "../types";

export const EDUCATION_ENTRIES: TimelineEntry[] = [
  {
    period: "2016.03 – 2022.02",
    title: "인천대학교 컴퓨터공학부",
    description: "졸업",
  },
  {
    period: "2013.03 – 2016.02",
    title: "연수고등학교",
    description: "졸업",
  },
];

export const LICENSES: LicenseInterface[] = [
  {
    date: "2015.12.24",
    name: "자동차운전면허증 1종 보통",
    issuer: "인천지방경찰청",
  },
  { date: "2010.03.10", name: "정보처리기능사", issuer: "한국산업인력공단" },
  { date: "2009.08.14", name: "컴퓨터활용능력 2급", issuer: "대한상공회의소" },
  { date: "2009.02.06", name: "워드프로세서 1급", issuer: "대한상공회의소" },
];
