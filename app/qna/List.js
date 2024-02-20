import Link from "next/link";

export default function List({ dbData, i }) {
  const hideImages = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // 이미지 태그 숨기기
    const images = doc.querySelectorAll("img");
    images.forEach((img) => {
      img.style.display = "none";
    });

    return doc.body.innerHTML;
  };
  return (
    <Link href={"/qna/detail/" + dbData.qnaId}>
      <li className="conList" key={i}>
        <div className="conList-top">
          <p>{dbData.title}</p>
          <div className="card_detail">
            <span className="category">{dbData.category}</span>
            <div className="nickname">
              <img
                src={`/user_icon${dbData.profileNum}.png`}
                alt="프로필이미지"
              />
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
        <div className="conList-body">
          <div
            dangerouslySetInnerHTML={{ __html: hideImages(dbData.body) }}
            className="listBody"
          ></div>
        </div>
      </li>
    </Link>
  );
}
