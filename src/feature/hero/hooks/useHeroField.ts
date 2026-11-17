"use client";

import { RefObject, useEffect, useRef } from "react";
import { clamp, lerp } from "@/utils";

export type HeroSide = "left" | "right";

type RGB = [number, number, number];

type Point = {
  gx: number;
  gy: number;
  ph: number;
  r: number;
  v: number;
  s: number;
  x: number;
  y: number;
  glow: number;
};

type Pulse = { x: number; y: number; t: number };

type Signal = {
  i: number;
  j: number;
  ni: number;
  nj: number;
  t: number;
  hops: number;
  max: number;
  dir: [number, number];
  tr: [number, number][];
};

type Options = {
  reduced: boolean;
  onSideChange: (side: HeroSide) => void;
  onTouch: () => void;
};

const C1: RGB = [79, 227, 214];
const C2: RGB = [143, 123, 255];
const C3: RGB = [255, 138, 208];
const ICE: RGB = [200, 212, 255];
const DIRS: [number, number][] = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const mix = (a: RGB, b: RGB, t: number) =>
  `${lerp(a[0], b[0], t) | 0},${lerp(a[1], b[1], t) | 0},${lerp(a[2], b[2], t) | 0}`;

/**
 * @description 히어로 배경 캔버스입니다.
 * 커서의 왼쪽은 격자(풀스택), 오른쪽은 신경망(AI 연구)으로 바뀌고, 클릭하면 파동이 퍼집니다.
 */
export function useHeroField(
  heroRef: RefObject<HTMLElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  { reduced, onSideChange, onTouch }: Options,
) {
  const callbacks = useRef({ onSideChange, onTouch });

  useEffect(() => {
    callbacks.current = { onSideChange, onTouch };
  });

  useEffect(() => {
    const hero = heroRef.current;
    const cv = canvasRef.current;
    const ctx = cv?.getContext("2d");
    if (!hero || !cv || !ctx) return;

    let W = 0;
    let H = 0;
    let sp = 58;
    let cols = 0;
    let rows = 0;
    let pts: Point[] = [];
    let split = 0;
    let target = 0;
    let mx = -999;
    let my = -999;
    let touched = false;
    let running = true;
    let pulses: Pulse[] = [];
    const sigs: Signal[] = [];
    let lastT = 0;
    let spawn = 0;
    let side: HeroSide | null = null;
    let raf = 0;

    const build = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = hero.clientWidth;
      H = hero.clientHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sp = W < 700 ? 44 : 58;
      cols = Math.ceil(W / sp) + 2;
      rows = Math.ceil(H / sp) + 2;
      pts = [];
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          pts.push({
            gx: i * sp - sp / 2,
            gy: j * sp - sp / 2,
            ph: Math.random() * 6.28,
            r: 8 + Math.random() * 20,
            v: 0.3 + Math.random() * 0.7,
            s: 0,
            x: 0,
            y: 0,
            glow: 0,
          });
        }
      }
      split = W * 0.1;
    };

    const at = (i: number, j: number) => pts[j * cols + i];

    const frame = (t: number) => {
      const dt = Math.min(Math.max(t - lastT, 0), 50);
      lastT = t;
      pulses = pulses.filter((pl) => t - pl.t < 1800);

      const auto = W * (0.5 + 0.4 * Math.sin(t / 5200 - 1.4));
      split += ((touched ? target : auto) - split) * 0.08;

      const nextSide: HeroSide = split < W / 2 ? "left" : "right";
      if (nextSide !== side) {
        side = nextSide;
        callbacks.current.onSideChange(nextSide);
      }

      ctx.clearRect(0, 0, W, H);

      for (const p of pts) {
        const tg = clamp((p.gx - split) / 140 + 0.5, 0, 1);
        p.s += (tg - p.s) * 0.07;
        const ox = p.gx + Math.cos(t * 0.0006 * p.v + p.ph) * p.r;
        const oy = p.gy + Math.sin(t * 0.0007 * p.v + p.ph * 1.3) * p.r;
        p.x = lerp(p.gx, ox, p.s);
        p.y = lerp(p.gy, oy, p.s);

        const dx = mx - p.x;
        const dy = my - p.y;
        const d = Math.hypot(dx, dy);
        if (d < 170 && p.s > 0.3) {
          const f = (1 - d / 170) * 14 * p.s;
          p.x += (dx / d) * f;
          p.y += (dy / d) * f;
        }

        p.glow *= 0.92;
        for (const pl of pulses) {
          const age = Math.max(0, (t - pl.t) / 1000);
          const d2 = Math.hypot(p.x - pl.x, p.y - pl.y);
          const w =
            Math.exp(-Math.pow((d2 - age * 560) / 48, 2)) * (1 - age / 1.7);
          if (w > 0.01) {
            const k = (w * 16) / (d2 || 1);
            p.x += (p.x - pl.x) * k;
            p.y += (p.y - pl.y) * k;
            p.glow = Math.max(p.glow, w);
          }
        }
      }

      ctx.lineWidth = 1;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const a = at(i, j);
          const nb: [Point, number][] = [];
          if (i + 1 < cols) nb.push([at(i + 1, j), 0]);
          if (j + 1 < rows) nb.push([at(i, j + 1), 0]);
          if (i + 1 < cols && j + 1 < rows) nb.push([at(i + 1, j + 1), 1]);
          if (i + 1 < cols && j > 0) nb.push([at(i + 1, j - 1), 1]);

          for (const [b, diag] of nb) {
            const s = (a.s + b.s) / 2;
            if (diag && s < 0.25) continue;
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            if (dist > sp * 1.9) continue;
            const k = 1 - dist / (sp * 1.9);
            const al = diag ? 0.22 * s * k : lerp(0.13, 0.28 * k, s);
            ctx.strokeStyle = `rgba(${mix(ICE, C2, s)},${al})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of pts) {
        const s = p.s;
        const near = Math.min(
          1.4,
          Math.max(0, 1 - Math.hypot(mx - p.x, my - p.y) / 200) + p.glow,
        );
        const col =
          s < 0.5 ? mix(C1, ICE, s * 0.8) : mix(C2, C3, (s - 0.5) * 1.4);
        ctx.fillStyle = `rgba(${col},${0.5 + near * 0.5})`;
        if (s < 0.5) {
          const z = 2 + near * 2;
          ctx.fillRect(p.x - z / 2, p.y - z / 2, z, z);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.6 + s * 1.2 + near * 3, 0, 6.283);
          ctx.fill();
        }
      }

      for (const pl of pulses) {
        const age = Math.max(0, (t - pl.t) / 1000);
        const al = (1 - age / 1.7) * 0.45;
        if (al > 0) {
          ctx.strokeStyle = `rgba(${mix(C1, C2, pl.x > split ? 1 : 0)},${al})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(pl.x, pl.y, age * 560, 0, 6.283);
          ctx.stroke();
        }
      }
      ctx.lineWidth = 1;

      if (!reduced) {
        spawn -= dt;
        if (spawn <= 0 && sigs.length < 30) {
          spawn = 110;
          sigs.push({
            i: (Math.random() * cols) | 0,
            j: (Math.random() * rows) | 0,
            ni: 0,
            nj: 0,
            t: 1,
            hops: 0,
            max: 3 + ((Math.random() * 5) | 0),
            dir: [1, 0],
            tr: [],
          });
        }

        for (let k = sigs.length - 1; k >= 0; k--) {
          const q = sigs[k];
          q.t += dt / 380;

          if (q.t >= 1) {
            q.i = q.hops ? q.ni : q.i;
            q.j = q.hops ? q.nj : q.j;
            q.hops++;
            if (q.hops > q.max) {
              sigs.splice(k, 1);
              continue;
            }
            let dd =
              Math.random() < 0.6 ? q.dir : DIRS[(Math.random() * 4) | 0];
            let ni = q.i + dd[0];
            let nj = q.j + dd[1];
            if (ni < 0 || nj < 0 || ni >= cols || nj >= rows) {
              dd = [-dd[0], -dd[1]];
              ni = q.i + dd[0];
              nj = q.j + dd[1];
            }
            q.dir = dd;
            q.ni = ni;
            q.nj = nj;
            q.t = 0;
          }

          const a = at(q.i, q.j);
          const b = at(q.ni, q.nj);
          if (!a || !b) {
            sigs.splice(k, 1);
            continue;
          }

          const px = lerp(a.x, b.x, q.t);
          const py = lerp(a.y, b.y, q.t);
          q.tr.push([px, py]);
          if (q.tr.length > 9) q.tr.shift();

          const col = a.s < 0.5 ? mix(C1, ICE, 0.3) : mix(C2, C3, 0.5);
          q.tr.forEach((z, n) => {
            ctx.fillStyle = `rgba(${col},${(n / q.tr.length) * 0.55})`;
            ctx.beginPath();
            ctx.arc(z[0], z[1], 1 + n * 0.25, 0, 6.283);
            ctx.fill();
          });
          ctx.fillStyle = `rgba(${col},.95)`;
          ctx.shadowColor = `rgb(${col})`;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(px, py, 2.6, 0, 6.283);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "rgba(79,227,214,0)");
      g.addColorStop(0.5, "rgba(190,205,255,.55)");
      g.addColorStop(1, "rgba(255,138,208,0)");
      ctx.strokeStyle = g;
      ctx.beginPath();
      ctx.moveTo(split, 0);
      ctx.lineTo(split, H);
      ctx.stroke();

      if (mx > 0) {
        const h = ctx.createRadialGradient(mx, my, 0, mx, my, 180);
        h.addColorStop(0, `rgba(${mix(C1, C2, mx > split ? 1 : 0)},.2)`);
        h.addColorStop(1, "rgba(10,14,36,0)");
        ctx.fillStyle = h;
        ctx.fillRect(mx - 180, my - 180, 360, 360);
      }

      if (running && !reduced) raf = requestAnimationFrame(frame);
    };

    const point = (e: PointerEvent | TouchEvent) => {
      const rect = hero.getBoundingClientRect();
      const c = "touches" in e ? e.touches[0] : e;
      mx = c.clientX - rect.left;
      my = c.clientY - rect.top;
      target = mx;
      if (!touched) {
        touched = true;
        callbacks.current.onTouch();
      }
    };
    const onPointerMove = (e: PointerEvent) => point(e);
    const onTouchMove = (e: TouchEvent) => point(e);
    const onPointerDown = (e: PointerEvent) => {
      if ((e.target as Element).closest("a,button")) return;
      point(e);
      pulses.push({ x: mx, y: my, t: performance.now() });
    };
    const onPointerLeave = () => {
      touched = false;
      mx = my = -999;
    };

    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerdown", onPointerDown);
    hero.addEventListener("touchmove", onTouchMove, { passive: true });
    hero.addEventListener("pointerleave", onPointerLeave);

    const observer = new IntersectionObserver(([entry]) => {
      const was = running;
      running = entry.isIntersecting;
      if (running && !was && !reduced) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      }
    });
    observer.observe(hero);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        build();
        if (reduced) {
          split = W * 0.5;
          pts.forEach((p) => (p.s = p.gx > split ? 1 : 0));
          frame(0);
        }
      }, 120);
    };
    window.addEventListener("resize", onResize);

    build();
    if (reduced) {
      split = W * 0.5;
      pts.forEach((p) => (p.s = p.gx > split ? 1 : 0));
      frame(0);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerdown", onPointerDown);
      hero.removeEventListener("touchmove", onTouchMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [heroRef, canvasRef, reduced]);
}
