# 기여 가이드

Design Diversity에 새 디자인 팩을 추가하거나 기존 팩을 개선하는 절차다.

## 디자인 팩 규격

팩 파일 구조·필드·토큰 키·슬러그 규칙의 **단일 진실 원천(SSOT)** 은 `design-pack-schema` 스킬이다:

- `.claude/skills/design-pack-schema/SKILL.md`

새 팩을 만들기 전에 반드시 이 문서를 읽어라. 아래는 그 요약이다.

## 새 팩 추가 절차

### 1. 슬러그 정하기

`{track}-{family}` 형태의 kebab-case. 트랙 prefix(`ppt-` 또는 `web-`)는 필수이고, 전 카탈로그에서 유일해야 한다.

예: `ppt-swiss-editorial-bold`, `web-neo-brutalism`

### 2. 팩 폴더 만들기

`design-packs/{slug}/` 안에 네 파일을 모두 둔다:

```
design-packs/{slug}/
  prompt.md      ← Claude Code 복붙용 디자인 지시문 (가장 중요)
  tokens.json    ← 머신리더블 디자인 토큰
  preview.png    ← 샘플 렌더 미리보기
  meta.yaml      ← 메타데이터·출처·라이선스
```

- **`prompt.md`** — AI에 한 블록으로 복붙하면 스타일을 재현하는 자기완결 지시문. 모호어("모던하게", "세련되게") 금지. 색은 hex로, 간격은 단위로, 타이포는 폰트·크기·굵기·자간까지 검증 가능하게 명시한다.
- **`tokens.json`** — `slug` · `track` · `family` · `color` · `type` · `spacing` · `shape` 키를 포함한다.
- **`preview.png`** — 그 스타일로 실제 렌더한 샘플 이미지.
- **`meta.yaml`** — `slug` · `display_name` · `track` · `family` · `summary` · `axes` · `sources` · `license` · `status` 필드.

### 3. 스타일 축 분류

`axes`에 5개 축의 값을 지정한다:

| 축 | 값 후보 |
| --- | --- |
| `color` | `mono` · `dark` · `earth` · `gradient` · `pastel` · `vivid-primary` |
| `type` | `minimal-sans` · `serif-editorial` · `heavy-display` · `mono` · `mixed` |
| `layout` | `strict-grid` · `block-grid` · `asymmetric` · `centered` · `full-bleed` |
| `space` | `airy` · `balanced` · `dense` |
| `motion` | `none` · `subtle` · `snappy` · `playful` |

새 값을 추가해야 한다면 `design-pack-schema` 스킬을 먼저 갱신하라.

### 4. 출처·라이선스 고지

`meta.yaml`의 `sources`에 디자인 원리를 학습한 공개 출처(공식 디자인 시스템 문서 등)를 기재한다. 특정 제품의 상표·로고·독점 자산을 복제하지 마라 — 이 카탈로그가 배포하는 것은 **시각 원리의 명세**다.

### 5. catalog.json 갱신

루트의 `catalog.json` `packs` 배열에 새 팩 항목을 추가한다:

```json
{
  "slug": "...",
  "track": "ppt | web",
  "family": "...",
  "display_name": "...",
  "summary": "...",
  "axes": { "color": "...", "type": "...", "layout": "...", "space": "...", "motion": "..." },
  "preview": "design-packs/{slug}/preview.png",
  "status": "pass"
}
```

`catalog.json`의 팩 수는 항상 `design-packs/` 폴더 수와 일치해야 한다. `updated` 날짜도 갱신한다.

### 6. 사이트 빌드 확인

```bash
cd site && npm install && npm run build
```

빌드가 통과하고 새 팩 카드가 그리드에 렌더되는지 확인한 뒤 PR을 연다.

## 상태 표시

검증을 통과하지 못한 팩은 `status`를 `pass`가 아닌 값(`escalate`, `render_failed`, `draft`)으로 두라. 카탈로그에서 숨기지 않고 `draft` 배지로 정직하게 노출한다.
