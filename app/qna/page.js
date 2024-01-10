"use client";
import { useState, useEffect } from "react";
import PageNumber from "./Pagenation";
import List from "./List";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Qna() {
  const [dbData, setDbData] = useState([]);
  const [page, setPage] = useState(1);
  const size = 10;
  const [postSize, setPostSize] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("전체");
  const [word, setWord] = useState("");
  const [searchWord, setSearchWord] = useState([]);
  const session = useSession();
  const router = useRouter();

  // 데이터 가져오는 함수
  const fetchData = async (apiUrl) => {
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      });

      if (response.status === 200) {
        const result = await response.json();
        const getData = result.data;
        console.log("목록", getData);
        const pageInfo = result.pageInfo;
        setPostSize(pageInfo.totalElements);
        setDbData(getData);
      } else {
        console.error("Failed to fetch data. Status:", response.status);
        setDbData([]);
        setPostSize(0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setDbData([]);
      setPostSize(0);
    }
  };

  // 페이지 로딩 시 또는 카테고리 변경 시 데이터 가져오기
  useEffect(() => {
    let apiUrl;

    console.log("카테고리:", currentCategory);
    if (currentCategory === "전체") {
      apiUrl = `https://server.bit-harbor.net/qna?page=${page}&size=${size}`;
    } else {
      apiUrl = `https://server.bit-harbor.net/qna/category?page=${page}&size=${size}&category=${currentCategory}`;
    }

    fetchData(apiUrl);
  }, [page, currentCategory]);

  // 카테고리 검색 결과가 있을 때 처리
  useEffect(() => {
    if (searchWord.length > 0) {
      const newData = [...searchWord];
      setPostSize(newData[0]?.postSize || 0);
      setDbData(newData);
    }
  }, [searchWord]);

  // 페이지 변경 처리
  const handlePageChange = (pageNum) => setPage(pageNum);

  // 카테고리 변경 처리
  const handleCategoryChange = (category) => setCurrentCategory(category);

  // 검색 결과 처리
  const handleSearchChange = (getData) => {
    setSearchWord(getData);
  };

  // 검색 처리
  const handleSearch = () => {
    const apiUrl = `https://server.bit-harbor.net/qna/search?page=0&size=10&keyword=${word}`;
    fetchData(apiUrl);
  };

  return (
    <>
      {dbData ? (
        <main>
          <div className="topSec">
            <h2>Q&A</h2>
            <p>당신의 지식을 공유하고 새로운 아이디어를 얻어보세요.</p>
            <div className="topSec_detail">
              <div className="secMenu">
                {["전체", "기술", "커리어", "기타"].map((category, i) => (
                  <span
                    key={i}
                    className={currentCategory === category ? "tabActive" : ""}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </span>
                ))}
              </div>
              <div className="searchBar">
                <input
                  type="text"
                  name="search"
                  autoFocus={true}
                  placeholder="검색어를 입력해주세요."
                  autoComplete="off"
                  onChange={(e) => setWord(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
                <button onClick={handleSearch}>
                  <img src="/search.png" alt="검색" />
                </button>
              </div>

              <div
                className="writeBtn"
                onClick={() => {
                  if (session.data == null) {
                    alert("로그인해주세요.");
                  } else {
                    router.push("/qna/write");
                  }
                }}
              >
                <img src="/pen.png" />
                글쓰기
              </div>
            </div>
          </div>
          <div className="container">
            <ul>
              {dbData.map((item, i) => (
                <List key={i} dbData={item} />
              ))}
            </ul>
          </div>
          <PageNumber
            postSize={postSize}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </main>
      ) : (
        <div className="loading">loading...</div>
      )}
    </>
  );
}
