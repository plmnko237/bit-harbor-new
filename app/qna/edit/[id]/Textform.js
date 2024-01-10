"use client";
import TinyMceContainer from "@/pages/api/qna/tiny_editor";
import { useState } from "react";
import _debounce from "lodash/debounce";

export default function Textform({ dataItem }) {
  //텍스트 에디터에 작성된 글
  const [bodyText, setBodyText] = useState("");
  // debounce 함수를 사용하여 500ms 간격으로만 업데이트 처리
  const debouncedSetBodyText = _debounce(setBodyText, 1000);

  // //태그 배열에 추가하기
  // const [tag, setTag] = useState([dataItem.tags]);

  // const handleTagChange = (e) => {
  //   const inputText = e.target.value;
  //   setTag(inputText.split(",").map((tag) => tag.trim()));
  // };

  return (
    <>
      <div className="postBody">
        <TinyMceContainer
          setBodyText={debouncedSetBodyText}
          dataItem={dataItem}
        />
        <input
          name="body"
          defaultValue={bodyText}
          style={{ display: "none" }}
        />
      </div>
      {/* <div className="tagarea">
        <span>태그 : </span>
        <input
          type="text"
          name="tags"
          placeholder="쉼표(,)로 구분해주세요."
          value={tag.join(", ")}
          required
          onChange={handleTagChange}
        />
      </div> */}
    </>
  );
}
