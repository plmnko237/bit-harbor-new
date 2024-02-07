import { getProviders, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

function Login() {
  const [providers, setProviders] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signIn("credentials", {
      email,
      password,
    });
  };

  const handleKakao = async () => {
    const result = await signIn("kakao", {
      redirect: true,
      callbackUrl: "/members",
    });
  };

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
        <div className="socialLog">
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
        </div>
      </form>
    </>
  );
}

export default Login;
