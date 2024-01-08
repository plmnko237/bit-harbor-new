"use client";
import { useRouter } from "next/navigation";

export default function EditDelBtn({ dataItem, session }) {
  let router = useRouter();
  if (dataItem) {
    return (
      <div className="edit_detailTxt">
        <button
          className="delBtn"
          onClick={(e) => {
            e.preventDefault();
            if (session == null || session == undefined) {
              alert("로그인 해주세요.");
              router.push("/members");
            } else if (session.user.memberId !== dataItem.memberId) {
              alert("본인이 작성한 글만 수정할 수 있습니다.");
            } else if (session.user.memberId == dataItem.memberId) {
              router.push("../edit/" + dataItem.communityId);
            }
          }}
        >
          글수정
        </button>
        <button
          className="delBtn"
          onClick={(e) => {
            e.preventDefault();
            if (session == null || session == undefined) {
              alert("로그인 해주세요.");
              router.push("/members");
            } else if (session.user.memberId !== dataItem.memberId) {
              alert("본인이 작성한 글만 삭제할 수 있습니다.");
            } else if (session.user.memberId === dataItem.memberId) {
              confirm("정말로 삭제하시겠습니까?");
              fetch("/api/qna/delete", {
                method: "POST",
                body: JSON.stringify(dataItem),
              }).then(() => {
                router.refresh();
                setTimeout(() => {
                  router.push("/qna");
                }, 500);
              });
            }
          }}
        >
          삭제하기
        </button>
      </div>
    );
  } else {
    return <div className="loading">loading...</div>;
  }
}
