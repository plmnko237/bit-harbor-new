"use client";
import Link from "next/link";

export default function Title({ dbData }) {
  return (
    <Link href={"/community/detail/" + dbData.communityId}>
      {/* 제목부분 */}
      <p>{dbData.title}</p>
    </Link>
  );
}
