"use client";
import { useState } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChk, setPasswordChk] = useState("");
  // 이메일&비번 정규식
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^[A-Za-z0-9]{8,16}$/;

  //이메일체크
  const emailCheck = (userName) => {
    emailRegEx.test(userName)
      ? userName
      : alert("이메일 형식이 올바르지 않습니다.");
  };
  //비밀번호 형식체크
  const passwordCheck = (password) => {
    if (password.match(passwordRegEx) === null) {
      alert("비밀번호는 특수문자,숫자포함 8~16자여야 합니다.");
      return;
    }
  };
  //비밀번호 확인
  const passwordDoubleCheck = (password, passwordChk) => {
    if (password !== passwordChk) {
      alert("비밀번호가 다릅니다.");
      return;
    }
  };

  return (
    <form action="/api/auth/signup" method="POST" className="loginBox">
      <h3 className="formTit">Sign Up</h3>
      <div className="inputBox">
        <input
          id="user_id"
          type="email"
          name="email"
          autoFocus
          placeholder="이메일주소"
          required
          onBlur={(e) => {
            setUsername(e.target.value);
            emailCheck(e.target.value);
          }}
        />
      </div>
      <div className="inputBox">
        <input type="text" name="userName" placeholder="이름" required />
      </div>
      <div className="inputBox">
        <input
          type="text"
          name="userNickname"
          placeholder="닉네임(공백 없이 입력해주세요.)"
          required
        />
      </div>
      <div className="inputBox">
        <input
          type="password"
          name="password"
          placeholder="비밀번호(특수문자,숫자포함 8~16자)"
          required
          onChange={(e) => {
            setPassword(e.target.value);
            passwordCheck(e.target.value);
          }}
        />
      </div>
      <div className="inputBox">
        <input
          type="password"
          name="checkPassword"
          placeholder="비밀번호 확인"
          required
          onChange={(e) => {
            setPasswordChk(e.target.value);
            passwordDoubleCheck(password, e.target.value);
          }}
        />
      </div>
      <div className="inputBox">
        <input
          type="tel"
          name="phoneNumber"
          placeholder="전화번호 입력(예:010-1234-5678)"
          required
        />
      </div>
      <button type="submit" id="submitBtn">
        회원가입
      </button>
    </form>
  );
}
