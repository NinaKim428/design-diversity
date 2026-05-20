---
name: design-pack-schema
description: >-
  디자인 팩의 산출 형식(prompt.md + tokens.json + preview.png + meta.yaml)과 카탈로그 인덱스(catalog.json)를
  정의하는 단일 진실 원천(SSOT) 스킬. 팩을 집필·검수·발행하는 모든 에이전트(pack-architect, ppt/web curator,
  catalog-publisher)가 따른다. 팩 파일 구조·필드·토큰 키·슬러그 규칙·스키마 변경 절차를 규정한다.
---

# Design Pack Schema — 산출 형식 SSOT

디자인 팩의 파일 구조와 필드를 정의한다. 이 스킬이 규격의 SSOT다 — 규격을 바꾸려면 이 파일을 먼저 갱신하고 모든 curator에 통지한다.

## 폴더 구조

```
design-packs/{slug}/
  prompt.md      ← Claude Code 복붙용 디자인 지시문
  tokens.json    ← 머신리더블 디자인 토큰
  preview.png    ← 샘플 렌더 (sample-renderer가 생성)
  meta.yaml      ← 메타데이터·출처·라이선스
```

## 슬러그 규칙

`{track}-{family}` 형태의 kebab-case. 예: `ppt-swiss-editorial`, `web-neo-brutalism`. 트랙 prefix(`ppt-`/`web-`)는 필수. 전 카탈로그에서 유일해야 한다.

## prompt.md — 가장 중요한 산출물

Claude Code에 **한 블록으로 복붙**해 그 스타일을 재현하는 자기완결 지시문. 모호어("모던하게", "깔끔하게") 금지 — 검증 가능한 구체 지시만. 필수 섹션:

```markdown
# {Display Name} — {track} 디자인 팩

## 이 스타일의 정체성
(2~3문장. 무엇을 보고 이 스타일임을 알 수 있는가)

## 색
(구체적 hex 값과 역할: 배경/표면/텍스트/강조. 강조색 개수 제한 명시)

## 타이포그래피
(폰트 패밀리·대체 폰트, 위계별 크기·굵기·자간·행간)

## 레이아웃 / 그리드
(PPT: 슬라이드 그리드·여백·헤더 / 웹: 콘텐츠 폭·브레이크포인트·섹션 리듬)

## 형태 / 질감
(보더·모서리·그림자·아이콘·이미지 처리 방식)

## 모션 (웹) / 전환 (PPT)
(있다면 구체적 duration·easing·트리거)

## 하지 말 것
(이 스타일에서 금지: Claude 기본 미감으로 회귀하는 것을 차단하는 핵심 섹션)

## 적용 예
(PPT: 표지·본문·차트 슬라이드 / 웹: 히어로·카드·푸터 — 각 1~2문장 지시)
```

"하지 말 것" 섹션은 필수다. 다양성의 적은 Claude가 기본값(보라 그라디언트, 둥근 카드, 이모지, 균일한 그림자)으로 회귀하는 것이다.

## tokens.json

```json
{
  "slug": "web-neo-brutalism",
  "track": "web",
  "family": "neo-brutalism",
  "color": { "bg": "#ffffff", "surface": "#ffe14d", "text": "#0a0a0a",
             "accent": ["#ff5a36"], "border": "#0a0a0a" },
  "type": { "display": { "family": "Archivo Black", "fallback": "sans-serif",
                          "size": "clamp(2.5rem,6vw,5rem)", "weight": 900, "tracking": "-0.02em" },
            "body": { "family": "Inter", "size": "1.0625rem", "weight": 400, "leading": 1.6 } },
  "spacing": { "unit": 8, "section": 96, "content_max": "1100px" },
  "shape": { "radius": "0px", "border": "3px solid", "shadow": "6px 6px 0 #0a0a0a" },
  "motion": { "duration": "120ms", "easing": "steps(1)", "hover": "translate(-2px,-2px)" }
}
```

키는 트랙 공통(`color`·`type`·`spacing`·`shape`)이고, `motion`(웹)·`slide`(PPT 슬라이드 메타)는 트랙별. 두 curator는 공통 키 이름을 동일하게 쓴다 — 사이트가 일관 소비해야 하므로.

## meta.yaml

```yaml
slug: web-neo-brutalism
display_name: Neo-Brutalism
track: web            # ppt | web
family: neo-brutalism
summary: 거친 보더·하드 섀도·원색 블록의 반(反)미니멀 웹 스타일.
axes: { color: vivid-primary, type: heavy-display, layout: block-grid, space: dense, motion: snappy }
sources:
  - { title: "...", url: "https://...", type: official|article }
license: "원자산은 각 출처 라이선스를 따름. 본 팩이 배포하는 것은 디자인 명세·토큰이며 원자산 사본이 아님."
source_depth: full     # full | partial
status: pass           # pass | escalate | draft | render_failed
```

## catalog.json — 카탈로그 인덱스

루트의 머신리더블 인덱스. 사이트·도구가 소비한다.

```json
{ "version": 1, "updated": "2026-05-20",
  "packs": [
    { "slug": "web-neo-brutalism", "track": "web", "family": "neo-brutalism",
      "display_name": "Neo-Brutalism", "summary": "...", "axes": {...},
      "preview": "design-packs/web-neo-brutalism/preview.png", "status": "pass" }
  ] }
```

## 스타일 축 (다양성의 측정 단위)

모든 팩은 5축으로 분류한다 — pack-architect가 이 매트릭스로 후보를 솎고 중복을 막는다.

| 축 | 예시 값 |
|---|---|
| color | mono / vivid-primary / pastel / dark / gradient / earth |
| type | minimal-sans / heavy-display / serif-editorial / mono / mixed |
| layout | strict-grid / block-grid / asymmetric / centered / full-bleed |
| space | dense / balanced / airy |
| motion | none / subtle / snappy / playful |

두 팩이 5축 중 4축 이상 같으면 사실상 쌍둥이 — 합치거나 한쪽을 다른 축으로 재정의한다.

## 스키마 변경 절차

1. 이 파일을 갱신한다. 2. 버전을 올리고 변경점을 기록한다. 3. 영향받는 기존 팩의 마이그레이션 필요 여부를 pack-architect가 보고한다. 4. 모든 curator에 통지한다.
