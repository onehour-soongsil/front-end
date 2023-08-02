"use client";

import React from "react";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

export default function BackgroundLayout({ children }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Content>
        <Layout
          style={{
            background: colorBgContainer,
            minHeight: 900,
          }}
        >
          <Content>{children}</Content>
        </Layout>
      </Content>
    </Layout>
  );
}
