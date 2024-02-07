import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function FindId() {
  let router = useRouter();
  let [userEmail, setUserEmail] = useState("");
  let [userPhoneNumber, setUserPhoneNumber] = useState("");
  let [veriCode, setVeriCode] = useState("");
  let [disable, setDisable] = useState("none");
  let [dbEmail, setDbEmail] = useState("");
  let [disable2, setDisable2] = useState("none");

  const idHandleSubmit = async (e) => {
    e.preventDefault();

    const userInfo = { email: userEmail, phoneNumber: userPhoneNumber };

    const result = await fetch(
      "https://server.bit-harbor.net/members/findingId",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(userInfo),
      }
    );

    if (result.status === 400) {
      alert("일치하는 회원이 없습니다.");
      setDisable("none");
    } else if (result.status === 200) {
      alert("해당 이메일로 인증번호가 전송되었습니다.");
      setDisable("block");
    }
  };

  const veriHandleSubmit = async (e) => {
    e.preventDefault();

    const verificationCode = {
      verificationCode: veriCode,
      email: userEmail,
      phoneNumber: userPhoneNumber,
    };

    const result = await fetch(
      "https://server.bit-harbor.net/members/verify-Id-code",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(verificationCode),
      }
    );

    const responseData = await result.json();

    setDbEmail(responseData.data.email);

    if (result.status === 400) {
      alert("인증실패");
      setDisable2("none");
    } else if (result.status === 200) {
      alert("인증완료");
      setDisable2("block");
    }
  };
  return (
    <>
      <form className="loginBox">
        <div className="inputBox">
          <input
            type="email"
            name="email"
            autoFocus={true}
            autoComplete="email"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
            placeholder="인증코드 받을 이메일 주소"
          />
        </div>
        <div className="inputBox">
          <input
            type="tel"
            name="phoneNumber"
            onChange={(e) => setUserPhoneNumber(e.target.value)}
            value={userPhoneNumber}
            placeholder="전화번호 입력(예:010-1234-5678)"
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
          onClick={idHandleSubmit}
        >
          아이디 찾기
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
          <h4
            style={{
              textAlign: "center",
              fontWeight: "400",
              margin: "50px 0",
            }}
          >
            회원님의 이메일은{" "}
            <span style={{ color: "#07C96C", fontWeight: "700" }}>
              {dbEmail}
            </span>{" "}
            입니다.
          </h4>
          <button
            type="button"
            id="submitBtn"
            onClick={() => {
              router.push("/members");
            }}
            style={{
              background: "#fff",
              color: "#4730d9",
              border: "1px solid #4730d9",
            }}
          >
            로그인하러가기
          </button>
        </div>
      </form>
    </>
  );
}
export default FindId;
