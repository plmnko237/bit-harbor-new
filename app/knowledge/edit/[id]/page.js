import { knowledgeData } from "@/util/db_knowledge";
import Textform from "./Textform";

export default function Write(props) {
  const fetchDataAndRender = async () => {
    try {
      //db게시글 불러오는 코드
      const dbData = await knowledgeData();
      //사용자가 입력한 글 주소
      const _id = props.params.id;

      // Check if id is a valid index in dbData
      if (_id >= 0 && _id <= dbData) {
        const dataItem = dbData.find((item) => item.knowledgeId == _id);

        return (
          <main>
            <form
              action="/api/knowledge/edit"
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
                  <option value={"Tech뉴스"}>Tech뉴스</option>
                  <option value={"팁"}>팁</option>
                  <option value={"칼럼"}>칼럼</option>
                  <option value={"리뷰"}>리뷰</option>
                </select>
              </div>
              <Textform dataItem={dataItem} />
              <input
                name="knowledgeId"
                value={dataItem.knowledgeId}
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
