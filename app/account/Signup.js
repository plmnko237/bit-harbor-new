import Link from "next/link";

export default function Signup() {
  return (
    <form action="" method="post" className="loginBox">
      <h3 className="formTit">Sign Up</h3>
      <div className="inputBox">
        <input
          type="text"
          name="user_id"
          autofocus="autofocus"
          placeholder="아이디 입력"
        />
      </div>
      <div className="inputBox">
        <input type="text" name="user_name" placeholder="이름" />
      </div>
      <div className="inputBox">
        <input type="email" name="email" placeholder="이메일" />
      </div>
      <div className="inputBox">
        <input type="password" name="user_pw" placeholder="비밀번호" />
      </div>
      <div className="inputBox">
        <input type="password" name="user_pw" placeholder="비밀번호 확인" />
      </div>
      <button type="submit" id="submitBtn">
        회원가입
      </button>
    </form>
  );
}
