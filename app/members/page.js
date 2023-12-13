"use client";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function Account() {
  let [tab, setTab] = useState(0);

  return (
    <div className="loginPage">
      <div className="con">
        <div className="standing">
          <img src="standing.png" alt="로그인배너" />
        </div>
        <div className="loginForm">
          <div className="btngroup">
            <button
              className="active"
              onClick={(e) => {
                e.target.nextElementSibling.className = "inactive";
                e.target.className = "active";
                setTab(0);
              }}
            >
              로그인
            </button>
            <button
              className="inactive"
              onClick={(e) => {
                e.target.previousSibling.className = "inactive";
                e.target.className = "active";
                setTab(1);
              }}
            >
              회원가입
            </button>
          </div>
          {tab == 0 ? <Login /> : tab == 1 ? <Signup /> : null}
        </div>
      </div>
    </div>
  );
}
