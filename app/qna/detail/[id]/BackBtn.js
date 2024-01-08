"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";

export default function BackBtn() {
  let router = useRouter();
  return (
    <button
      className="prev"
      onClick={(e) => {
        e.preventDefault();
        router.back();
      }}
    >
      <img src="/navigate_before.svg" /> 게시판으로 돌아가기
    </button>
  );
}
