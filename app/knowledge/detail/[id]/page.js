import { knowledgeData } from "@/util/db_knowledge";
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
  const Crumb = dynamic(() => import("./Crumb"), {
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
  let page = Math.abs(Math.ceil((postSize - _id + 1) / size));
  const dbData = await knowledgeData(page, size);
  const dataItem = dbData.find((item) => item.knowledgeId == _id);

  if (dataItem) {
    return (
      <main>
        <section className="detailCon">
          <div className="detail_title">
            <h4>📝 Detail • {dataItem.category}</h4>
            <h2>{dataItem.title}</h2>
            <Crumb dataItem={dataItem} />
          </div>
          {/* 내용영역 */}
          <p
            className="detailTxt"
            dangerouslySetInnerHTML={{ __html: dataItem.body }}
          ></p>
          {/* 수정, 삭제버튼 */}
          {session ? <EditDelBtn dataItem={dataItem} session={session} /> : ""}
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
