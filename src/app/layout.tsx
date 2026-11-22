import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import {
  GOOGLE_SITE_VERIFICATION,
  NAVER_SITE_VERIFICATION,
  SITE_URL,
  StyledComponentsRegistry,
} from "@/configs";
import { getSiteContent } from "@/feature/content";
import { AppProvider } from "./provider";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { hero, seo } = await getSiteContent();
  const { nameKo: NAME_KO, nameEn: NAME_EN } = hero;
  const { title: SITE_TITLE, description: SITE_DESCRIPTION, keywords: SITE_KEYWORDS } = seo;

  return {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: `${NAME_KO} 포트폴리오`,
  authors: [{ name: NAME_KO, url: SITE_URL }],
  creator: NAME_KO,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "ko_KR",
    url: "/",
    siteName: `${NAME_KO} (${NAME_EN})`,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    firstName: "민재",
    lastName: "이",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
    other: NAVER_SITE_VERIFICATION
      ? { "naver-site-verification": NAVER_SITE_VERIFICATION }
      : undefined,
  },
};
}

export const viewport: Viewport = {
  themeColor: "#0a0e24",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={bricolage.variable}>
      <body>
        <StyledComponentsRegistry>
          <AppProvider>{children}</AppProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
