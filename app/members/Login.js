import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import LogoutBtn from "./LogoutBtn";
import { useRouter } from "next/navigation";

function Login() {
  const { data: session, status } = useSession();
  let [userLogin, setUserLogin] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result.status === 401) {
      alert("이메일 혹은 비밀번호가 일치하지 않습니다.");
      location.reload();
    } else if (result.status === 200) {
      location.reload();
    }
  };

  // const handleKakao = async () => {
  //   const result = await signIn("kakao", {
  //     redirect: true,
  //     callbackUrl: "/members",
  //   });
  // };
  if (session) {
    return (
      <form onSubmit={handleSubmit} className="loginBox">
        <h3 className="formTit">내 정보</h3>
        <div className="myInfo">
          <li>
            <span>{session.user.userNickname}</span>님 환영합니다.
          </li>
          <div className="myImg">
            <img src="/m_visual.png" alt="로그인중" />
          </div>
          <li style={{ fontSize: "14px" }}>
            현재 로그인중인 이메일: {session.user.email}
          </li>
          <li className="sessionLogOut">
            <LogoutBtn />{" "}
          </li>
        </div>
      </form>
    );
  } else {
    return (
      <>
        <form onSubmit={handleSubmit} className="loginBox">
          <h3 className="formTit">Login</h3>
          <div className="inputBox">
            <input
              type="email"
              name="email"
              autoFocus={true}
              autoComplete="email"
              placeholder="이메일 입력"
            />
          </div>
          <div className="inputBox">
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="비밀번호 입력"
            />
          </div>
          <button type="submit" id="submitBtn">
            로그인
          </button>
          <div className="check-account">
            <Link href={"/members/findAccount"}>이메일/비밀번호 찾기</Link>
          </div>
          {/* <div className="socialLog">
          <h4>소셜 로그인</h4>
          <div className="social-icons">
            <button
              type="button"
              onClick={() =>
                signIn("naver", { redirect: true, callbackUrl: "/members" })
              }
            >
              <img src="/naver.png" alt="네이버" />
            </button>
            <button
              type="button"
              onClick={() =>
                signIn("google", { redirect: true, callbackUrl: "/members" })
              }
            >
              <img src="/google.png" alt="구글" />
            </button>
          </div>
        </div> */}
        </form>
      </>
    );
  }
}

export default Login;
