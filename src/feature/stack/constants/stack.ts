import { StackGroupInterface } from "../types";

//  : 줄바꿈이 일어나지 않는 공백
export const STACK_GROUPS: StackGroupInterface[] = [
  {
    id: "fullstack",
    title: "풀스택 개발",
    tone: "cyan",
    items: [
      {
        label: "프론트엔드",
        skills:
          "React, TypeScript, Next.js, Vite, Zustand, TanStack Query, styled-components, Ant Design",
      },
      {
        label: "백엔드·DB",
        skills: "Python, FastAPI, Node.js, NestJS, PostgreSQL, SQLite",
      },
      {
        label: "인프라·DevOps",
        skills:
          "Docker, Docker Compose, Nginx, Git, GitHub Actions, Bitbucket Pipelines",
      },
    ],
  },
  {
    id: "ai",
    title: "AI 연구",
    tone: "violet",
    items: [
      { label: "LLM", skills: "OpenAI API, Gemini API, Claude API" },
      { label: "RAG·에이전트", skills: "RAG, AI Agent" },
      { label: "운영·분석", skills: "LLMOps, XAI(LIME), ETL" },
    ],
  },
];
