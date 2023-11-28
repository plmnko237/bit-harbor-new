// const [awsData, setAwsData] = useState(null);

// useEffect(() => {
//   // AWS 서버로부터 데이터 가져오기
//   const fetchData = async () => {
//     try {
//       const response = fetch(
//         "https://1061-118-32-224-80.ngrok-free.app/community/1",
//         {
//           method: "GET", // 또는 다른 HTTP 메서드
//           headers: {
//             "Content-Type": "application/json",
//             "ngrok-skip-browser-warning": "69420",
//           },
//         }
//       );
//       const data = await response.json();
//       setAwsData(data);
//     } catch (error) {
//       console.error("Error fetching data from AWS server:", error);
//     }
//   };

//   fetchData();
// }, []);

// if (!awsData) {
//   return <div>Loading...</div>;
// }
// export default awsData;
