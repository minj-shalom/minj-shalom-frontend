"use client";

import { NAV_ITEMS, NAME_EN, NAME_KO } from "@/constants";
import { useActiveSection } from "@/hooks";
import {
  HeaderBrand,
  HeaderContainer,
  HeaderMenu,
  HeaderMenuLink,
} from "./styles";

export function Header() {
  const active = useActiveSection();

  return (
    <HeaderContainer>
      <HeaderBrand href="#top" aria-label="맨 위로">
        {NAME_KO} <small>{NAME_EN}</small>
      </HeaderBrand>
      <nav aria-label="주요 메뉴">
        <HeaderMenu>
          {NAV_ITEMS.map(({ id, label }, index) => (
            <li key={id}>
              <HeaderMenuLink href={`#${id}`} $active={index === active}>
                {label}
              </HeaderMenuLink>
            </li>
          ))}
        </HeaderMenu>
      </nav>
    </HeaderContainer>
  );
}
