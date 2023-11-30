import Link from "next/link";
export default function TopSec() {
  return (
    <div className="topSec">
      <h2>Q &amp; A</h2>
      <p>질문하고 답변하며 함께 발전하는 멋진 개발자가 되어 보아요.</p>
      <div className="topSec_detail">
        <div className="secMenu">
          <Link href={"/"}>전체</Link>
          <Link href={"/"}>커리어</Link>
          <Link href={"/"}>기타</Link>
          <Link href={"/"}>기술</Link>
        </div>
        <div className="searchBar">
          <input
            type="text"
            name="search"
            autoFocus="autofocus"
            placeholder="검색어를 입력해주세요."
          />
          <button type="submit">
            <img src="/search.png" alt="검색" />
          </button>
        </div>
        <Link href={"/"} className="writeBtn">
          <img src="/pen.png" />
          글쓰기
        </Link>
      </div>
    </div>
  );
}
