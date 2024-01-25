"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function KnowledgeCard({ knowledge, i }) {
  const [imgdata, setImgdata] = useState([]);

  const hideImages = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // 이미지 태그 숨기기
    const images = doc.querySelectorAll("img");
    images.forEach((img) => {
      img.style.display = "none";
    });

    return doc.body.innerHTML;
  };

  return (
    <Link href={"/knowledge/detail/" + knowledge[i].knowledgeId}>
      <div className="topCard">
        <img src={knowledge[i].imgURL} alt="대표이미지" className="backImg" />
        <div className="txtBox">
          <h2>{knowledge[i].title}</h2>
          <p
            dangerouslySetInnerHTML={{ __html: hideImages(knowledge[i].body) }}
          ></p>
          <div className="tagGroup"></div>
          <div className="card_detail">
            <div className="nickname">
              <img src="/user_icon1.png" alt="닉네임" />
              <span>{knowledge[i].userNickname}</span>
            </div>
            <div className="viewsComment">
              <div className="views">
                <img src="/view.png" alt="조회수" />
                <span>{knowledge[i].view}</span>
              </div>
              <div className="comment">
                <img src="/comment.png" alt="댓글" />
                <span>{knowledge[i].commentCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
