"use client";

import { Button, Form, Input, Select, TreeSelect } from "antd";
import React, { useState } from "react";
import MyDatePicker from "../components/goal/DatePicker";
import SetDate from "../components/goal/CreateDatePicker";

const { Option } = Select;

export default function CreateGoalPage() {
  const [form] = Form.useForm();
  const [value, setValue] = useState<string>();
  const onChange = (newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };
  const treeData = [
    {
      title: "5",
      value: "1",
    },
    {
      title: "10",
      value: "2",
    },
    {
      title: "15",
      value: "2",
    },
    {
      title: "20",
      value: "2",
    },
    {
      title: "25",
      value: "2",
    },
  ];
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div>
      <Form
        form={form}
        className=""
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
        <div className="flex flex-col items-center mt-10 mb-10">
          <p className="text-2xl font-bold">새로운 목표를 추가합니다!</p>
          <p>목표를 달성하기 위한 가이드라인을 작성해주세요.</p>
        </div>

        <div>목표명</div>
        <Form.Item
          name="goal-title"
          className="w-4/6 text-red-500 placeholder-red-500"
          label=""
          rules={[
            {
              required: true,
              message: "목표명을 입력해주세요",
            },
          ]}
        >
          <Input className="" placeholder="오픽 공부 1시간" />
        </Form.Item>

        <div>가이드라인</div>
        <Form.Item
          name="goal-content"
          className="w-4/6 text-red-500 placeholder-red-500"
          label=""
          rules={[
            {
              required: true,
              message: "구체적인 실행 방법을 적어주세요",
            },
          ]}
        >
          <Input placeholder="수업 복습 20분 + 녹음 및 교정 20분 + 스크립트 암기 20분" />
        </Form.Item>
        <div>목표 횟수</div>
        <Form.Item name="due-date" label="" className="w-4/6 placeholder-red-500">
          <TreeSelect
            value={value}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            treeData={treeData}
            placeholder="Please select"
            treeDefaultExpandAll
            onChange={onChange}
          />
        </Form.Item>

        <div>기간</div>
        <Form.Item name="due-date" label="" className="">
          <SetDate />
        </Form.Item>
      </Form>
    </div>
  );
}
