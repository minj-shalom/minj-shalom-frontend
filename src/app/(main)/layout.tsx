import { ReactNode } from "react";
import { MainLayout } from "./_components/main-layout";

export default function MainLayoutContainer({
  children,
}: {
  children: ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
