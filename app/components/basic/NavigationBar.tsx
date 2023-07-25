"use client";

import Link from "next/link";
import { Layout, Space } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "../ui/Button";

const { Header } = Layout;

const headerStyle = {
  backgroundColor: "inherit",
  borderBottom: "2px solid black",
  display: "flex",
  justifyContent: "space-between",
  alignItem: "center",
};

export default function NavigationBar() {
  const session = useSession();

  return (
    <Header style={headerStyle}>
      <Link href="/">ONE HOURS</Link>
      <Space>
        {session.status === "authenticated" ? (
          <Button type="primary" danger onClick={signOut} text="LOGOUT" />
        ) : (
          <Button type="primary" danger={false} onClick={signIn} text="LOGIN" />
        )}
        <Link href="/register">REGISTER</Link>
      </Space>
    </Header>
  );
}
