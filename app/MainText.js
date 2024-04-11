"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function MainText() {
  //페이지 로드 시 위로 텍스트 나타나기
  useEffect(() => {
    const mainText = document.querySelector(".maintxt");
    if (mainText) {
      mainText.style.display = "inline-flex";
      mainText.style.paddingTop = "7.35rem";
      mainText.classList.add("visible");
    }
  }, []);

  return (
    <div className="maintxt">
      <h2>개발자를 위한 공간.</h2>
      <p>
        이곳은 개발자들을 위한 공간입니다.
        <br />
        자유롭게 탐색하고, 유용한 정보들을 찾아가세요.
        <br />
        당신의 지식을 나누어주세요.
        <br />
        개발에 대한 정보라면 어떤 것이든 환영합니다.
      </p>
      <button className="mainBtn">
        <span className="mainBtnIcon">🙌</span>
        <Link href={"/members"}>
          <span>BitHarbor와 함께하기</span>
        </Link>
      </button>
      <Link href={"/developers"}>
        <button type="button" className="writeBtn" style={{ marginLeft: "0" }}>
          개발자 소개 👨‍💻
        </button>
      </Link>
    </div>
  );
}
