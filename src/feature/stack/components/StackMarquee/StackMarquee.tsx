"use client";

import { Marquee } from "@/components";
import { STACK_MARQUEE_ROWS } from "../../constants";

export function StackMarquee() {
  return <Marquee rows={STACK_MARQUEE_ROWS} />;
}
