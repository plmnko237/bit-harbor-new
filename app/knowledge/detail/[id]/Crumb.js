export default async function Crumb({ dataItem }) {
  let viewCount;
  let fetchData = await fetch(
    "https://server.bit-harbor.net/knowledge/" + dataItem.knowledgeId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    }
  )
    .then((r) => r.json())
    .then((result) => (viewCount = result.data.view));

  return (
    <div className="crumbs">
      <span>{dataItem.postTime} 작성</span>
      <div className="card_detail">
        <div className="nickname">
          <img
            src={`/user_icon${dataItem.profileNum}.png`}
            alt="프로필이미지"
          />
          <span>{dataItem.userNickname}</span>
        </div>
        <div className="viewsComment">
          <div className="views">
            <img src="/view.png" alt="조회수" />
            <span>{viewCount}</span>
          </div>
          <div className="comment">
            <img src="/comment.png" alt="댓글" />
            <span>{dataItem.commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
