"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutBtn() {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <button
      className="login"
      onClick={() => {
        signOut();
        console.log("로그아웃", session.user);
        sessionStorage.clear();
        localStorage.clear();
        router.push("/members");
      }}
    >
      <span>로그아웃</span>
    </button>
  );
}
