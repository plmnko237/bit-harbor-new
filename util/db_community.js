let dbData;

export const fetchData = async (page = 1, size = 10) => {
  try {
    const response = await fetch(
      `https://server.bit-harbor.net/community?page=${page}&size=${size}`,
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
      //console.log("Fetched data:", result.data);
      dbData = result.data; // dbData에 데이터를 할당
      return dbData;
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

export default dbData;
