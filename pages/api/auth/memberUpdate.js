import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    let memberId = req.body.memberId;

    let member = {
      password: req.body.password,
      checkPassword: req.body.checkPassword,
      currentPassword: req.body.currentPassword,
      userName: req.body.userName,
      userNickname: req.body.userNickname,
      phoneNumber: req.body.phoneNumber,
      profileNum: req.body.profileNum,
    };

    let changeInfo = JSON.stringify(member);

    try {
      const result = await fetch(
        process.env.BACK_END_DOMAIN_MEMBER_UPDATE + memberId,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: session.user.authorization,
          },
          mode: "cors",
          body: changeInfo,
        }
      );

      if (!result.ok) {
        const errorText = await result.text();
        console.error("API 응답 에러:", errorText);
        return res.status(result.status).json(errorText);
      }

      // 응답 데이터 확인
      const responseData = await result.json();

      // 응답이 비어 있다면 에러 처리
      if (!responseData) {
        console.error("API 응답 에러: 서버에서 유효한 JSON을 반환하지 않음1");
        return res.status(500).json("서버 오류");
      }
      res.status(200).json({ responseData, session });
    } catch (error) {
      console.error("서버 오류:", error);
      res.status(500).json("서버 오류");
    }
  }
}
