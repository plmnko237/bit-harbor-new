"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function TopSec({ session }) {
  let router = useRouter();
  console.log("로그인함?", session);
  return (
    <div className="topSec">
      <h2>커뮤니티</h2>
      <p>당신의 지식을 공유하고 새로운 아이디어를 얻어보세요.</p>
      <div className="topSec_detail">
        <div className="secMenu">
          <Link href={"/"}>전체</Link>
          <Link href={"/"}>질문&amp;답변</Link>
          <Link href={"/"}>모임&amp;스터디</Link>
        </div>
        <div className="searchBar">
          <input
            type="text"
            name="search"
            autoFocus="true"
            placeholder="검색어를 입력해주세요."
            autoComplete="off"
          />
          <button type="submit">
            <img src="/search.png" alt="검색" />
          </button>
        </div>

        <div
          className="writeBtn"
          onClick={() => {
            if (session.data == null) {
              alert("로그인해주세요.");
            } else {
              router.push("/community/write");
            }
          }}
        >
          <img src="/pen.png" />
          글쓰기
        </div>
      </div>
    </div>
  );
}
