"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

export default function List({ dbData, i }) {
  let [view, setview] = useState(0);
  return (
    <li className="conList" key={i}>
      <div className="conList-top">
        <Link
          prefetch={false}
          href={"/community/detail/" + dbData[i].communityId}
          onClick={() => {
            // axios
            //   .get("https://ba9b-118-32-224-80.ngrok-free.app/community/1")
            //   .then((결과) => {
            //     console.log(결과);
            //   })
            //   .catch(() => {
            //     console.log("실패함 ㅅㄱ");
            //   });
          }}
        >
          {/* 제목부분 */}
          <p>{dbData[i].title}</p>
        </Link>
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
      </div>
      <div className="conList-tag">
        {dbData[i].tags.map((a, i) => {
          return (
            <div className="tag" key={i}>
              {a}
            </div>
          );
        })}
      </div>
    </li>
  );
}
