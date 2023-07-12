"use client";

import Link from "next/link";
import { Layout, Space } from "antd";

const { Header } = Layout;

const headerStyle = {
  backgroundColor: "inherit",
  borderBottom: "2px solid black",
  display: "flex",
  justifyContent: "space-between",
  alignItem: "center",
};

export default function NavigationBar() {
  return (
    <Header style={headerStyle}>
      <Link href="/">ONE HOURS</Link>
      <Space>
        <Link href="/login">LOGIN</Link>
        <Link href="/register">REGISTER</Link>
      </Space>
    </Header>
  );
}
