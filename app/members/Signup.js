"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Signup() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    checkPassword: "",
    userName: "",
    userNickname: "",
    phoneNumber: "",
  });
  let [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 여기서 조건을 검사하고 조건에 맞지 않으면 alert
    if (!emailCheck(formValues.email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    if (!passwordCheck(formValues.password)) {
      alert("비밀번호는 특수문자,숫자포함 8~16자여야 합니다.");
      return;
    }

    if (!passwordDoubleCheck(formValues.password, formValues.checkPassword)) {
      alert("비밀번호가 다릅니다.");
      return;
    }

    // 나머지 필드에 대한 조건 검사 추가

    // 조건이 모두 통과되면 API 호출 또는 다른 작업 수행
    axios
      .post("/api/auth/signup", formValues)
      .then((res) => console.log("중복응답", res))
      .catch((error) => {
        if (error.response) {
          // 서버가 응답한 상태 코드가 400인 경우
          console.error("Error Response Data:", error.response.data);
          setErrorMessage(error.response.data);
        } else {
          // 서버 응답을 받지 못한 경우 (네트워크 문제 등)
          console.error("Error Message:", error.message);
        }
      });
  };
  useEffect(() => {
    if (errorMessage) {
      console.log(errorMessage);
      alert(errorMessage);
    }
  }, [errorMessage]);

  const emailCheck = (email) => {
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    return emailRegEx.test(email);
  };

  const passwordCheck = (password) => {
    const passwordRegEx =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    return passwordRegEx.test(password);
  };

  const passwordDoubleCheck = (password, checkPassword) => {
    return password === checkPassword;
  };

  return (
    <form className="loginBox" onSubmit={handleSubmit}>
      <h3 className="formTit">Sign Up</h3>
      <div className="inputBox">
        <input
          id="user_id"
          type="email"
          name="email"
          autoFocus
          placeholder="이메일주소"
          required
          onChange={handleInputChange}
        />
      </div>
      <div className="inputBox">
        <input
          type="text"
          name="userName"
          placeholder="이름"
          required
          onChange={handleInputChange}
        />
      </div>
      <div className="inputBox">
        <input
          type="text"
          name="userNickname"
          placeholder="닉네임(공백 없이 입력해주세요.)"
          required
          onChange={handleInputChange}
        />
      </div>
      <div className="inputBox">
        <input
          type="password"
          name="password"
          placeholder="비밀번호(특수문자,숫자포함 8~16자)"
          required
          onChange={handleInputChange}
        />
      </div>
      <div className="inputBox">
        <input
          type="password"
          name="checkPassword"
          placeholder="비밀번호 확인"
          required
          onChange={handleInputChange}
        />
      </div>
      <div className="inputBox">
        <input
          type="tel"
          name="phoneNumber"
          placeholder="전화번호 입력(예:010-1234-5678)"
          required
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" id="submitBtn">
        회원가입
      </button>
    </form>
  );
}
