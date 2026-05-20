import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const SITE_URL = "https://design-diversity.vercel.app";
const TITLE = "AI도 매번 다른 PPT와 웹사이트를 만들 수 있습니다";
const DESC =
  "AI에게 발표자료·웹페이지를 맡기면 결과물이 늘 비슷합니다. 서로 뚜렷이 구별되는 80가지 디자인 스타일을 골라 Claude가 그대로 만들게 하는 디자인 팩 카탈로그.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Design Diversity — AI 디자인 팩 카탈로그",
  description: DESC,
  openGraph: {
    title: TITLE,
    description: DESC,
    url: SITE_URL,
    siteName: "Design Diversity",
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <header className="site-header">
          <div className="wrap">
            <Link href="/" className="brand">
              Design Diversity<span className="dot"> ·</span>
            </Link>
            <span className="tagline">디자인 팩 카탈로그</span>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="wrap">
            <span>
              디자인 명세·토큰·문서는 MIT 라이선스. 원자산 출처는 각 팩의
              meta.yaml에 기재.
            </span>
            <span>Design Diversity · 2026</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
