import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getPacks, getPackDetail, AXIS_LABELS, TRACK_LABELS } from "@/lib/packs";
import type { Axes } from "@/lib/packs";
import CopyButton from "@/components/CopyButton";
import PageGallery from "@/components/PageGallery";

const AXIS_ORDER: (keyof Axes)[] = [
  "color",
  "type",
  "layout",
  "space",
  "motion",
];

export function generateStaticParams() {
  return getPacks().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pack = getPacks().find((p) => p.slug === slug);
  if (!pack) return { title: "팩을 찾을 수 없음 — Design Diversity" };
  return {
    title: `${pack.display_name} — Design Diversity`,
    description: pack.summary,
  };
}

function isHex(v: unknown): v is string {
  return typeof v === "string" && /^#([0-9a-f]{3,8})$/i.test(v);
}

/** Collect color swatches from tokens.color recursively (handles arrays + nested objects). */
function collectSwatches(
  colorObj: Record<string, unknown> | undefined
): { name: string; hex: string }[] {
  if (!colorObj) return [];
  const out: { name: string; hex: string }[] = [];
  for (const [key, val] of Object.entries(colorObj)) {
    if (isHex(val)) {
      out.push({ name: key, hex: val });
    } else if (Array.isArray(val)) {
      val.forEach((v, i) => {
        if (isHex(v)) out.push({ name: val.length > 1 ? `${key} ${i + 1}` : key, hex: v });
      });
    } else if (val && typeof val === "object") {
      for (const [k2, v2] of Object.entries(val as Record<string, unknown>)) {
        if (isHex(v2)) out.push({ name: `${key}.${k2}`, hex: v2 });
      }
    }
  }
  return out;
}

export default async function PackPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pack = getPackDetail(slug);
  if (!pack) notFound();

  const swatches = collectSwatches(
    pack.tokens?.color as Record<string, unknown> | undefined
  );
  const typeTokens = pack.tokens?.type as Record<string, unknown> | undefined;
  const spacingTokens = pack.tokens?.spacing as
    | Record<string, unknown>
    | undefined;
  const sources = pack.meta?.sources ?? [];

  return (
    <>
      <div className="wrap">
        <nav className="breadcrumb">
          <Link href="/">카탈로그</Link> / {pack.display_name}
        </nav>
        <header className="detail-head">
          <div className="meta-row">
            <span className={`badge badge-${pack.track}`}>
              {TRACK_LABELS[pack.track]}
            </span>
            {pack.status !== "pass" && (
              <span className="badge badge-draft">{pack.status}</span>
            )}
            <span className="slug">{pack.slug}</span>
          </div>
          <h1>
            {pack.display_name}
            {pack.category === "premium" && (
              <span className="premium-badge premium-badge-inline">
                PREMIUM
              </span>
            )}
          </h1>
          <p className="summary">{pack.summary}</p>
        </header>
      </div>

      <div className="wrap">
        <div className="detail-grid">
          {/* LEFT — preview + token details */}
          <div>
            <div className="section detail-preview">
              {pack.category === "premium" && pack.pages?.length ? (
                <>
                  <h2>
                    상세 페이지 미리보기
                    <span className="h2-sub">
                      {pack.pages.length}개 활용 장면
                    </span>
                  </h2>
                  <PageGallery
                    slug={pack.slug}
                    pages={pack.pages}
                    displayName={pack.display_name}
                  />
                </>
              ) : (
                <>
                  <h2>미리보기</h2>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/previews/${pack.slug}.png`}
                    alt={`${pack.display_name} 샘플 렌더`}
                  />
                </>
              )}
            </div>

            {swatches.length > 0 && (
              <div className="section">
                <h2>색 토큰</h2>
                <div className="swatches">
                  {swatches.map((s, i) => (
                    <div className="swatch" key={`${s.name}-${i}`}>
                      <div
                        className="swatch-chip"
                        style={{ background: s.hex }}
                      />
                      <div className="swatch-name">{s.name}</div>
                      <div className="swatch-hex">{s.hex.toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {typeTokens && (
              <div className="section">
                <h2>타이포 · 간격 토큰</h2>
                <div className="token-list">
                  {Object.entries(typeTokens).map(([k, v]) => (
                    <div key={k}>
                      <span className="k">{k}</span> ·{" "}
                      {typeof v === "object"
                        ? JSON.stringify(v)
                        : String(v)}
                    </div>
                  ))}
                  {spacingTokens &&
                    Object.entries(spacingTokens).map(([k, v]) => (
                      <div key={`sp-${k}`}>
                        <span className="k">spacing.{k}</span> ·{" "}
                        {typeof v === "object"
                          ? JSON.stringify(v)
                          : String(v)}
                      </div>
                    ))}
                </div>
              </div>
            )}

            <div className="section">
              <h2>스타일 축</h2>
              <table className="axes-table">
                <tbody>
                  {AXIS_ORDER.map(
                    (axis) =>
                      pack.axes?.[axis] && (
                        <tr key={axis}>
                          <td>{AXIS_LABELS[axis]}</td>
                          <td>{pack.axes[axis]}</td>
                        </tr>
                      )
                  )}
                  <tr>
                    <td>family</td>
                    <td>{pack.family}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="section">
              <h2>출처</h2>
              {sources.length > 0 ? (
                <ul className="sources">
                  {sources.map((s, i) => (
                    <li key={i}>
                      {s.url ? (
                        <a href={s.url} target="_blank" rel="noreferrer">
                          {s.title ?? s.url}
                        </a>
                      ) : (
                        (s.title ?? "출처")
                      )}
                      {s.type && <span className="src-type">{s.type}</span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontSize: 13, color: "var(--ink-faint)" }}>
                  meta.yaml에 기재된 출처 없음.
                </p>
              )}
              {pack.meta?.license && (
                <p className="license-note" style={{ marginTop: 12 }}>
                  {pack.meta.license}
                </p>
              )}
            </div>
          </div>

          {/* RIGHT — design-pick skill (primary) + prompt.md (fallback) */}
          <div>
            <div className="section skill-apply">
              <h2>이 팩 적용하기 — design-pick 스킬</h2>
              <p className="skill-lead">
                Claude Code에 <code>design-pick</code> 스킬이 설치돼 있으면,
                아래 한 줄을 붙여넣는 것으로 이 팩이 적용됩니다.
              </p>
              <div className="prompt-box">
                <div className="prompt-bar">
                  <span>{pack.track === "ppt" ? "PPT 만들기" : "웹사이트 만들기"}</span>
                  <CopyButton
                    text={
                      pack.track === "ppt"
                        ? `design-pick 스킬로 "${pack.slug}" 팩을 적용해서 [내 주제] 발표자료를 만들어줘`
                        : `design-pick 스킬로 "${pack.slug}" 팩을 적용해서 [내 주제] 웹사이트를 만들어줘`
                    }
                  />
                </div>
                <pre className="prompt-pre cmd-pre">
                  {pack.track === "ppt"
                    ? `design-pick 스킬로 "${pack.slug}" 팩을\n적용해서 [내 주제] 발표자료를 만들어줘`
                    : `design-pick 스킬로 "${pack.slug}" 팩을\n적용해서 [내 주제] 웹사이트를 만들어줘`}
                </pre>
              </div>
              <p className="usage-box-note">
                스킬이 없다면 — GitHub 저장소의{" "}
                <a
                  href="https://github.com/epoko77-ai/design-diversity"
                  target="_blank"
                  rel="noreferrer"
                >
                  design-diversity
                </a>{" "}
                에서 <code>skills/design-pick</code>을{" "}
                <code>.claude/skills/</code>에 복사하면 됩니다.
              </p>
            </div>

            <details className="section prompt-fallback">
              <summary>
                스킬 없이 쓰기 — 디자인 지시문(prompt.md) 직접 복사
              </summary>
              <div className="prompt-box" style={{ marginTop: 12 }}>
                <div className="prompt-bar">
                  <span>prompt.md</span>
                  <CopyButton text={pack.promptMd} />
                </div>
                <pre className="prompt-pre">{pack.promptMd}</pre>
              </div>
              <p className="usage-box-note">
                복사한 지시문을 Claude(claude.ai)나 Claude Code에 붙여넣고
                “위 디자인 팩을 그대로 따라 [내 주제]로 만들어줘”라고 요청하세요.
              </p>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
