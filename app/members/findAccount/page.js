"use client";
import { useState } from "react";
import FindId from "./FindId";
import FindPw from "./FindPw";

export default function FindAccount() {
  let [tab, setTab] = useState(0);
  return (
    <main>
      <div className="findAccountCon">
        <div className="loginForm">
          <div className="btngroup">
            <button
              className="active1"
              onClick={(e) => {
                e.target.nextElementSibling.className = "inactive";
                e.target.className = "active1";
                setTab(0);
              }}
            >
              아이디 찾기
            </button>
            <button
              className="inactive"
              onClick={(e) => {
                e.target.previousSibling.className = "inactive";
                e.target.className = "active1";
                setTab(1);
              }}
            >
              비밀번호 찾기
            </button>
          </div>
          {tab === 0 ? <FindId /> : tab === 1 ? <FindPw /> : null}
        </div>
      </div>
    </main>
  );
}
