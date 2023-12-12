import Textform from "./Textform";

export default function Write() {
  return (
    <main>
      <form action="../api/community/write" method="POST" className="writeForm">
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
            <option value={"질문&답변"}>질문&답변</option>
            <option value={"모임&스터디"}>모임&스터디</option>
          </select>
        </div>
        <Textform />
        <button className="formBtn">👍 작성완료</button>
      </form>
    </main>
  );
}
