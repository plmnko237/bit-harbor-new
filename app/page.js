import { fetchData } from "@/util/db_community";
import { qnaData } from "@/util/db_qna";
import { knowledgeData } from "@/util/db_knowledge";
import Link from "next/link";
import dynamic from "next/dynamic";

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
        <div className="maintxt">
          <h2>개발자를 위한 공간.</h2>
          <p>
            이곳은 개발자들을 위한 공간입니다.
            <br />
            자유롭게 탐색하고, 유용한 정보들을 찾아가세요.
            <br />
            당신의 지식을 나누어주세요.
            <br />
            개발에 대한 정보라면 어떤 것이든 환영합니다.
          </p>
          <button className="mainBtn">
            <span className="mainBtnIcon">🙌</span>
            <Link href={"/members"}>
              <span>BitHarbor와 함께하기</span>
            </Link>
          </button>
          <Link href={"/developers"}>
            <button
              type="button"
              className="writeBtn"
              style={{ marginLeft: "0" }}
            >
              개발자 소개 👨‍💻
            </button>
          </Link>
        </div>
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
              if (knowledge.length >= 5 && i === array.length - 1) {
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
          {/* qna.slice(qna.length - 6) */}
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
