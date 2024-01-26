"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NextAuthProvider } from "./providers";
import Link from "next/link";
import LogoutBtn from "./members/LogoutBtn";

export default function MobileGnb({ session }) {
  let [tab, setTab] = useState("");
  let [menuButton, setMenuButton] = useState(false);

  let router = useRouter();
  return (
    <div className="mobileMenu">
      <div className={menuButton ? "openMenu" : "closeMenu"}>
        <div
          className="mobileMenuBtn"
          onClick={() => {
            setMenuButton(!menuButton);
          }}
        >
          {menuButton ? (
            <span
              style={{
                color: "white",
                textShadow: "1px 3px 3px rgba(0,0,0,0.5)",
              }}
            >
              ⨉
            </span>
          ) : (
            <span
              style={{
                fontFamily: "Inter",
                fontSize: "40px",
              }}
            >
              ≡
            </span>
          )}
        </div>
        {menuButton ? (
          <nav id="mobileGnb">
            <ul>
              <li className="session">
                {session ? (
                  <NextAuthProvider session={session.user}>
                    <div className="loginActive">
                      <span>{session.user.userNickname}님</span>
                      <Link href={"/mypage"}>MYPAGE</Link>
                      <LogoutBtn session={session} />
                    </div>
                  </NextAuthProvider>
                ) : (
                  <NextAuthProvider>
                    <Link href={"/members"}>
                      <button className="login">
                        <img src="/person.svg" alt="login" />
                        <span>로그인</span>
                      </button>
                    </Link>
                  </NextAuthProvider>
                )}
              </li>
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
                  router.push(`/community`);
                }}
              >
                커뮤니티
              </li>
            </ul>
          </nav>
        ) : (
          <nav id="mobileGnb"></nav>
        )}
      </div>
    </div>
  );
}
