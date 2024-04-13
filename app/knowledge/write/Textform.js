"use client";
import TinyMceContainer from "../tiny_editor";
import { useEffect, useState } from "react";
import _debounce from "lodash/debounce";

export default function Textform() {
  //텍스트 에디터에 작성된 글
  const [bodyText, setBodyText] = useState("");
  // debounce 함수를 사용하여 500ms 간격으로만 업데이트 처리
  const debouncedSetBodyText = _debounce(setBodyText, 1000);
  let [url, setUrl] = useState("");

  const handleFileChange = async (e) => {
    let file = e.target.files[0];
    //파일용량 제한
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("파일 크기는 2MB 이하로 제한됩니다.");
      e.target.value = ""; // 파일 선택 취소
      return;
    }

    let formData = new FormData();
    formData.append("files", file);
    formData.append("uploadTo", "knowledge");

    let res = await fetch("https://server.bit-harbor.net/s3/uploads", {
      method: "POST",
      body: formData,
    })
      .then((r) => r.json())
      .then((result) => {
        setUrl(result.data[0].uploadFileUrl);
      });
  };

  return (
    <>
      <div className="postBody">
        <TinyMceContainer
          setBodyText={debouncedSetBodyText}
          className="tinyEditor"
        />
        <input
          name="body"
          defaultValue={bodyText}
          style={{ visibility: "hidden" }}
        />
      </div>
      <div className="tagInfo">
        📌 대표 이미지는 가로 303px, 세로 419px, 해상도 72px로 올려주세요.
      </div>
      <div className="tagarea">
        <span>대표이미지 등록 :</span>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      <input
        type="text"
        name="imgURL"
        defaultValue={url}
        style={{ visibility: "hidden" }}
      />
    </>
  );
}
