import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Design Diversity — 디자인 팩 카탈로그",
  description:
    "Claude가 만드는 PPT·웹 디자인의 천편일률을 푸는, 복붙 가능한 디자인 팩 카탈로그. 40개의 뚜렷한 디자인 스타일을 prompt.md로 명세화했다.",
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
