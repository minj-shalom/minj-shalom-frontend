"use client";

import { useState } from "react";
import { NAV_ITEMS } from "@/constants";
import { useScrollEffect } from "./useScrollEffect";

/**
 * @description 화면 중앙 근처에 있는 섹션의 인덱스를 돌려줍니다.
 */
export function useActiveSection() {
  const [active, setActive] = useState(0);

  useScrollEffect(() => {
    let current = 0;

    NAV_ITEMS.forEach(({ id }, index) => {
      const section = document.getElementById(id);
      if (section && section.getBoundingClientRect().top < innerHeight * 0.45) {
        current = index;
      }
    });

    setActive(current);
  });

  return active;
}
