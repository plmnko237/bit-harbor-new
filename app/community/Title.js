"use client";
import axios from "axios";
import Link from "next/link";

export default function Title({ dbData }) {
  return (
    <Link
      href={`/community/detail/${dbData.communityId}`}
      // onClick={() => {
      //   axios
      //     .get("https://server.bit-harbor.net/community/" + dbData.communityId)
      //     .then((r) => {
      //       console.log("Title에서 가져온거", r.data);
      //     })
      //     .catch((error) => {
      //       console.log("error내용:", error);
      //     });
      // }}
    >
      {/* 제목부분 */}
      <p>{dbData.title}</p>
    </Link>
  );
}
