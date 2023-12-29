import { fetchData } from "@/util/db_community";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import dynamic from "next/dynamic";

export default async function Detail(props) {
  const EditDelBtn = dynamic(() => import("./EditDelBtn"), {
    ssr: false,
  });
  const Comment = dynamic(() => import("./Comment"), {
    ssr: false,
  });

  let session = await getServerSession(authOptions);

  //db게시글 불러오는 코드
  const dbData = await fetchData();
  //사용자가 입력한 글 주소
  const _id = props.params.id;

  if (_id >= 0 && _id <= dbData) {
    const dataItem = dbData.find(
      (item) => item.communityId === parseInt(_id, 10)
    );

    console.log("dataItem:", dataItem);
    // console.log("세션:", session);

    return (
      <main>
        <section className="detailCon">
          <div className="detail_title">
            <h4>📝 Detail</h4>
            <h2>{dataItem.title}</h2>
            <div className="crumbs">
              <span>{dataItem.postTime} 작성</span>
              <div className="card_detail">
                <div className="nickname">
                  <img src="/user_icon.png" alt="닉네임" />
                  <span>{dataItem.userNickname}</span>
                </div>
                <div className="viewsComment">
                  <div className="views">
                    <img src="/view.png" alt="조회수" />
                    <span>{dataItem.view}</span>
                  </div>
                  <div className="comment">
                    <img src="/comment.png" alt="댓글" />
                    <span>{dataItem.commentCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 내용영역 */}
          <p
            className="detailTxt"
            dangerouslySetInnerHTML={{ __html: dataItem.body }}
          ></p>
          {/* 수정, 삭제버튼 */}
          <EditDelBtn dataItem={dataItem} session={session} />
          {/* 댓글영역 */}
          <Comment dataItem={dataItem} session={session} />
        </section>
      </main>
    );
  } else {
    return (
      <main>
        <div className="loading">loading...</div>
      </main>
    );
  }
}