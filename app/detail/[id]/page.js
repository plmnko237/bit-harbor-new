export default function Detail() {
  return (
    <main>
      <section className="detailCon">
        <div className="detail_title">
          <h4>📝 Detail</h4>
          <h2>글제목</h2>
          <div className="crumbs">
            <span>2023.11.10 작성</span>
            <div className="card_detail">
              <div className="nickname">
                <img src="/user_icon.png" alt="닉네임" />
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
        </div>
        {/* 내용영역 */}
        <p className="detailTxt">이 편지는 영국에서 시작되어...</p>
        {/* 댓글영역 */}
        <section className="detailComments">
          <h4>💬 Comments</h4>
          <div className="commit">
            <div className="crumbs">
              <div className="card_detail">
                <div className="nickname">
                  <img src="/user_icon.png" alt="닉네임" />
                  <span>닉네임</span>
                </div>
              </div>
              <span>2023.11.10 작성</span>
            </div>
            {/* 댓글내용 */}
            <p>아니 행운의 편지가 여기서 왜 나와요</p>
          </div>
        </section>
      </section>
    </main>
  );
}
