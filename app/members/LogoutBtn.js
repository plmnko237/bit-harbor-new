"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutBtn() {
  const router = useRouter();
  return (
    <button
      className="login"
      onClick={() => {
        signOut();
        router.push("/");
      }}
    >
      <span>로그아웃</span>
    </button>
  );
}
