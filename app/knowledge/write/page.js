import Textform from "./Textform";

export default function Write() {
  return (
    <main>
      <form action="../api/knowledge/write" method="POST" className="writeForm">
        <h4>✍ 글작성</h4>
        <div className="postTitle">
          <span>제목 : </span>
          <input
            type="text"
            name="title"
            placeholder="제목을 입력해주세요."
            required
          />
          <select name="category" className="cartegory">
            <option value={"전체"}>카테고리 선택</option>
            <option value={"Tech뉴스"}>Tech뉴스</option>
            <option value={"팁"}>팁</option>
            <option value={"칼럼"}>칼럼</option>
            <option value={"리뷰"}>리뷰</option>
          </select>
        </div>
        <Textform />
        <button className="formBtn">👍 작성완료</button>
      </form>
    </main>
  );
}
