"use client";
import { fetchData } from "@/util/db_community";
import { useState, useEffect } from "react";
import PageNumber from "./Pagenation";
import List from "./List";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Community() {
  const [dbData, setDbData] = useState([]);
  const [page, setPage] = useState(1);
  const size = 10;
  const [postSize, setPostSize] = useState(0);
  const [searchCategory, setSearchCategory] = useState([]);
  const [allData, setAllData] = useState([]);
  const [word, setWord] = useState("");
  const [searchWord, setSearchWord] = useState([]);
  let session = useSession();
  let router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchData(page, size);
      setPostSize(data[0].postSize);
      setDbData(data);
      setAllData(data);
    };

    fetch();
  }, [page]);
  useEffect(() => {
    if (searchCategory.length > 0) {
      let newData = [...searchCategory];
      setPostSize(newData[0]?.postSize || 0);
      setDbData(newData);
    }
  }, [searchCategory]);

  const handlePageChange = (pageNum) => setPage(pageNum);

  //카테고리별 게시물
  const handleCategoryChange = (category) => {
    category = category.replace("&", "%26");

    fetch(
      `https://server.bit-harbor.net/community/category?page=0&size=10&category=${category}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    )
      .then((r) => r.json())
      .then((result) => {
        let searchData = result.data;
        setSearchCategory(searchData);
      });
  };

  //검색 게시물
  const handleSearchChange = (getData) => {
    setSearchWord(getData);
    let newData = [...searchWord];
    setPostSize(newData[0]?.postSize || 0);
    setDbData(newData);
  };
  const handleSearch = () => {
    fetch(
      `https://server.bit-harbor.net/community/search?page=0&size=10&keyword=${word}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    )
      .then((r) => r.json())
      .then((result) => {
        let searchData = result.data;
        handleSearchChange(searchData);
      });
  };
  return (
    <>
      {dbData ? (
        <main>
          <div className="topSec">
            <h2>커뮤니티</h2>
            <p>당신의 지식을 공유하고 새로운 아이디어를 얻어보세요.</p>
            <div className="topSec_detail">
              <div className="secMenu">
                <span onClick={() => handleCategoryChange("전체")}>전체</span>
                <span onClick={() => handleCategoryChange("질문&답변")}>
                  질문&amp;답변
                </span>
                <span onClick={() => handleCategoryChange("모임&스터디")}>
                  모임&amp;스터디
                </span>
              </div>
              <div className="searchBar">
                <input
                  type="text"
                  name="search"
                  autoFocus="true"
                  placeholder="검색어를 입력해주세요."
                  autoComplete="off"
                  onChange={(e) => setWord(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
                <button onClick={() => handleSearch}>
                  <img src="/search.png" alt="검색" />
                </button>
              </div>

              <div
                className="writeBtn"
                onClick={() => {
                  if (session.data == null) {
                    alert("로그인해주세요.");
                  } else {
                    router.push("/community/write");
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
              {dbData &&
                dbData.map((item, i) => <List dbData={item} key={i} />)}
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
