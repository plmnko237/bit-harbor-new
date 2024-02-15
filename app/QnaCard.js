"use client";
import Link from "next/link";

export default function QnaCard({ qna, i }) {
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
    <Link href={"/qna/detail/" + qna[i].qnaId}>
      <div className="tableCard">
        <h2>{qna[i].title}</h2>
        <div className="card_contents">
          <p dangerouslySetInnerHTML={{ __html: hideImages(qna[i].body) }}></p>
        </div>
        <div className="card_detail">
          <div className="nickname">
            <img src="/user_icon1.png" alt="닉네임" />
            <span>{qna[i].userNickname}</span>
          </div>
          <div className="viewsComment">
            <div className="views">
              <img src="/view.png" alt="조회수" />
              <span>{qna[i].view}</span>
            </div>
            <div className="comment">
              <img src="/comment.png" alt="댓글" />
              <span>{qna[i].commentCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
