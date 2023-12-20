let member;

export const membersData = async () => {
  try {
    const response = await fetch(
      "http://ec2-13-125-193-97.ap-northeast-2.compute.amazonaws.com:8080/members",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        cache: "no-store",
      }
    );

    if (response.status === 200) {
      const result = await response.json();
      let member = result.data; // member 데이터를 할당
      return member;
    } else {
      console.error("Failed to fetch data. Status:", response.status);
      member = null; // 에러 발생 시 member null로 설정
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    member = null; // 에러 발생 시 member null로 설정
    return null;
  }
};

export default member;
