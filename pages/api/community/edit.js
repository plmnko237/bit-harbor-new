import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);
  console.log("edit api 회원정보:", session);

  if (req.method == "POST") {
    console.log(req.body);

    if (!req.body || req.body.body === "") {
      return res.status(500).json("본문을 작성해주세요.");
    }

    try {
      req.body.memberId = session.user.memberId;

      // 전체 요청 바디를 JSON 문자열로 변환
      const result = JSON.stringify(req.body);
      console.log("4:" + result);

      const apiResponse = await fetch(
        "https://server.bit-harbor.net/community/" + req.body.communityId,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: session.user.authorization,
            refresh: session.user.refresh,
          },
          mode: "cors",
          body: result,
        }
      );
      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        console.error("API 응답 에러:", errorText);
        return res.status(apiResponse.status).json(errorText);
      }

      res.redirect(302, "/community");
    } catch (error) {
      console.error("서버 오류:", error);
      return res.status(500).json("서버 오류");
    }
  }
}
