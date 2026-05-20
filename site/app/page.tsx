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
            <code> prompt.md</code>로 명세화한 카탈로그입니다. 마음에 드는 팩을
            골라 지시문을 복사해 붙여넣으세요.
          </p>
          <div className="stats">
            <span>
              <b>{packs.length}</b> 팩
            </span>
            <span>
              PPT <b>{pptCount}</b>
            </span>
            <span>
              웹 <b>{webCount}</b>
            </span>
            <span>
              카탈로그 = 폴더 <b>{folderCount}</b>
            </span>
          </div>
        </div>
      </section>
      <Gallery packs={packs} />
    </>
  );
}
