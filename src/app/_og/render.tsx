import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { NAME_EN } from "@/constants";

export const OG_SIZE = { width: 1200, height: 630 };

// 사이트 본문과 같은 Pretendard 를 직접 불러와 이미지 안에 넣습니다.
// (지정하지 않으면 ImageResponse 기본 폰트로 그려져 콘솔 미리보기와 달라져요)
const FONT_DIR = join(process.cwd(), "node_modules/pretendard/dist/public/static");
const loadFont = async (file: string) => {
  const buf = await readFile(join(FONT_DIR, file));
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
};

// 한글 폰트를 따로 넣지 않으므로 문구는 영문으로만 구성합니다.
export async function renderOgImage() {
  const [regular, extraBold] = await Promise.all([
    loadFont("Pretendard-Regular.otf"),
    loadFont("Pretendard-ExtraBold.otf"),
  ]);

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
        fontFamily: "Pretendard",
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
    {
      ...OG_SIZE,
      fonts: [
        { name: "Pretendard", data: regular, weight: 400, style: "normal" },
        { name: "Pretendard", data: extraBold, weight: 800, style: "normal" },
      ],
    },
  );
}
