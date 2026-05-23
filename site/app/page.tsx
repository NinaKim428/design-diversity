import { getCatalog, getFolderCount } from "@/lib/packs";
import Gallery from "@/components/Gallery";

export default function HomePage() {
  const catalog = getCatalog();
  const packs = catalog.packs;
  const folderCount = getFolderCount();

  const pptCount = packs.filter((p) => p.track === "ppt").length;
  const webCount = packs.filter((p) => p.track === "web").length;

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>AI도 매번 다른 PPT와 웹사이트를 만들 수 있습니다</h1>
          <p>
            AI에게 발표자료나 웹페이지를 맡기면 결과물이 늘 비슷합니다. 같은
            그라디언트, 같은 둥근 카드. 문제는 AI의 한계가 아니라 “어떤
            디자인으로”를 알려주지 않은 것뿐입니다. 서로 뚜렷하게 구별되는{" "}
            <b>100가지 디자인 스타일</b>을 AI가 그대로 재현하는 지시문
            <code> prompt.md</code>로 정리해 뒀습니다. 그중 20개는 표지·본문·차트
            등 5~7개 상세 페이지까지 명세한 <b>프리미엄 팩</b>입니다. 골라서
            복사해 붙여넣기만 하세요.
          </p>
          <div className="stats">
            <span>
              <b>{packs.length}</b> 팩
            </span>
            <span>
              프레젠테이션(PPT) <b>{pptCount}</b>
            </span>
            <span>
              웹사이트 <b>{webCount}</b>
            </span>
          </div>
        </div>
      </section>

      <section className="usage">
        <div className="wrap">
          <h2>어떻게 쓰나요</h2>
          <ol className="usage-steps">
            <li>
              <span className="usage-num">1</span>
              <div>
                <b>팩을 고릅니다.</b> 아래 카탈로그에서 프레젠테이션(PPT) 또는
                웹사이트 트랙을 선택하고, 마음에 드는 스타일 팩을 엽니다.
              </div>
            </li>
            <li>
              <span className="usage-num">2</span>
              <div>
                <b>적용 명령을 복사합니다.</b> 팩 상세 페이지에서{" "}
                <code>design-pick</code> 스킬 적용 명령 한 줄을 복사합니다.
                (스킬 없이 쓰려면 <code>prompt.md</code> 전문을 복사해도 됩니다.)
              </div>
            </li>
            <li>
              <span className="usage-num">3</span>
              <div>
                <b>Claude Code에 붙여넣습니다.</b> 이렇게 요청하면 그 스타일로
                만들어 줍니다:
                <div className="usage-eg">
                  <span className="usage-eg-tag ppt">PPT</span>
                  “design-pick 스킬로 <i>ppt-mckinsey-ghost-deck</i> 팩을 적용해
                  2026 사업계획 발표자료를 만들어줘”
                </div>
                <div className="usage-eg">
                  <span className="usage-eg-tag web">웹</span>
                  “design-pick 스킬로 <i>web-velvet-dark-boutique</i> 팩을 적용해
                  제품 소개 웹사이트를 만들어줘”
                </div>
              </div>
            </li>
          </ol>
          <p className="usage-note">
            <b>design-pick 스킬</b>은{" "}
            <a
              href="https://github.com/epoko77-ai/design-diversity"
              target="_blank"
              rel="noreferrer"
            >
              GitHub 저장소
            </a>
            에서 받아 Claude Code에 설치합니다. 100개 팩 명세가 스킬에 번들돼
            있어, 느낌만 말해도 어울리는 팩을 추천받을 수 있습니다.
          </p>
          <div className="usage-alt">
            <h3>스킬 없이 — Claude.ai 채팅에 붙여넣기</h3>
            <p>
              Claude Code가 없어도 됩니다. 팩 상세 페이지에서{" "}
              <code>prompt.md</code> 전문을 복사해, 원본 자료(기획서·강의안·제품
              소개 등)와 함께{" "}
              <a
                href="https://claude.ai"
                target="_blank"
                rel="noreferrer"
              >
                claude.ai
              </a>{" "}
              채팅에 그대로 붙여넣고 이렇게 요청하세요:
            </p>
            <div className="usage-eg">
              <span className="usage-eg-tag ppt">PPT</span>
              “위 디자인 명세 그대로, <b>편집 가능한 네이티브 .pptx</b> 로
              발표자료를 만들어줘”
            </div>
            <div className="usage-eg">
              <span className="usage-eg-tag web">웹</span>
              “위 디자인 명세 그대로, HTML/CSS로 [내 주제] 페이지를 만들어줘”
            </div>
            <p className="usage-alt-foot">
              Claude.ai 가 <code>.pptx</code>/HTML 파일을 직접 생성해 다운로드로
              줍니다. PPT는 슬라이드를 통째 PNG로 박지 않도록 “
              <b>편집 가능한 네이티브 .pptx</b>” 문구를 그대로 넣는 것이
              중요합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="spec">
        <div className="wrap">
          <div className="spec-head">
            <h2>출력 사양 — PPT는 편집 가능한 네이티브 .pptx</h2>
            <p>
              이 카탈로그의 PPT 팩으로 만들어지는 슬라이드는{" "}
              <b>모두 편집 가능한 PowerPoint 네이티브 객체</b>입니다. 받은 사람이
              파워포인트에서 그대로 글자·색·도형을 수정·재배치할 수 있도록
              하는 것이 카탈로그의 출력 규칙입니다.
            </p>
          </div>
          <ul className="spec-grid">
            <li>
              <h3>네이티브 객체</h3>
              <p>
                제목·본문·표·불릿·도형·화살표가 모두 python-pptx 네이티브
                객체(텍스트박스·표·오토셰이프·연결선·차트). 차트·다이어그램·
                인포그래픽도 가능한 한 네이티브 도형으로 그립니다.
              </p>
            </li>
            <li>
              <h3>풀블리드 PNG 금지</h3>
              <p>
                HTML/CSS 로 렌더한 뒤 슬라이드를 통째로 PNG 이미지 한 장으로
                박는 방식은 사용하지 않습니다. 텍스트가 비트맵으로 굳어 수정
                불가가 되기 때문입니다.
              </p>
            </li>
            <li>
              <h3>이미지는 보조 자산만</h3>
              <p>
                사진·일러스트·로고 같은 비주얼 자산은 슬라이드 위에 이미지로
                얹지만, 텍스트·차트는 그 위에 별도 네이티브 레이어로 올립니다.
              </p>
            </li>
            <li>
              <h3>폰트 임베딩 권고</h3>
              <p>
                본문 한글 + 영문 라벨 글꼴은 <code>.pptx</code>에 임베딩합니다.
                받는 사람의 PC에 폰트가 없어도 디자인이 깨지지 않습니다.
              </p>
            </li>
          </ul>
          <p className="spec-foot">
            이 규칙은 <code>skills/design-pick/SKILL.md</code>와 각 팩의{" "}
            <code>prompt.md</code> 양쪽에 명시돼 있어, 스킬을 통해서든 Claude.ai
            에 명세를 붙여 쓰든 동일하게 적용됩니다.
          </p>
        </div>
      </section>

      <Gallery packs={packs} />
    </>
  );
}
