import { MarqueeRowData } from "@/components";

export const STACK_MARQUEE_ROWS: MarqueeRowData[] = [
  {
    items: [
      "React",
      "TypeScript",
      "Next.js",
      "NestJS",
      "FastAPI",
      "PostgreSQL",
      "Docker",
    ],
    direction: 1,
    color: "rgba(79,227,214,.75)",
  },
  {
    items: ["LLM", "RAG", "AI Agent", "LLMOps", "XAI", "ETL"],
    direction: -1,
    color: "rgba(143,123,255,.8)",
  },
];
