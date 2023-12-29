"use client";
import React from "react";

const PageNumber = ({ postSize, currentPage, onPageChange }) => {
  // 페이지 수 계산
  const pageCount = Math.ceil(postSize / 10);
  console.log("postSize", postSize);

  // 페이지 번호 배열 생성
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className="pager">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        //disabled={currentPage === 1}
      >
        <img src="/navigate_before.png" alt="이전" />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default PageNumber;
