import { fetchData } from "@/util/db_community";
import Textform from "./Textform";

export default function Write(props) {
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
            <form
              action="/api/community/edit"
              method="POST"
              className="writeForm"
            >
              <h4>✍ 글수정</h4>
              <div className="postTitle">
                <span>제목 : </span>
                <input
                  type="text"
                  name="title"
                  defaultValue={dataItem.title}
                  placeholder="제목을 입력해주세요."
                  required
                  autoFocus="true"
                />
                <select name="category" className="cartegory" required>
                  <option value={"전체"}>카테고리 선택</option>
                  <option value={"질문&답변"}>질문&답변</option>
                  <option value={"모임&스터디"}>모임&스터디</option>
                </select>
              </div>
              <Textform dataItem={dataItem} />
              <input
                name="communityId"
                value={dataItem.communityId}
                style={{ display: "none" }}
              />
              <button className="formBtn">👍 작성완료</button>
            </form>
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
