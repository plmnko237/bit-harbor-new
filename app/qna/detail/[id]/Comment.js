"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Comment({ dataItem, session }) {
  let router = useRouter();
  let [content, setContent] = useState("");
  let [comment, setComment] = useState([]);
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://server.bit-harbor.net/qna/${dataItem.qnaId}/comments`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      );

      const result = await response.json();

      // 상태 업데이트
      setComment(result.data.comments);
    } catch (error) {
      console.error("댓글 불러오기 오류:", error);
      // 에러 처리를 추가할 수 있습니다.
    }
  };

  useEffect(() => {
    // 페이지 로드 시 댓글 불러오기
    fetchComments();
  }, [dataItem.qnaId, session]);

  console.log(session);
  console.log(comment);

  return (
    <section className="detailComments">
      <h4>💬 Comments</h4>
      {comment.length > 0 ? (
        comment.map((a, i) => (
          <div className="commit" key={i}>
            <div className="crumbs">
              <div className="card_detail">
                <div className="nickname">
                  <img
                    src={`/user_icon${comment[i].profileNum}.png`}
                    alt="프로필이미지"
                  />
                  <span>{comment[i].nickName}</span>
                  <span className="commit_time">
                    {"⏱ " + comment[i].postTime + "에 작성"}
                  </span>
                </div>
              </div>
              {session && session.user.nickName === comment[i].nickName ? (
                <div className="edit_del">
                  <div
                    onClick={() => {
                      setEditingCommentIndex(i);
                      setEditedCommentContent(comment[i].content);
                    }}
                  >
                    수정
                  </div>
                  <span>|</span>
                  <div
                    onClick={async (e) => {
                      try {
                        await fetch(
                          `https://server.bit-harbor.net/qna/${dataItem.qnaId}/comment/${comment[i].commentId}`,
                          {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                              authorization: session.user.authorization,
                              refresh: session.user.refresh,
                            },
                            mode: "cors",
                            body: JSON.stringify({
                              content: editedCommentContent,
                            }),
                          }
                        );
                        const updatedComments = comment.filter(
                          (_, index) => index !== i
                        );
                        setComment(updatedComments);
                      } catch {
                        console.error("댓글 삭제 오류:", error);
                      }
                    }}
                  >
                    삭제
                  </div>
                </div>
              ) : null}
            </div>
            {editingCommentIndex === i ? (
              <div className="edit_comment">
                <input
                  className="edit_input"
                  type="text"
                  value={editedCommentContent}
                  onChange={(e) => setEditedCommentContent(e.target.value)}
                />
                <button
                  className="delBtn"
                  onClick={async () => {
                    try {
                      // 수정된 댓글을 서버에 업데이트
                      await fetch(
                        `https://server.bit-harbor.net/qna/${dataItem.qnaId}/comment/${comment[i].commentId}`,
                        {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json",
                            authorization: session.user.authorization,
                            refresh: session.user.refresh,
                          },
                          mode: "cors",
                          body: JSON.stringify({
                            content: editedCommentContent,
                          }),
                        }
                      );
                      // 서버에서 수정된 댓글 다시 불러오기
                      fetchComments();
                      // 수정 상태 초기화
                      setEditingCommentIndex(null);
                      setEditedCommentContent("");
                    } catch (error) {
                      console.error("댓글 수정 오류:", error);
                      // 에러 처리를 추가할 수 있습니다.
                    }
                  }}
                >
                  저장
                </button>
              </div>
            ) : (
              <div className="commitTxt">{comment[i].content}</div>
            )}
          </div>
        ))
      ) : (
        <div className="commit">댓글이 없습니다.</div>
      )}
      <div className="commentInput">
        <input
          defaultValue={content}
          placeholder="댓글을 남겨보세요."
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <button
          className="delBtn"
          onClick={async () => {
            if (session && session.user) {
              if (content.trim() === "") {
                alert("댓글을 작성해 주세요.");
              } else {
                try {
                  // 새로운 댓글 서버에 등록
                  await fetch(
                    `https://server.bit-harbor.net/qna/${dataItem.qnaId}/comment`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        authorization: session.user.authorization,
                        refresh: session.user.refresh,
                      },
                      mode: "cors",
                      body: JSON.stringify({
                        content: content,
                      }),
                    }
                  );
                  // 새로운 댓글 추가 후 서버에서 댓글 다시 불러오기
                  fetchComments();
                } catch (error) {
                  console.error("댓글 등록 오류:", error);
                  // 에러 처리를 추가할 수 있습니다.
                }
              }
            } else {
              alert("로그인이 필요합니다.");
              router.push("/members");
            }
          }}
        >
          등록
        </button>
      </div>
    </section>
  );
}
