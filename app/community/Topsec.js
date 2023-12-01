import Link from "next/link";
export default function TopSec() {
  return (
    <div className="topSec">
      <h2>커뮤니티</h2>
      <p>당신의 지식을 공유하고 새로운 아이디어를 얻어보세요.</p>
      <div className="topSec_detail">
        <div className="secMenu">
          <Link href={"/"}>질문&amp;답변</Link>
          <Link href={"/"}>모임&amp;스터디</Link>
        </div>
        <div className="searchBar">
          <input
            type="text"
            name="search"
            autoFocus="true"
            placeholder="검색어를 입력해주세요."
          />
          <button type="submit">
            <img src="/search.png" alt="검색" />
          </button>
        </div>
        <Link href={"/community/write"} className="writeBtn">
          <img src="/pen.png" />
          글쓰기
        </Link>
      </div>
    </div>
  );
}
