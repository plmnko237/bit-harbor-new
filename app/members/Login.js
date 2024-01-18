import { signIn } from "next-auth/react";
import Link from "next/link";

function Login() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signIn("credentials", {
      email,
      password,
    });

    if (result.error) {
      console.error(result.error);
    }
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
          <Link href={"/"}>아이디/비밀번호 찾기</Link>
        </div>
        <div className="socialLog">
          <h4>소셜 로그인</h4>
          <div className="social-icons">
            <Link href={"/"}>
              <img src="/kakao.png" alt="카카오톡" />
            </Link>
            <Link href={"/"}>
              <img src="/naver.png" alt="네이버" />
            </Link>
            <Link href={"/"}>
              <img src="/google.png" alt="구글" />
            </Link>
            <Link href={"/"}>
              <img src="/facebook.png" alt="페이스북" />
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
