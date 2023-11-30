import Link from "next/link";
export default function TopSec() {
  return (
    <div className="topSec">
      <h2>지식</h2>
      <p>개발 최신 트렌드와 다양한 기술 지식을 공유해보세요.</p>
      <div className="topSec_detail">
        <div className="secMenu">
          <Link href={"/"}>전체</Link>
          <Link href={"/"}>Tech뉴스</Link>
          <Link href={"/"}>팁</Link>
          <Link href={"/"}>칼럼</Link>
          <Link href={"/"}>리뷰</Link>
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
