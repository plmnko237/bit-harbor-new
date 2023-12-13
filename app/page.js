import Link from "next/link";
import KnowledgeCard from "./KnowledgeCard";
import QnaCard from "./QnaCard";
import CommunityCard from "./CommunityCard";
import { fetchData } from "@/util/database";

export default async function Home() {
  let dbData = await fetchData();
  console.log(dbData);
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
        </div>
      </section>
      <section className="secCon" style={{ paddingTop: "80px" }}>
        <div className="secMenu">
          <h3>지식</h3>
          <Link href={"/"}>전체</Link>
          <Link href={"/"}>Tech뉴스</Link>
          <Link href={"/"}>팁</Link>
          <Link href={"/"}>칼럼</Link>
          <Link href={"/"}>리뷰</Link>
        </div>
        {/* <div className="cardList">
          <KnowledgeCard awsData={awsData} />
        </div> */}
      </section>
      <section className="secCon">
        <div className="secMenu">
          <h3 style={{ fontFamily: "Inter", letterSpacing: 0 }}>Q&amp;A</h3>
          <Link href={"/"}>기술</Link>
          <Link href={"/"}>커리어</Link>
          <Link href={"/"}>기타</Link>
          <Link href={"/"}>전체</Link>
        </div>
        {/* <div className="cardList">
          <QnaCard awsData={awsData} />
        </div> */}
      </section>
      <section className="secCon" style={{ marginBottom: "80px" }}>
        <div className="secMenu">
          <h3>커뮤니티</h3>
          <Link href={"/"}>질문&amp;답변</Link>
          <Link href={"/"}>모임&amp;스터디</Link>
        </div>
        <div className="cardList">
          {dbData &&
            dbData.map((a, i) => {
              if (i <= 3) {
                return <CommunityCard dbData={dbData} i={i} key={i} />;
              } else {
                return null;
              }
            })}
        </div>
      </section>
    </main>
  );
}
