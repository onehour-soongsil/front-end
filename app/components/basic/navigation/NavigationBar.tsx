"use client";

import Link from "next/link";
import { Layout, Space } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Button from "../../ui/Button";
import Logo from "../../../../public/images/Logo.png";

const { Header } = Layout;

export default function NavigationBar() {
  const session = useSession();

  return (
    <Header className="flex justify-between items-center bg-white border-b-4 fixed top-0 left-0 right-0 z-10 py-10">
      <Link href="/">
        <Image src={Logo} alt="logo" width={200} height={200} className="translate-y-5" />
      </Link>
      <Space>
        {session.status === "authenticated" ? (
          <>
            <Link href="/mypage">
              <Button
                className="bg-main-color text-lg font-bold w-32 h-14"
                type="primary"
                text="마이페이지"
              />
            </Link>

            <Button
              className="bg-main-color text-lg font-bold w-32 h-14"
              type="primary"
              onClick={() => signOut({ callbackUrl: "/" })}
              text="로그아웃"
            />
          </>
        ) : (
          <>
            <Button
              className="bg-main-color text-lg font-bold w-32 h-14"
              type="primary"
              onClick={signIn}
              text="로그인"
            />
            <Link href="/register">
              <Button
                className="bg-main-color text-lg font-bold w-32 h-14"
                type="primary"
                text="회원가입"
              />
            </Link>
          </>
        )}
      </Space>
    </Header>
  );
}
