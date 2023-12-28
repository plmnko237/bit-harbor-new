import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);

  if (req.method == "POST") {
    const result = JSON.parse(req.body);

    try {
      const apiResponse = await fetch(
        "http://ec2-13-125-193-97.ap-northeast-2.compute.amazonaws.com:8080/community/" +
          result.communityId +
          "/comments",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: session.user.authorization,
            refresh: session.user.refresh,
          },
          mode: "cors",
        }
      );
      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        console.error("API 응답 에러:", errorText);
        return res.status(apiResponse.status).json(errorText);
      }

      res.status(200).json(apiResponse);
    } catch (error) {
      console.error("서버 오류:", error);
      return res.status(500).json("서버 오류");
    }
  }
}
