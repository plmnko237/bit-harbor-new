import { knowledgeData } from "@/util/db_knowledge";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import dynamic from "next/dynamic";
import Link from "next/link";

export default async function Detail(props) {
  const EditDelBtn = dynamic(() => import("./EditDelBtn"), {
    ssr: false,
  });
  const Comment = dynamic(() => import("./Comment"), {
    ssr: false,
  });
  let session = await getServerSession(authOptions);

  //전체 게시물 개수 가져오기
  let postSize;
  let getPost = await fetch(
    "https://server.bit-harbor.net/knowledge?page=1&size=1",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    }
  )
    .then((r) => r.json())
    .then((result) => {
      postSize = result.pageInfo.totalElements;
    });

  //사용자가 입력한 글 주소
  const _id = props.params.id;

  //db게시글 불러오는 코드
  const size = 10;
  let page = Math.ceil((postSize - _id + 1) / size);
  const dbData = await knowledgeData(page, size);
  const dataItem = dbData.find((item) => item.knowledgeId == _id);

  if (dataItem) {
    return (
      <main>
        <section className="detailCon">
          <div className="detail_title">
            <h4>📝 Detail • {dataItem.category}</h4>
            <h2>{dataItem.title}</h2>
            <div className="crumbs">
              <span>{dataItem.postTime} 작성</span>
              <div className="card_detail">
                <div className="nickname">
                  <img src="/user_icon1.png" alt="닉네임" />
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
          {/* 게시판으로 돌아가는 링크 */}
          {/* <div className="detail-pager">
            <Link
              className="prev"
              href={`/knowledge?page=${page}&size=${size}`}
            >
              <img src="/navigate_before.svg" />
              게시판으로 돌아가기
            </Link>
          </div> */}
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
