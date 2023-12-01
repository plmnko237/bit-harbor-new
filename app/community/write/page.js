"use client";
import TinyMceContainer from "@/pages/api/tiny_editor";
import { useState } from "react";
import _debounce from "lodash/debounce";

export default function Write() {
  let today = new Date();
  today = today.getFullYear() + "." + today.getMonth() + "." + today.getDate();

  //텍스트 에디터에 작성된 글
  const [bodyText, setBodyText] = useState("");
  // debounce 함수를 사용하여 500ms 간격으로만 업데이트 처리
  const debouncedSetBodyText = _debounce(setBodyText, 1000);

  //태그 배열에 추가하기
  const [tag, setTag] = useState([]);

  const handleTagChange = (e) => {
    const inputText = e.target.value;
    setTag(inputText.split(",").map((tag) => tag.trim()));
  };

  console.log(tag);

  return (
    <main>
      <form action="../api/test" method="POST" className="writeForm">
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
        <div className="postBody">
          <TinyMceContainer setBodyText={debouncedSetBodyText} />
          <input
            name="body"
            defaultValue={bodyText}
            style={{ display: "none" }}
          />
        </div>
        <div className="tagarea">
          <span>태그 : </span>
          <input
            type="text"
            name="tags"
            placeholder="쉼표(,)로 구분해주세요."
            value={tag.join(", ")}
            required
            onChange={handleTagChange}
          />
        </div>
        <input type="text" value={today} style={{ display: "none" }} />
        <button className="formBtn">👍 작성완료</button>
      </form>
    </main>
  );
}
