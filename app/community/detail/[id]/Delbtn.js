"use client";
import { useRouter } from "next/navigation";

export default function DelBtn({ dataItem }) {
  let router = useRouter();
  return (
    <button
      className="delBtn"
      onClick={() => {
        confirm("정말로 삭제하시겠습니까?");
        fetch("/api/community/delete", {
          method: "POST",
          body: JSON.stringify(dataItem),
        }).then(() => {
          router.refresh();
          setTimeout(() => {
            router.push("/community");
          }, 500);
        });
      }}
    >
      삭제하기
    </button>
  );
}
