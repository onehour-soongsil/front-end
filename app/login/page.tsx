"use client";

import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input, Space } from "antd";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Button from "../components/ui/Button";

interface Loginvalues {
  email: string;
  password: string;
}

export default function page() {
  const onFinish = async (values: Loginvalues) => {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: true,
      callbackUrl: "/goal-list",
    });
  };

  return (
    <Form
      name="normal_login"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "이메일을 입력해주세요!",
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" type="email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "비밀번호를 입력해주세요!",
          },
        ]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>

      {/* <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Link href="/">Forgot password</Link>
      </Form.Item> */}

      <Form.Item>
        <Space size={20}>
          <Button type="primary" htmlType="submit" className="bg-button-color" text="로그인" />
          <Link href="/register">
            <Button type="primary" className="bg-button-color" text="회원가입" />
          </Link>
        </Space>
      </Form.Item>
    </Form>
  );
}
