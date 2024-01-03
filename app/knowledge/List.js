export default function List() {
  return (
    <li className="conList">
      <div className="conList-top">
        <p>10일안에 홈페이지 완성하는 꿀같은 프레임워크 추천</p>
        <div className="card_detail">
          <div className="nickname">
            <img src="/user_icon1.png" alt="닉네임" />
            <span>닉네임</span>
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
      <div className="conList-tag">
        <div className="tag">#tag</div>
        <div className="tag">#tag</div>
        <div className="tag">#tag</div>
      </div>
    </li>
  );
}
