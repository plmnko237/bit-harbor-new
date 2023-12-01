export default async function handler(req, res) {
  if (req.method == "POST") {
    if (!req.body || req.body.body === "") {
      return res.status(500).json("본문을 작성해주세요.");
    }

    try {
      const tags = req.body.tags.split(",").map((tag) => tag.trim());
      req.body.tags = tags;
      JSON.stringify(req.body.tags);
      req.body.memberId = 1;
      req.body.imgURL =
        "https://blue-space-982878.postman.co/workspace/My-Workspace~8d06542c-098f-4e52-815d-360a9893894c/folder/25528870-fb049652-edf8-4eb5-aecf-4d4ad7255c53";

      // 전체 요청 바디를 JSON 문자열로 변환
      const result = JSON.stringify(req.body);
      console.log("4:" + result);

      const apiResponse = await fetch(
        "https://4a14-118-32-224-80.ngrok-free.app/community",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
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
