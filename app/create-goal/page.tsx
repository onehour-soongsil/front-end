"use client";
import { Button, Form, Input, Select } from "antd";
import React from "react";
import MyDatePicker from "../components/goal/DatePicker";
const { Option } = Select;

export default function CreateGoalPage() {
  const [form] = Form.useForm();
  const onFinish = values => {
    console.log("Received values of form: ", values);
  };
  return (
    <div>
      <h1>당신의 목표를 적어보세요!</h1>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        style={{
          width: "100%",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form.Item
          name="goal-title"
          label="목표명"
          rules={[
            {
              required: true,
              message: "목표명을 입력해주세요",
            },
          ]}
        >
          <Input placeholder="목표를 적어주세요(15자 이내)" />
        </Form.Item>

        <Form.Item
          name="goal-content"
          label="목표 가이드라인"
          rules={[
            {
              required: true,
              message: "목표 내용을 입력해주세요",
            },
          ]}
        >
          <Input placeholder="가이드라인"></Input>
        </Form.Item>

        <Form.Item name="due-date" label="시작일">
          <MyDatePicker />
        </Form.Item>

        <Form.Item name="due-date" label="종료일">
          <MyDatePicker />
        </Form.Item>
      </Form>
    </div>
  );
}
