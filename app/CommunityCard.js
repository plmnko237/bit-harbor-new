import Link from "next/link";

export default function CommunityCard({ dbData, i }) {
  return (
    <Link href={"/community/detail/" + dbData[i].communityId}>
      <div className="tableCard">
        <h2>{dbData[i].title}</h2>
        <p dangerouslySetInnerHTML={{ __html: dbData[i].body }}></p>
        <div className="card_detail">
          <div className="nickname">
            <img src="/user_icon1.png" alt="닉네임" />
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
    </Link>
  );
}
