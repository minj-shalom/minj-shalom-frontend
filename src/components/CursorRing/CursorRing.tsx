"use client";

import { useEffect, useRef, useState } from "react";
import { useFinePointer } from "@/hooks";
import { lerp } from "@/utils";
import { CursorRingContainer } from "./styles";

export function CursorRing() {
  const fine = useFinePointer();
  const ref = useRef<HTMLDivElement>(null);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    const ring = ref.current;
    if (!fine || !ring) return;

    let px = innerWidth / 2;
    let py = innerHeight / 2;
    let rx = px;
    let ry = py;
    let raf = 0;

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      setHot(!!target?.closest?.("a,button,[data-magnet]"));
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
    };
    const loop = () => {
      rx = lerp(rx, px, 0.22);
      ry = lerp(ry, py, 0.22);
      ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = requestAnimationFrame(loop);
    };

    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointermove", onMove);
    loop();

    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <CursorRingContainer ref={ref} $hot={hot} aria-hidden="true">
      <i />
    </CursorRingContainer>
  );
}
