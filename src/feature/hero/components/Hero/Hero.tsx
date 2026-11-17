"use client";

import { useRef, useState } from "react";
import { NAME_EN, NAME_KO } from "@/constants";
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

export function Hero() {
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

  const { value, done } = useScrambleText(NAME_EN, !reduced);
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
        <HeroNameKo>{NAME_KO}</HeroNameKo>
        <HeroTitle ref={titleRef} aria-label={NAME_EN}>
          {waving
            ? [...NAME_EN].map((char, i) =>
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
          프론트엔드와 백엔드를 모두 다루는 풀스택 개발자입니다.
          <br />
          AI 연구에서는 주로 에이전트를 만듭니다.
        </HeroLede>

        <HeroAxis>
          <HeroAxisItem $tone="cyan" $active={side === "left"}>
            <b>풀스택 개발</b>
            <span>프론트엔드부터 백엔드까지 직접 구현합니다.</span>
          </HeroAxisItem>
          <HeroAxisItem $tone="violet" $active={side === "right"} $right>
            <b>AI 연구</b>
            <span>LLM 에이전트와 RAG를 구축합니다.</span>
          </HeroAxisItem>
        </HeroAxis>
      </HeroCopy>
    </HeroContainer>
  );
}
