"use client";
import { useEffect, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useSession } from "next-auth/react";

export default function Account() {
  let [tab, setTab] = useState(0);
  const { data: session, status } = useSession();
  let [myMember, setMyMember] = useState([]);

  useEffect(() => {
    // 회원정보가져오기
    const fetchData = async () => {
      try {
        const response = await fetch("https://server.bit-harbor.net/members", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        });

        if (response.status === 200) {
          const result = await response.json();
          const getData = result.data;
          setMyMember(getData);
        } else {
          console.error("Failed to fetch data. Status:", response.status);
          setMyMember([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMyMember([]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (status === "authenticated" && session) {
      let authorization = session.user.authorization;
      let refresh = session.user.refresh;
      localStorage.setItem("authorization", authorization);
      localStorage.setItem("refresh", refresh);
    }
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
          {tab === 0 ? (
            <Login />
          ) : tab === 1 ? (
            <Signup myMember={myMember} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
