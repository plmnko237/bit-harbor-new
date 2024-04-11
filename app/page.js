import { fetchData } from "@/util/db_community";
import { qnaData } from "@/util/db_qna";
import { knowledgeData } from "@/util/db_knowledge";
import Link from "next/link";
import dynamic from "next/dynamic";
import MainText from "./MainText";

export default async function Home() {
  const CommunityCard = dynamic(() => import("./CommunityCard"), {
    ssr: false,
  });
  const QnaCard = dynamic(() => import("./QnaCard"), {
    ssr: false,
  });
  const KnowledgeCard = dynamic(() => import("./KnowledgeCard"), {
    ssr: false,
  });

  //커뮤니티
  let dbData = await fetchData(1, 10);
  dbData = dbData ? dbData.slice(0, 4) : null;
  //Qna
  let qna = await qnaData(1, 10);
  qna = qna ? qna.slice(0, 4) : null;
  //지식
  let knowledge = await knowledgeData(1, 10);
  knowledge = knowledge ? knowledge.slice(0, 6) : null;

  return (
    <main>
      <section className="main-visual">
        <MainText />
      </section>
      <section className="secCon" style={{ paddingTop: "80px" }}>
        <div className="topCategory">
          <h3>지식</h3>
          <div className="secMenu">
            <Link href={`/knowledge`}>전체</Link>
            <Link href={`/knowledge`}>Tech뉴스</Link>
            <Link href={"/knowledge"}>팁</Link>
            <Link href={"/knowledge"}>칼럼</Link>
            <Link href={"/knowledge"}>리뷰</Link>
          </div>
        </div>
        <div className="cardList">
          {knowledge &&
            knowledge.map((_, i, array) => {
              // 게시물이 5개 이상이면 배열의 마지막 인덱스 렌더링을 건너뜀.
              if (knowledge.length >= 7 && i === array.length - 1) {
                return null;
              }
              return <KnowledgeCard knowledge={knowledge} i={i} key={i} />;
            })}
        </div>
      </section>
      <section className="secCon">
        <div className="topCategory">
          <h3 style={{ fontFamily: "Inter", letterSpacing: 0 }}>Q&amp;A</h3>
          <div className="secMenu">
            <Link href={"/qna"}>기술</Link>
            <Link href={"/qna"}>커리어</Link>
            <Link href={"/qna"}>기타</Link>
            <Link href={"/qna"}>전체</Link>
          </div>
        </div>
        <div className="cardList">
          {qna &&
            qna.map((a, i) => {
              return <QnaCard qna={qna} i={i} key={i} />;
            })}
        </div>
      </section>
      <section className="secCon" style={{ marginBottom: "80px" }}>
        <div className="topCategory">
          <h3>커뮤니티</h3>
          <div className="secMenu">
            <Link href={"/community"}>질문&amp;답변</Link>
            <Link href={"/community"}>모임&amp;스터디</Link>
          </div>
        </div>
        <div className="cardList">
          {dbData &&
            dbData.map((a, i) => {
              return <CommunityCard dbData={dbData} i={i} key={i} />;
            })}
        </div>
      </section>
    </main>
  );
}
