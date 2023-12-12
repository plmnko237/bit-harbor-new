import { fetchData } from "@/util/database";
import Link from "next/link";
import DelBtn from "./Delbtn";

export default function Detail(props) {
  const fetchDataAndRender = async () => {
    try {
      //db게시글 불러오는 코드
      const dbData = await fetchData();
      //사용자가 입력한 글 주소
      const _id = props.params.id;

      // Check if id is a valid index in dbData
      if (_id >= 0 && _id <= dbData) {
        const dataItem = dbData.find((item) => item.communityId == _id);

        return (
          <main>
            <section className="detailCon">
              <div className="detail_title">
                <h4>📝 Detail</h4>
                <h2>{dataItem.title}</h2>
                <div className="crumbs">
                  <span>
                    {dataItem.postTime === null
                      ? "오늘 " + dataItem.modifiedAt.slice(11, 16) + "분에"
                      : dataItem.postTime}{" "}
                    작성
                  </span>
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
              <div className="edit_detailTxt">
                <Link href={"../edit/" + dataItem.communityId}>글수정</Link>
                <DelBtn dataItem={dataItem} />
              </div>
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
      } else {
        // Handle the case where id is invalid
        return (
          <main>
            <p>Invalid ID</p>
          </main>
        );
      }
    } catch (error) {
      console.error("Error rendering page:", error);
      return (
        <main>
          <p>Error rendering page</p>
        </main>
      );
    }
  };

  return fetchDataAndRender();
}
