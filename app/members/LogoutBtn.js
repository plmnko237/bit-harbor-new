"use client";
import { signOut } from "next-auth/react";

export default function LogoutBtn() {
  return (
    <button className="login" onClick={() => signOut()}>
      <span>로그아웃</span>
    </button>
  );
}
