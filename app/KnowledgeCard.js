export default function KnowledgeCard({ awsData }) {
  return (
    <div className="topCard">
      <img src="/Knowledge.png" alt="임시이미지" className="backImg" />
      <div className="txtBox">
        <h2>{awsData.data.title}</h2>
        <p>{awsData.data.body}</p>
        <div className="tagGroup"></div>
        <div className="card_detail">
          <div className="nickname">
            <img src="/user_icon.png" alt="닉네임" />
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
    </div>
  );
}
