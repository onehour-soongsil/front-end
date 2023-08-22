"use client";

import { Form, Input } from "antd";
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "../../../../public/images/Logo.png";
import Button from "../../ui/Button";
import { formItemLayout, tailFormItemLayout } from "./FormLayout";
import ModalComponent from "../../ui/modal/Modal";

interface FormValues {
  email: string;
  password: string;
  confirm: string;
  nickname: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState();

  const handleOk = () => {
    router.push("/login");
  };
  const handleCancel = () => {
    setIsSuccess(undefined);
  };

  const onFinish = (values: FormValues) => {
    axios
      .post("/api/register", values)
      .then(res => {
        setIsSuccess(res.data);
      })
      .catch(err => {
        setIsSuccess(err.response.data);
      });
  };

  return (
    <Content
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      <ModalComponent title="알림" open={isSuccess} onOk={handleOk} onCancel={handleCancel} />
      <Image src={Logo} alt="Logo" />
      <Form
        labelCol={formItemLayout.labelCol}
        wrapperCol={formItemLayout.wrapperCol}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        className="w-96"
      >
        <Form.Item
          name="email"
          label="이메일"
          rules={[
            {
              type: "email",
              message: "이메일 형식에 맞게 입력해주세요!",
            },
            {
              required: true,
              message: "이메일을 입력해주세요!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="비밀번호"
          rules={[
            {
              required: true,
              message: "비밀번호를 입력해주세요!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="비밀번호 확인"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "비밀번호와 똑같이 적어주세요!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("입력하신 비밀번호와 같지 않습니다!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="nickname"
          label="닉네임"
          tooltip="당신의 별명은?"
          rules={[
            {
              required: true,
              message: "닉네임을 입력해주세요!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={tailFormItemLayout.wrapperCol}>
          <Button
            type="primary"
            htmlType="submit"
            text="등록 완료"
            className="bg-main-color text-lg font-bold w-32 h-14"
          />
        </Form.Item>
      </Form>
    </Content>
  );
}
