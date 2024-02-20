"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Signup({ myMember }) {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    checkPassword: "",
    userName: "",
    userNickname: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //닉네임 중복확인
    for (let i = 0; i < myMember.length; i++) {
      if (myMember[i].userNickname === formValues.userNickname) {
        alert("닉네임 중복. 다른 닉네임을 사용해주세요.");
        return;
      }
    }
    //전화번호 중복확인
    for (let i = 0; i < myMember.length; i++) {
      if (myMember[i].phoneNumber === formValues.phoneNumber) {
        alert("이미 사용중인 번호입니다. 다시 한 번 확인해주세요.");
        return;
      }
    }

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

    // 조건이 모두 통과되면 API 호출 또는 다른 작업 수행
    fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(formValues),
    })
      .then((response) => {
        console.log("응답결과", response);
        if (response.status === 200) {
          alert("회원가입이 완료되었습니다. 로그인 해주세요.");
          location.reload();
        }
        if (response.status === 409) {
          alert("이메일 중복! 다른 이메일을 사용해주세요.");
        }
      })
      .catch((error) => {
        console.error("오류 발생:", error);
        if (error.response) {
          // 서버가 응답한 상태 코드가 400인 경우
          error.response.json().then((data) => {
            console.error("Error Response Data:", data);
            setErrorMessage(data);
          });
        } else {
          // 서버 응답을 받지 못한 경우 (네트워크 문제 등)
          console.error("Error Message:", error.message);
        }
      });
  };

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
          placeholder="닉네임"
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
