"use client";

import { useRef } from "react";
import { useScrollEffect } from "@/hooks";
import { ScrollProgressBarContainer } from "./styles";

export function ScrollProgressBar() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollEffect(() => {
    const el = ref.current;
    if (!el) return;

    const max = document.documentElement.scrollHeight - innerHeight;
    el.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  });

  return <ScrollProgressBarContainer ref={ref} aria-hidden="true" />;
}
