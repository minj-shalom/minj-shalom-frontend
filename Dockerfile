### 의존성 설치 ###
FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

### 빌드: Next.js standalone 결과물 생성 ###
FROM node:22-alpine AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* 값은 빌드 시점에 번들과 정적 HTML(canonical, sitemap, OG 등)에 박힙니다.
# 컨테이너 실행 시 환경변수로는 바꿀 수 없으므로 반드시 빌드 인자로 넣어야 합니다.
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_API_ENDPOINT
ARG NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
ARG NEXT_PUBLIC_NAVER_SITE_VERIFICATION
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_API_ENDPOINT=$NEXT_PUBLIC_API_ENDPOINT \
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=$NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION \
    NEXT_PUBLIC_NAVER_SITE_VERIFICATION=$NEXT_PUBLIC_NAVER_SITE_VERIFICATION \
    NEXT_TELEMETRY_DISABLED=1

# 도메인 없이 빌드되면 canonical 등이 localhost 로 박히므로 여기서 막습니다.
RUN test -n "$NEXT_PUBLIC_SITE_URL" || { echo "빌드 인자 NEXT_PUBLIC_SITE_URL 이 필요합니다. (예: --build-arg NEXT_PUBLIC_SITE_URL=https://minj-shalom.dev)"; exit 1; }

RUN npm run build

### 실행: standalone 서버만 복사 (node_modules 전체를 싣지 않음) ###
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public

# root 가 아닌 기본 제공 계정으로 실행
USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:3000/ || exit 1

CMD ["node", "server.js"]
