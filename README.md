# Design Diversity

![Design Diversity — AI도 매번 다른 PPT·웹사이트를 만들 수 있습니다](./assets/social-preview.png)

> AI에게 PPT·웹사이트를 맡기면 결과물이 늘 비슷합니다. **design-pick 스킬**을 설치하면,
> 서로 뚜렷이 구별되는 **80가지 디자인 스타일** 중 하나를 골라 Claude가 그 스타일대로 만들어 줍니다.

🌐 **카탈로그 둘러보기:** https://design-diversity.vercel.app

## 왜

생성형 AI에게 "PPT 만들어줘", "랜딩페이지 만들어줘"라고 하면 결과물이 서로 닮습니다 — 같은
그라디언트, 같은 둥근 카드, 같은 산세리프. 모델이 "안전한 평균"으로 수렴하기 때문입니다.
문제는 AI의 한계가 아니라 "어떤 디자인으로"를 알려주지 않은 것뿐입니다.

## 무엇 — `design-pick` 스킬

`skills/design-pick/`는 Claude Code용 **소비자 스킬**입니다. 설치하면:

- "고급스러운 다크 톤으로 발표자료 만들어줘"처럼 **느낌만 말하면** 어울리는 팩 2~3개를 추천하고,
- 팩 **슬러그를 직접 지정**하면(예: `web-velvet-dark-boutique`) 그 팩으로 바로 생성하고,
- 고른 팩의 정밀 명세(색·타이포·레이아웃·차트·다이어그램·"하지 말 것")를 그대로 적용합니다.

80개 팩(PPT 40 + 웹 40)의 명세가 스킬 안에 `references/`로 번들돼 있어, 설치 후엔 네트워크
없이 동작합니다.

## 설치

```bash
# Claude Code 프로젝트에 설치
cp -r skills/design-pick YOUR_PROJECT/.claude/skills/
# 또는 전역 설치
cp -r skills/design-pick ~/.claude/skills/
```

## 쓰는 법

1. **둘러보고 고르기 (시각적)** — [카탈로그 사이트](https://design-diversity.vercel.app)에서 80팩의
   미리보기를 보고 마음에 드는 팩의 슬러그를 확인합니다.
2. **Claude Code에서 적용** — 스킬이 설치된 상태에서 이렇게 요청합니다:

   > `design-pick` 스킬로 **web-velvet-dark-boutique** 팩을 적용해서 *제품 소개* 웹사이트를 만들어줘

3. **또는 느낌만 말하기** — "전문적인 컨설팅 느낌 PPT 만들어줘"라고 하면 스킬이 후보를 추천합니다.

## 저장소 구성

| 경로 | 내용 |
| --- | --- |
| `skills/design-pick/` | **소비자 스킬** — 설치해서 쓰는 본체. SKILL.md + 80팩 명세 references. |
| `design-packs/` | 80팩 원본 자산 — 각 폴더에 `prompt.md`·`tokens.json`·`preview.png`·`meta.yaml`. |
| `catalog.json` | 80팩 머신리더블 인덱스. |
| `site/` | Next.js 15 카탈로그 웹사이트(둘러보기·picker). |
| `.claude/` | 이 카탈로그를 **만든** 빌드 하네스(에이전트 7 + 스킬 8). "어떻게 만들었나" 아카이브. |

각 팩은 5개 스타일 축으로 분류됩니다: **color · type · layout · space · motion**.

## 카탈로그 사이트 빌드

```bash
cd site && npm install && npm run build
```

## 기여

새 팩 추가는 [CONTRIBUTING.md](./CONTRIBUTING.md) 참고.

## 라이선스

디자인 명세(`prompt.md`)·토큰(`tokens.json`)·문서·스킬은 [MIT](./LICENSE). 각 팩은 공개 디자인
시스템·스타일에서 학습한 **시각 원리의 명세**이며 특정 제품의 상표·로고·독점 자산을 재배포하지
않습니다. 학습 출처는 각 팩 `meta.yaml`에 기재.
