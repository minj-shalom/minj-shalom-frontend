import { ImageResponse } from "next/og";
import { NAME_EN } from "@/constants";

export const alt = `${NAME_EN} | Full-stack Developer, AI Researcher`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 한글 폰트를 번들하지 않기 위해 영문으로만 구성합니다.
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: 80,
        background: "#0a0e24",
        backgroundImage:
          "radial-gradient(circle at 85% 15%, rgba(143,123,255,.45), rgba(10,14,36,0) 55%), radial-gradient(circle at 10% 100%, rgba(79,227,214,.25), rgba(10,14,36,0) 50%)",
        color: "#e6ecff",
      }}
    >
      <div style={{ fontSize: 112, fontWeight: 800, letterSpacing: -4 }}>
        {NAME_EN}
      </div>
      <div style={{ display: "flex", gap: 24, fontSize: 40, marginTop: 16 }}>
        <span style={{ color: "#4fe3d6" }}>Full-stack Developer</span>
        <span style={{ color: "#9aa4cf" }}>/</span>
        <span style={{ color: "#8f7bff" }}>AI Researcher</span>
      </div>
    </div>,
    size,
  );
}
