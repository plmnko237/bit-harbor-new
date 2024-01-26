import Textform from "./Textform";

export default function Write() {
  return (
    <main>
      <form action="../api/qna/write" method="POST" className="writeForm">
        <h4>✍ 글작성</h4>
        <div className="postTitle">
          <div className="titleArea">
            <span>제목 : </span>
            <input
              type="text"
              name="title"
              placeholder="여기에 제목을 입력해주세요."
              required
            />
          </div>
          <select name="category" className="cartegory">
            <option value={"전체"}>카테고리 선택</option>
            <option value={"기술"}>기술</option>
            <option value={"커리어"}>커리어</option>
            <option value={"기타"}>기타</option>
          </select>
        </div>
        <Textform />
        <button className="formBtn">👍 작성완료</button>
      </form>
    </main>
  );
}
