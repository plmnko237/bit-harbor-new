let dbData;

export const fetchData = async () => {
  try {
    const response = await fetch(
      "https://ba9b-118-32-224-80.ngrok-free.app/community",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        mode: "cors",
        cache: "no-store",
      }
    );

    if (response.status === 200) {
      const result = await response.json();
      const reversedData = result.data.reverse(); // 데이터를 역순으로 정렬
      //console.log("Fetched data:", reversedData); // 데이터를 콘솔에 출력
      dbData = reversedData; // dbData에 데이터를 할당
      return reversedData;
    } else {
      console.error("Failed to fetch data. Status:", response.status);
      dbData = null; // 에러 발생 시 dbData를 null로 설정
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    dbData = null; // 에러 발생 시 dbData를 null로 설정
    return null;
  }
};

//await fetchData();

export default dbData;
