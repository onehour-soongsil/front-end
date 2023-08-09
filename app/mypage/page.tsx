"use client";

import { useSession } from "next-auth/react";

export default function MyPage() {
  const session = useSession();

  return (
    <div className="h-screen flex justify-center items-center">
      <h1>{session && session.data?.user.nickname}님의 마이페이지 입니다</h1>
    </div>
  );
}
