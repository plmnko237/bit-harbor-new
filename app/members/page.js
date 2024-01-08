"use client";
import { useEffect, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useSession } from "next-auth/react";

export default function Account() {
  let [tab, setTab] = useState(0);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session) {
      let authorization = session.user.authorization;
      let refresh = session.user.refresh;
      localStorage.setItem("authorization", authorization);
      localStorage.setItem("refresh", refresh);
    }
    console.log("세션있냐:", session);
  }, [status, session]);

  if (status === "loading") {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div className="loginPage">
      <div className="con">
        <div className="standing">
          <img src="/Standing.png" alt="로그인배경" />
        </div>
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
              로그인
            </button>
            <button
              className="inactive"
              onClick={(e) => {
                e.target.previousSibling.className = "inactive";
                e.target.className = "active1";
                setTab(1);
              }}
            >
              회원가입
            </button>
          </div>
          {tab === 0 ? <Login /> : tab === 1 ? <Signup /> : null}
        </div>
      </div>
    </div>
  );
}
