export default async function handler(req, res) {
  if (req.method == "POST") {
    console.log("데이터 잘왔다 : " + req.body);

    try {
      req.body.profileNum = 1;
      const result = JSON.stringify(req.body);
      console.log(result);

      const apiResponse = await fetch("https://server.bit-harbor.net/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: result,
      });
      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        console.error("API 응답 에러:", errorText);
        return res.status(apiResponse.status).json(errorText);
      }

      res.status(200).json("회원가입이 완료되었습니다.");
    } catch (error) {
      console.error("서버 오류:", error);
      return res.status(500).json("서버 오류");
    }

    res.redirect(302, "/members");
  }
}
