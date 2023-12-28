"use client";
import TopSec from "./Topsec"; //공통 top영역
import { fetchData } from "@/util/db_community";
import { useState, useEffect } from "react";
import PageNumber from "./Pagenation";
import List from "./List";

export default function Community() {
  const [dbData, setDbData] = useState([]);
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [postSize, setPostSize] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchData(page, size);
      console.log("data:", data);
      console.log("data postSize:", data[0].postSize);
      setPostSize(data[0].postSize);
      setDbData(data);
    };

    fetch();
  }, [page]);
  const handlePageChange = (pageNum) => setPage(pageNum);

  // console.log("dbData:", dbData);
  // console.log("postSize2:", postSize);

  return (
    <>
      {dbData && dbData ? (
        <main>
          <TopSec />
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
