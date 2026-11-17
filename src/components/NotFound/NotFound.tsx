"use client";

import {
  NotFoundContainer,
  NotFoundDescription,
  NotFoundHomeLink,
  NotFoundTitle,
} from "./styles";

export function NotFound() {
  return (
    <NotFoundContainer>
      <NotFoundTitle>없는 페이지예요</NotFoundTitle>
      <NotFoundDescription>
        주소가 잘못되었거나 페이지가 옮겨졌을 수 있습니다.
      </NotFoundDescription>
      <NotFoundHomeLink href="/">홈으로</NotFoundHomeLink>
    </NotFoundContainer>
  );
}
