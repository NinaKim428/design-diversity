"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CatalogPack, Axes } from "@/lib/types";
import { AXIS_LABELS, TRACK_LABELS } from "@/lib/types";

const AXIS_ORDER: (keyof Axes)[] = [
  "color",
  "type",
  "layout",
  "space",
  "motion",
];

function uniqSorted(values: (string | undefined)[]): string[] {
  return Array.from(new Set(values.filter(Boolean) as string[])).sort();
}

export default function Gallery({ packs }: { packs: CatalogPack[] }) {
  const [track, setTrack] = useState<string>("all");
  const [axisFilters, setAxisFilters] = useState<Partial<Record<keyof Axes, string>>>(
    {}
  );

  const axisOptions = useMemo(() => {
    const opts: Record<string, string[]> = {};
    for (const axis of AXIS_ORDER) {
      opts[axis] = uniqSorted(packs.map((p) => p.axes?.[axis]));
    }
    return opts;
  }, [packs]);

  const filtered = useMemo(() => {
    return packs.filter((p) => {
      if (track !== "all" && p.track !== track) return false;
      for (const axis of AXIS_ORDER) {
        const want = axisFilters[axis];
        if (want && p.axes?.[axis] !== want) return false;
      }
      return true;
    });
  }, [packs, track, axisFilters]);

  function toggleAxis(axis: keyof Axes, value: string) {
    setAxisFilters((prev) => ({
      ...prev,
      [axis]: prev[axis] === value ? undefined : value,
    }));
  }

  const hasFilter =
    track !== "all" || Object.values(axisFilters).some(Boolean);

  return (
    <>
      <section className="filters">
        <div className="wrap">
          <div className="filter-row">
            <span className="filter-label">트랙</span>
            {["all", "ppt", "web"].map((t) => (
              <button
                key={t}
                className="chip"
                aria-pressed={track === t}
                onClick={() => setTrack(t)}
              >
                {t === "all" ? "전체" : TRACK_LABELS[t]}
              </button>
            ))}
          </div>
          {AXIS_ORDER.map((axis) => (
            <div className="filter-row" key={axis}>
              <span className="filter-label">{AXIS_LABELS[axis]}</span>
              {axisOptions[axis].map((value) => (
                <button
                  key={value}
                  className="chip"
                  aria-pressed={axisFilters[axis] === value}
                  onClick={() => toggleAxis(axis, value)}
                >
                  {value}
                </button>
              ))}
            </div>
          ))}
        </div>
      </section>

      <div className="wrap">
        <p className="result-count">
          {filtered.length}개 팩
          {hasFilter && (
            <>
              {" "}
              <button
                className="chip"
                style={{ marginLeft: 8 }}
                onClick={() => {
                  setTrack("all");
                  setAxisFilters({});
                }}
              >
                필터 초기화
              </button>
            </>
          )}
        </p>

        <div className="grid">
          {filtered.map((p) => (
            <Link
              href={`/pack/${p.slug}/`}
              key={p.slug}
              className="card"
              prefetch={false}
            >
              <div className="card-thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/previews/${p.slug}.png`}
                  alt={`${p.display_name} 미리보기`}
                  loading="lazy"
                />
              </div>
              <div className="card-body">
                <div className="card-top">
                  <span className={`badge badge-${p.track}`}>
                    {TRACK_LABELS[p.track]}
                  </span>
                  {p.status !== "pass" && (
                    <span className="badge badge-draft">{p.status}</span>
                  )}
                  <span className="card-title">{p.display_name}</span>
                </div>
                <p className="card-summary">{p.summary}</p>
                <div className="card-axes">
                  {AXIS_ORDER.map(
                    (axis) =>
                      p.axes?.[axis] && (
                        <span className="tag" key={axis}>
                          {p.axes[axis]}
                        </span>
                      )
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ padding: "40px 0", color: "var(--ink-faint)" }}>
            조건에 맞는 팩이 없습니다. 필터를 조정해 보세요.
          </p>
        )}
      </div>
    </>
  );
}
