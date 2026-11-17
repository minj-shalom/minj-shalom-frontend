import { ReactNode } from "react";
import { SectionId } from "@/types";
import { SectionContainer } from "./styles";

type SectionProps = {
  id: SectionId;
  /** 마지막 섹션처럼 아래 여백을 줄일 때 */
  compactBottom?: boolean;
  children: ReactNode;
};

export function Section({ id, compactBottom, children }: SectionProps) {
  return (
    <SectionContainer id={id} $compactBottom={compactBottom}>
      {children}
    </SectionContainer>
  );
}
