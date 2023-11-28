import Link from "next/link";

export default function Login() {
  return (
    <form action="" method="post" className="loginBox">
      <h3 className="formTit">Login</h3>
      <div className="inputBox">
        <input
          type="text"
          name="user_id"
          autofocus="autofocus"
          placeholder="아이디 입력"
        />
      </div>
      <div className="inputBox">
        <input type="password" name="user_pw" placeholder="비밀번호 입력" />
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
            <img src="/naver.png" alt="카카오톡" />
          </Link>
          <Link href={"/"}>
            <img src="/google.png" alt="카카오톡" />
          </Link>
          <Link href={"/"}>
            <img src="/facebook.png" alt="카카오톡" />
          </Link>
        </div>
      </div>
    </form>
  );
}
