"use client";
import { useState } from "react";

export default function CardDetail({ dbData, i }) {
  let [view, setView] = useState(i);

  return (
    <div className="card_detail">
      <div className="nickname">
        <img src="/user_icon.png" alt="닉네임" />
        <span>{dbData[i].userNickname}</span>
      </div>
      <div className="viewsComment">
        <div className="views">
          <img src="/view.png" alt="조회수" />
          <span>{dbData[i].view}</span>
        </div>
        <div className="comment">
          <img src="/comment.png" alt="댓글" />
          <span>{dbData[i].commentCount}</span>
        </div>
      </div>
    </div>
  );
}
