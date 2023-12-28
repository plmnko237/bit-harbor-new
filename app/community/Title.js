"use client";
import axios from "axios";
import Link from "next/link";

export default function Title({ dbData, i }) {
  return (
    <Link
      href={"/community/detail/" + dbData.communityId}
      onClick={() => {
        axios
          .get(
            "http://ec2-13-125-193-97.ap-northeast-2.compute.amazonaws.com:8080/community/" +
              dbData.communityId
          )
          .then((r) => {
            console.log(r.data);
          })
          .catch((error) => {
            console.log("error내용:", error);
          });
      }}
    >
      {/* 제목부분 */}
      <p>{dbData.title}</p>
    </Link>
  );
}
