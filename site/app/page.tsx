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
          <h1>AI 디자인의 천편일률을 푸는 디자인 팩 카탈로그</h1>
          <p>
            생성형 AI에게 PPT나 웹페이지를 맡기면 결과물이 늘 닮습니다. 같은
            그라디언트, 같은 둥근 카드. Design Diversity는 서로 뚜렷하게
            구별되는 디자인 스타일을, AI가 그대로 재현할 수 있는 정밀한 지시문
            <code> prompt.md</code>로 명세화한 카탈로그입니다.
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
                <b>지시문을 복사합니다.</b> 팩 상세 페이지의{" "}
                <code>prompt.md</code> 블록을 “복사” 버튼으로 통째로 복사합니다.
              </div>
            </li>
            <li>
              <span className="usage-num">3</span>
              <div>
                <b>Claude / Claude Code에 붙여넣습니다.</b> 지시문을 붙여넣고
                이렇게 요청하세요:
                <div className="usage-eg">
                  <span className="usage-eg-tag ppt">PPT</span>
                  “위 디자인 팩을 그대로 따라 <i>2026 사업계획</i> 발표자료를
                  만들어줘”
                </div>
                <div className="usage-eg">
                  <span className="usage-eg-tag web">웹</span>
                  “위 디자인 팩 스타일로 <i>제품 소개</i> 랜딩페이지를 만들어줘”
                </div>
              </div>
            </li>
          </ol>
          <p className="usage-note">
            PPT 팩은 표지·본문·차트·다이어그램(프로세스·타임라인·매트릭스 등)
            양식까지, 웹 팩은 레이아웃·컴포넌트·모션까지 한 벌로 명세돼 있어 AI가
            일관된 결과물을 냅니다.
          </p>
        </div>
      </section>

      <Gallery packs={packs} />
    </>
  );
}
