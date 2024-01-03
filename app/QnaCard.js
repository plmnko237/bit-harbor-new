export default function QnaCard({ awsData }) {
  return (
    <div className="tableCard">
      <h2>{awsData.data.title}</h2>
      <p>{awsData.data.body}</p>
      <div className="card_detail">
        <div className="nickname">
          <img src="/user_icon1.png" alt="닉네임" />
          <span>{awsData.data.userNickname}</span>
        </div>
        <div className="viewsComment">
          <div className="views">
            <img src="/view.png" alt="조회수" />
            <span>150</span>
          </div>
          <div className="comment">
            <img src="/comment.png" alt="댓글" />
            <span>20</span>
          </div>
        </div>
      </div>
    </div>
  );
}
