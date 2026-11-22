"use client";

import { useRef, useState } from "react";
import type { HeroContent } from "@/feature/content/types";
import { useFinePointer, useReducedMotion } from "@/hooks";
import {
  HeroSide,
  useHeroField,
  useLetterWave,
  useScrambleText,
} from "../../hooks";
import {
  HeroAxis,
  HeroAxisItem,
  HeroCanvas,
  HeroContainer,
  HeroCopy,
  HeroHint,
  HeroLede,
  HeroNameKo,
  HeroTitle,
} from "./styles";

export function Hero({ content }: { content: HeroContent }) {
  const { nameKo, nameEn } = content;
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const [side, setSide] = useState<HeroSide>("left");
  const [touched, setTouched] = useState(false);

  useHeroField(heroRef, canvasRef, {
    reduced,
    onSideChange: setSide,
    onTouch: () => setTouched(true),
  });

  const { value, done } = useScrambleText(nameEn, !reduced);
  const waving = fine && done;
  useLetterWave(heroRef, titleRef, waving);

  return (
    <HeroContainer ref={heroRef} aria-label="소개">
      <HeroCanvas ref={canvasRef} aria-hidden="true" />

      <HeroHint $hidden={touched}>
        {fine
          ? "커서를 좌우로 움직이고, 눌러 보세요"
          : "화면을 좌우로 밀고, 눌러 보세요"}
      </HeroHint>

      <HeroCopy>
        <HeroNameKo>{nameKo}</HeroNameKo>
        <HeroTitle ref={titleRef} aria-label={nameEn}>
          {waving
            ? [...nameEn].map((char, i) =>
                char === " " ? (
                  " "
                ) : (
                  <span key={i} data-letter>
                    {char}
                  </span>
                ),
              )
            : value}
        </HeroTitle>
        <HeroLede>
          {content.lede1}
          <br />
          {content.lede2}
        </HeroLede>

        <HeroAxis>
          <HeroAxisItem $tone="cyan" $active={side === "left"}>
            <b>{content.leftTitle}</b>
            <span>{content.leftDesc}</span>
          </HeroAxisItem>
          <HeroAxisItem $tone="violet" $active={side === "right"} $right>
            <b>{content.rightTitle}</b>
            <span>{content.rightDesc}</span>
          </HeroAxisItem>
        </HeroAxis>
      </HeroCopy>
    </HeroContainer>
  );
}
