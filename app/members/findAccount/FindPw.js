import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function FindPw() {
  let [userEmail, setUserEmail] = useState("");
  let [disable, setDisable] = useState("none");
  let [disable2, setDisable2] = useState("none");
  let [veriCode, setVeriCode] = useState("");
  let [chkPw1, setChkPw1] = useState("");
  let [chkPw2, setChkPw2] = useState("");
  let router = useRouter();

  const pwHandleSubmit = async (e) => {
    e.preventDefault();

    const email = { email: userEmail };

    const result = await fetch(
      "https://server.bit-harbor.net/members/findingPW",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(email),
      }
    );

    if (result.status === 400) {
      alert("가입한 이메일이 없습니다.");
      setDisable("none");
    } else if (result.status === 200) {
      alert("해당 이메일로 인증번호가 전송되었습니다.");
      setDisable("block");
    }
  };

  const veriHandleSubmit = async (e) => {
    e.preventDefault();

    const verificationCode = { verificationCode: veriCode, email: userEmail };
    console.log(verificationCode);

    const result = await fetch(
      "https://server.bit-harbor.net/members/verify-PW-code",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(verificationCode),
      }
    );

    if (result.status === 400) {
      alert("인증실패");
      setDisable2("none");
    } else if (result.status === 200) {
      alert("인증완료. 비밀번호를 초기화 해주세요.");
      setDisable2("block");
    }
  };

  const resetHandleSubmit = async (e) => {
    e.preventDefault();

    let resetPassword;

    if (chkPw1 === chkPw2) {
      resetPassword = {
        email: userEmail,
        password: chkPw1,
        checkPassword: chkPw2,
      };
      console.log("리셋", resetPassword);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }

    const result = await fetch(
      "https://server.bit-harbor.net/members/changePW",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(resetPassword),
      }
    );

    if (result.status === 400) {
      alert("비밀번호 변경실패. 다시 시도 해주세요.");
      location.reload();
    } else if (result.status === 200) {
      alert("비밀번호 변경 완료. 로그인 해주세요.");
      router.push("/members");
    }
  };
  return (
    <>
      <form className="loginBox">
        <div className="inputBox">
          <input
            id="user_id"
            type="email"
            name="email"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
            autoFocus
            placeholder="가입했던 이메일 주소"
            required
          />
        </div>
        <button
          type="button"
          id="submitBtn"
          style={{
            background: "#fff",
            color: "#4730d9",
            border: "1px solid #4730d9",
          }}
          onClick={pwHandleSubmit}
        >
          비밀번호 찾기
        </button>
        <div className="verificationBox" style={{ display: disable }}>
          <div className="inputBox">
            <input
              id="user_id"
              type="text"
              name="verificationCode"
              autoFocus
              placeholder="인증코드 입력"
              onChange={(e) => setVeriCode(e.target.value)}
            />
          </div>{" "}
          <button
            type="button"
            id="submitBtn"
            style={{
              background: "#fff",
              color: "#4730d9",
              border: "1px solid #4730d9",
            }}
            onClick={veriHandleSubmit}
          >
            인증하기
          </button>
        </div>
        <div className="verificationBox" style={{ display: disable2 }}>
          <div className="inputBox">
            <input
              type="password"
              name="password"
              placeholder="비밀번호(특수문자,숫자포함 8~16자)"
              onChange={(e) => setChkPw1(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <input
              type="password"
              name="checkPassword"
              placeholder="비밀번호 확인"
              onChange={(e) => setChkPw2(e.target.value)}
            />
          </div>
          <button
            type="button"
            id="submitBtn"
            style={{
              background: "#fff",
              color: "#4730d9",
              border: "1px solid #4730d9",
            }}
            onClick={resetHandleSubmit}
          >
            비밀번호 초기화
          </button>
        </div>
      </form>
    </>
  );
}
export default FindPw;
