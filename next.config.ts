import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 도커 이미지용: 실행에 필요한 파일만 .next/standalone 으로 묶어서 내보냄
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
