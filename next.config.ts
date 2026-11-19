import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 도커 이미지용: 실행에 필요한 파일만 .next/standalone 으로 묶어서 내보냄
  output: "standalone",
  // OG 이미지에 넣는 Pretendard 폰트 파일을 standalone 결과물에도 포함
  outputFileTracingIncludes: {
    "/opengraph-image": ["./node_modules/pretendard/dist/public/static/Pretendard-{Regular,ExtraBold}.otf"],
    "/twitter-image": ["./node_modules/pretendard/dist/public/static/Pretendard-{Regular,ExtraBold}.otf"],
  },
  cacheComponents: true,
  partialPrefetching: true,
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
