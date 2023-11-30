import Link from "next/link";

export default function Signup() {
  return (
    <form action="" method="post" className="loginBox">
      <h3 className="formTit">Sign Up</h3>
      <div className="inputBox">
        <input
          type="email"
          name="email"
          autofocus="autofocus"
          placeholder="이메일주소"
        />
      </div>
      <div className="inputBox">
        <input type="text" name="userName" placeholder="이름" />
      </div>
      <div className="inputBox">
        <input type="password" name="password" placeholder="비밀번호" />
      </div>
      <div className="inputBox">
        <input
          type="password"
          name="checkPassword"
          placeholder="비밀번호 확인"
        />
      </div>
      <div className="inputBox">
        <input
          type="tel"
          name="phoneNumber"
          placeholder="전화번호 입력(예:010-1234-5678)"
        />
      </div>
      <button type="submit" id="submitBtn">
        회원가입
      </button>
    </form>
  );
}
