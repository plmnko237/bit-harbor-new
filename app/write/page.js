"use client";
import TinyMceContainer from "@/pages/api/tiny_editor";
import { useState } from "react";

export default function Write() {
  let today = new Date();
  today = today.getFullYear() + "." + today.getMonth() + "." + today.getDate();

  const [bodyText, setBodyText] = useState("");
  console.log(bodyText);

  return (
    <main>
      <form action="api/test" method="POST" className="writeForm">
        <h4>✍ 글작성</h4>
        <div className="postTitle">
          <span>제목 : </span>
          <input
            type="text"
            name="title"
            placeholder="제목을 입력해주세요."
            autoFocus="autofocus"
          />
          <select name="category" className="cartegory">
            <option value={"전체"}>카테고리 선택</option>
            <option value={"질문&답변"}>질문&답변</option>
            <option value={"모임&스터디"}>모임&스터디</option>
          </select>
        </div>
        <div className="postBody">
          <TinyMceContainer setBodyText={setBodyText} />
          <input name="body" value={bodyText} style={{ display: "none" }} />
        </div>
        <div className="tagarea">
          <span>태그 : </span>
          <input
            type="text"
            name="tags"
            placeholder="쉼표(,)로 구분해주세요."
          />
        </div>
        <input type="text" value={today} style={{ display: "none" }} />
        <button className="formBtn">👍 작성완료</button>
      </form>
    </main>
  );
}
