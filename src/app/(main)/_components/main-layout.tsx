"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import {
  CursorRing,
  Header,
  MainErrorFallback,
  ScrollProgressBar,
  SectionRail,
} from "@/components";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      <ScrollProgressBar />
      <Header />
      <ErrorBoundary key={pathname} FallbackComponent={MainErrorFallback}>
        {children}
      </ErrorBoundary>
      <SectionRail />
      <CursorRing />
    </>
  );
};
