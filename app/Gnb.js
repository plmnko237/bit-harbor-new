"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Gnb() {
  let [tab, setTab] = useState("");
  let router = useRouter();
  return (
    <nav id="gnb">
      <ul>
        <li
          className={tab === "Q&A" ? "tabActive" : ""}
          onClick={() => {
            setTab("Q&A");
            router.push("/qna");
          }}
        >
          Q&A
        </li>
        <li
          className={tab === "지식" ? "tabActive" : ""}
          onClick={() => {
            setTab("지식");
            router.push("/knowledge");
          }}
        >
          지식
        </li>
        <li
          className={tab === "커뮤니티" ? "tabActive" : ""}
          onClick={() => {
            setTab("커뮤니티");
            router.push("/community");
          }}
        >
          커뮤니티
        </li>
      </ul>
    </nav>
  );
}
