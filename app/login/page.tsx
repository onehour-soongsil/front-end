"use client";

import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input, Space } from "antd";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Content } from "antd/es/layout/layout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../components/ui/Button";
import Logo from "../../public/images/Logo.png";

interface Loginvalues {
  email: string;
  password: string;
}

export default function Page() {
  const router = useRouter();

  const onFinish = async (values: Loginvalues) => {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (result.status === 401) {
      alert("아이디 혹은 비밀번호가 일치하지 않습니다!");
    } else {
      router.push("/");
    }
  };

  return (
    <Form
      className="bg-cover bg-center"
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
        backgroundImage: "url('/images/background.png')",
      }}
    >
      <Image src={Logo} alt="Logo" width={200} height={200} />
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
          <Button
            className="bg-main-color text-lg font-bold w-32 h-14"
            type="primary"
            text="로그인"
            htmlType="submit"
          />
          <Link href="/register">
            <Button
              className="bg-main-color text-lg font-bold w-32 h-14"
              type="primary"
              text="회원가입"
            />
          </Link>
        </Space>
      </Form.Item>
    </Form>
  );
}
