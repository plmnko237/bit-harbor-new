import dynamic from "next/dynamic";

export default function List({ dbData, i }) {
  const Title = dynamic(() => import("./Title"), {
    ssr: false,
  });

  return (
    <li className="conList" key={i}>
      <div className="conList-top">
        <Title dbData={dbData} i={i} />
        <div className="card_detail">
          <div className="nickname">
            <img src="/user_icon.png" alt="닉네임" />
            <span>{dbData.userNickname}</span>
          </div>
          <div className="viewsComment">
            <div className="views">
              <img src="/view.png" alt="조회수" />
              <span>{dbData.view}</span>
            </div>
            <div className="comment">
              <img src="/comment.png" alt="댓글" />
              <span>{dbData.commentCount}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="conList-tag">
        {dbData[i] &&
          dbData[i].tags.map((a, i) => {
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
