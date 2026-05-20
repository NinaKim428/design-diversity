---
name: sample-rendering
description: >-
  디자인 팩의 prompt.md로 실제 PPT 슬라이드/웹 페이지 샘플을 생성하고, 동일 콘텐츠의 baseline 출력도
  함께 만들어 preview.png를 렌더하는 방법론 스킬. sample-renderer 에이전트가 사용한다. 공정 대조용
  더미 콘텐츠(fixture), 트랙별 렌더 경로, 폰트 폴백 처리를 규정한다.
---

# Sample Rendering — 샘플 렌더링 방법론

sample-renderer가 팩 적용 샘플과 baseline을 공정하게 렌더할 때 따르는 방법.

## 공정 대조 원칙

다양성을 측정하려면 **콘텐츠는 같고 디자인만 달라야** 한다. 팩 적용본과 baseline은 동일한 더미 콘텐츠(fixture)를 쓴다. prompt.md는 손대지 않고 있는 그대로 입력한다 — prompt.md만으로 스타일이 안 나오면 그것이 팩의 결함이고, diversity-qa가 잡을 일이다.

## 더미 콘텐츠 (fixture)

트랙별로 고정된 가짜 콘텐츠를 쓴다. 매 팩·baseline에 동일 적용.

**PPT fixture** — 가상 회사 "Northwind" 분기 보고:
- 표지: "2026 1분기 사업 리뷰 / Northwind / 4월 30일"
- 본문: "핵심 성과 3가지" — 매출 성장, 신규 고객, 비용 효율 (각 1줄 설명)
- 차트: 분기별 매출 막대 차트 (Q1 120, Q2 145, Q3 138, Q4 170)

**웹 fixture** — 가상 제품 "Northwind" 랜딩:
- 히어로: 제목 "팀의 일을 한곳에" + 부제 1줄 + CTA 버튼 2개
- 섹션: 기능 카드 3개 (제목 + 1문장)
- 푸터: 로고 + 링크 4개 + 카피라이트

## 렌더 경로

**웹 트랙:** prompt.md 지시대로 단일 HTML 파일(인라인 CSS 또는 Tailwind CDN) 작성 → `_workspace/03_render_{slug}.html` → Playwright 등 헤드리스 브라우저로 데스크탑 폭(1280px)에서 풀페이지 스크린샷 → `design-packs/{slug}/preview.png`.

**PPT 트랙:** 16:9 캔버스의 슬라이드 3종(표지·본문·차트)을 한 장에 세로로 배치한 HTML 목업으로 렌더하는 방식을 기본으로 한다(가장 안정적). HTML 한 장 → 스크린샷 → `preview.png`. 실제 .pptx가 필요하면 python-pptx로 생성 후 LibreOffice(`soffice --headless --convert-to png`)로 변환하되, 변환 도구가 없으면 HTML 목업으로 폴백한다.

**baseline:** 같은 fixture를 "PPT를 만들어줘" / "랜딩페이지를 만들어줘" 수준의 **팩 없는 기본 요청**으로 렌더 → `_workspace/03_render_baseline-{track}.png`. 트랙당 1회만 만들고 모든 팩 검증에 재사용한다.

## 폰트 폴백

지정 폰트가 시스템·웹폰트로 확보되지 않으면 같은 분류(sans/serif/mono/display)의 가용 폰트로 폴백하고, 렌더 메모에 폴백 사실을 남긴다. 한글 콘텐츠는 Pretendard/Noto Sans KR 계열을 확보한다 — 한글이 두부(口)로 깨지면 렌더 실패로 처리한다.

## 산출물

- `design-packs/{slug}/preview.png` — 팩 적용 샘플 (사이트 카탈로그에도 쓰임).
- `_workspace/03_render_baseline-{track}.png` — 트랙 baseline.
- `_workspace/03_render_{slug}.html`(또는 .pptx) — 렌더 소스, 감사·재현용 보존.

## 에러 처리

렌더 실패(폰트·변환 도구 부재 등)는 1회 재시도 후 `render_failed`로 표시하고 사유와 함께 diversity-qa·pack-architect에 보고한다. 자동으로 발행에서 제외하지 않는다 — 사람이 판단한다.
