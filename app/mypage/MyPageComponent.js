"use client";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyPageComponent() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  let [myMember, setMyMember] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(1);
  const [formValues, setFormValues] = useState({
    password: "",
    checkPassword: "",
    currentPassword: "",
    userName: "",
    userNickname: "",
    phoneNumber: "",
    profileNum: "",
  });

  const handleProfileButtonClick = (value) => {
    setSelectedProfile(value);
  };

  useEffect(() => {
    // 세션 데이터가 로딩 중이거나 없으면 빈값 반환
    if (status === "loading" || !session) {
      return;
    }
    axios.get("https://server.bit-harbor.net/members").then((result) => {
      setMyMember(result.data.data);
    });
  }, [session, status]);

  //세션에서 일치하는 회원정보 찾기
  let findMember = myMember.find((user) => user.email === session.user.email);

  //일치하는 회원이 있으면 formValue에 추가
  useEffect(() => {
    if (findMember) {
      setFormValues(findMember);
    }
  }, [findMember]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };
  //로컬스토리지에서 세션정보 가져오기
  const authorize = localStorage.getItem("authorization");
  const refresh = localStorage.getItem("refresh");

  //회원정보 업데이트
  const handleMemberInfo = async () => {
    try {
      const response = await axios.post("api/auth/memberUpdate", formValues);
      if (response.status === 200) {
        if (status === "authenticated") {
          const { user } = await update({
            userNickname: formValues.userNickname,
            userName: formValues.userName,
          });
          localStorage.setItem("authorization", user.authorization);
          localStorage.setItem("refresh", user.refresh);
        }
        location.reload();
        alert("회원정보 수정 완료");
      }
    } catch (error) {
      console.error("회원수정 실패:", error.message);
      alert("회원정보 수정 실패");
    }
  };

  if (findMember) {
    return (
      <section className="myPageCon">
        <div className="leftCon">
          <h4>내 계정</h4>
          <div className="profileImg">
            <img src={findMember.bigProfileImg} alt="내 계정 이미지" />
          </div>
          <span>{findMember.userNickname}</span>
          <div className="userInfo">
            <span>• Email : {findMember.email}</span>
          </div>
        </div>
        {/* 회원 정보 바꾸기 */}
        <form className="rightCon">
          <div className="userUpdate">
            <h4>이름 변경</h4>
            <div className="userChangeInfo">
              <input
                type="text"
                name="userName"
                placeholder={session.user.userName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="userUpdate">
            <h4>닉네임 변경</h4>
            <div className="userChangeInfo">
              <input
                type="text"
                name="userNickname"
                placeholder={session.user.userNickname}
                onChange={(e) => {
                  setFormValues((prevFormValues) => ({
                    ...prevFormValues,
                    userNickname: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="userUpdate">
            <h4>프로필 이미지 변경</h4>
            <div className="userChangeInfo">
              <div className="profileIcons">
                {[1, 2, 3, 4, 5, 6, 7].map((profileNum) => (
                  <button
                    key={profileNum}
                    className={`profile ${
                      selectedProfile === profileNum ? "pActive" : ""
                    }`}
                    value={profileNum}
                    name="profileNum"
                    onClick={(e) => {
                      e.preventDefault();
                      handleProfileButtonClick(profileNum); // 선택한 프로필 번호를 selectedProfile에 업데이트
                      // 프로필 번호를 formValues에 업데이트
                      setFormValues((prevFormValues) => ({
                        ...prevFormValues,
                        profileNum: profileNum,
                      }));
                    }}
                  >
                    <img
                      src={`/user_icon${profileNum}_big.png`}
                      alt={"프로필" + profileNum}
                      width={80}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <h4>비밀번호 변경</h4>
            <h5>현재 비밀번호</h5>
            <div
              className="userChangeInfo"
              style={{ marginBottom: "20px", justifyContent: "flex-start" }}
            >
              <input
                type="password"
                name="currentPassword"
                placeholder="현재 비밀번호 입력"
                onChange={handleInputChange}
              />
            </div>
            <h5>바꿀 비밀번호</h5>
            <div
              className="userChangeInfo"
              style={{ justifyContent: "flex-start" }}
            >
              <input
                type="password"
                name="password"
                placeholder="바꿀 비밀번호 입력"
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="checkPassword"
                placeholder="비밀번호 확인"
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* form 안에서 button type을 명시하지 않으면 페이지 이동 form 안에서 ajax 비동기 요청하였으나 form과 동시에 동작해서 문제 발생한것으로 보임 */}
          <button
            className="writeBtn"
            style={{ width: "80px", marginLeft: "0px", margin: "0 auto" }}
            onClick={handleMemberInfo}
            type="button"
          >
            변경하기
          </button>
        </form>
        <section className="withdraw">
          <button
            className="inactiveBtn"
            onClick={(e) => {
              e.preventDefault();
              let answer = confirm("정말로 회원을 탈퇴하시겠습니까?");
              if (answer == true) {
                fetch(
                  `https://server.bit-harbor.net/members/${findMember.memberId}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: session.user.authorization,
                    },
                    mode: "cors",
                  }
                );
                alert("회원탈퇴가 완료되었습니다.");
                signOut({ callbackUrl: "/" });
              } else {
                return;
              }
            }}
          >
            회원탈퇴
          </button>
        </section>
      </section>
    );
  }
}
