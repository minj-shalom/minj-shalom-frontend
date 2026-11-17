"use client";

import { Button, Result } from "antd";
import { FallbackProps } from "react-error-boundary";
import { MainErrorFallbackContainer } from "./styles";

export function MainErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <MainErrorFallbackContainer role="alert">
      <Result
        status="error"
        title="문제가 발생했습니다"
        subTitle="잠시 후 다시 시도해 주세요."
        extra={
          <Button type="primary" onClick={resetErrorBoundary}>
            다시 시도
          </Button>
        }
      />
    </MainErrorFallbackContainer>
  );
}
