import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap" style={{ padding: "80px 0" }}>
      <h1 style={{ fontSize: 28, letterSpacing: "-0.02em" }}>
        페이지를 찾을 수 없습니다
      </h1>
      <p style={{ marginTop: 10, color: "var(--ink-soft)" }}>
        요청한 디자인 팩이 카탈로그에 없습니다.
      </p>
      <p style={{ marginTop: 16 }}>
        <Link href="/" style={{ color: "var(--pill-ppt-ink)" }}>
          ← 카탈로그로 돌아가기
        </Link>
      </p>
    </div>
  );
}
