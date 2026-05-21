"use client";

import { useCallback, useEffect, useState } from "react";
import type { PackPage } from "@/lib/types";

/** Map a repo-relative pages img path to the site-served path under /previews/. */
function imgSrc(slug: string, img: string): string {
  // catalog stores "design-packs/{slug}/pages/NN-id.png"
  const file = img.split("/").pop() ?? img;
  return `/previews/${slug}/${file}`;
}

export default function PageGallery({
  slug,
  pages,
  displayName,
}: {
  slug: string;
  pages: PackPage[];
  displayName: string;
}) {
  const [active, setActive] = useState<number>(0);
  const [lightbox, setLightbox] = useState<boolean>(false);

  const close = useCallback(() => setLightbox(false), []);
  const next = useCallback(
    () => setActive((i) => (i + 1) % pages.length),
    [pages.length]
  );
  const prev = useCallback(
    () => setActive((i) => (i - 1 + pages.length) % pages.length),
    [pages.length]
  );

  useEffect(() => {
    if (!lightbox) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, next, prev]);

  const cur = pages[active];

  return (
    <div className="page-gallery">
      <div className="pg-stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc(slug, cur.img)}
          alt={`${displayName} — ${cur.label}`}
          onClick={() => setLightbox(true)}
        />
        <button
          type="button"
          className="pg-zoom"
          onClick={() => setLightbox(true)}
          aria-label="크게 보기"
        >
          ⤢ 크게 보기
        </button>
      </div>
      <div className="pg-stage-label">
        <span className="pg-stage-num">
          {String(active + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}
        </span>
        {cur.label}
      </div>

      <div className="pg-thumbs">
        {pages.map((pg, i) => (
          <button
            type="button"
            key={pg.id + i}
            className={`pg-thumb${i === active ? " pg-thumb-on" : ""}`}
            onClick={() => setActive(i)}
            aria-current={i === active}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgSrc(slug, pg.img)}
              alt={pg.label}
              loading="lazy"
            />
            <span className="pg-thumb-label">{pg.label}</span>
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="pg-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${displayName} 상세 페이지`}
          onClick={close}
        >
          <button
            type="button"
            className="pg-lb-close"
            onClick={close}
            aria-label="닫기"
          >
            ✕
          </button>
          <button
            type="button"
            className="pg-lb-nav pg-lb-prev"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="이전"
          >
            ‹
          </button>
          <figure className="pg-lb-figure" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgSrc(slug, cur.img)}
              alt={`${displayName} — ${cur.label}`}
            />
            <figcaption>
              <span className="pg-stage-num">
                {String(active + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}
              </span>
              {cur.label}
            </figcaption>
          </figure>
          <button
            type="button"
            className="pg-lb-nav pg-lb-next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="다음"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
