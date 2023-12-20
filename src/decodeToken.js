const jwt = require("jsonwebtoken");
jwt.sign(payload, secretKey, option);

const token =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJBRE1JTiIsIk1FTUJFUiJdLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsIm1lbWJlcklkIjoyLCJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MDI2MjkxNjEsImV4cCI6ODk2MDIyOTE2MX0.-0-lRs5f43wZsUN8MdlDDmCd3bjx1HP9gQCIwXqRDdQ"; // 여기에 실제로 사용 중인 JWT 토큰을 넣어주세요.

// JWT 디코딩
const decodedToken = jwt.decode(token, { complete: true });
// 디코딩된 객체에서 사용자 ID 사용
const userId = decodedToken.memberID;

console.log("User ID:", userId);

// 헤더, 페이로드, 시그니처 출력
console.log("Header:", decodedToken.header);
console.log("Payload:", decodedToken.payload);
console.log("Signature:", decodedToken.signature);

// 페이로드에 저장된 사용자 정보 확인
console.log("User Info:", decodedToken.payload);
