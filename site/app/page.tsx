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
        </div>
      </section>

      <Gallery packs={packs} />
    </>
  );
}
