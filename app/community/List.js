"use client";
export default function List({ dbData, i }) {
  return (
    <li className="conList" key={i}>
      <div className="conList-top">
        <p>{dbData[i].title}</p>
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
              {dbData[i].tags[i]}
            </div>
          );
        })}
      </div>
    </li>
  );
}
