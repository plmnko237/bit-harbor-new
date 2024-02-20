export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const result = await fetch(process.env.BACK_END_DOMAIN_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(req.body),
      });

      if (!result.ok) {
        const errorText = await result.text();
        console.error("API 응답 에러:", errorText);
        return res.status(result.status).json(errorText);
      }

      // 응답 데이터 확인
      const responseData = await result.text();

      // 응답이 비어 있다면 에러 처리
      if (!responseData) {
        console.error("API 응답 에러: 서버에서 유효한 JSON을 반환하지 않음1");
        return res.status(500).json("서버 오류");
      }

      // 로그인한 사용자의 정보
      let userData = JSON.parse(responseData);

      if (!userData || !userData.token) {
        console.error("API 응답 에러: 서버에서 유효한 JSON을 반환하지 않음2");
        return res.status(500).json("서버 오류");
      }

      // 토큰을 클라이언트에게 전달
      res.status(200).json({ token: userData.token });
    } catch (error) {
      console.error("서버 오류:", error);
      res.status(500).json("서버 오류");
    }
  }
}
