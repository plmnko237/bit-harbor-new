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
                      <Link
                        href={"/mypage"}
                        onClick={() => setMenuButton(!menuButton)}
                      >
                        MYPAGE
                      </Link>
                      <LogoutBtn
                        session={session}
                        onClick={() => setMenuButton(!menuButton)}
                      />
                    </div>
                  </NextAuthProvider>
                ) : (
                  <NextAuthProvider>
                    <Link
                      href={"/members"}
                      onClick={() => setMenuButton(!menuButton)}
                    >
                      <button className="login">
                        <img src="/person.svg" alt="login" />
                        <span>로그인</span>
                      </button>
                    </Link>
                  </NextAuthProvider>
                )}
              </li>
              {["Q&A", "지식", "커뮤니티"].map((menu, i) => {
                return (
                  <li
                    className={tab === menu ? "tabActive" : ""}
                    onClick={() => {
                      setTab(menu);
                      if (menu === "Q&A") {
                        router.push("/qna");
                      } else if (menu === "지식") {
                        router.push("/knowledge");
                      } else if (menu === "커뮤니티") {
                        router.push("/community");
                      }

                      setMenuButton(false);
                    }}
                  >
                    {menu}
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : (
          <nav id="mobileGnb"></nav>
        )}
      </div>
    </div>
  );
}
