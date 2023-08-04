"use client";

import axios from "axios";
import { Button, Form, Input, Select, TreeSelect } from "antd";
import React, { useState } from "react";
import MyDatePicker from "../components/goal/DatePicker";
import SetDate from "../components/goal/CreateDatePicker";

const { Option } = Select;

interface FormValue {
  title: string;
}

export default function CreateGoalPage() {
  const [form] = Form.useForm();
  const [value, setValue] = useState<string>();

  const onChange = (values: FormValue) => {
    axios
      .post("/api/create-goal", values)
      .then(res => {
        setValue(res.data);
        setTimeout(() => {
          setValue(undefined);
        }, 4000);
      })
      .catch(err => {
        setValue(err.response.data);
        setTimeout(() => {
          setValue(undefined);
        }, 4000);
      });
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

  return (
    <div>
      <Form
        form={form}
        className="flex flex-col justify-center items-center h-screen"
        name="register"
        onChange={onChange}
      >
        <div className="flex flex-col items-center mt-10 mb-10">
          <p className="text-6xl font-bold">새로운 목표를 추가합니다!</p>
          <p className="text-2xl">목표를 달성하기 위한 가이드라인을 작성해주세요.</p>
        </div>

        <Form.Item
          name="goal-title"
          className="w-4/6"
          label=""
          rules={[
            {
              required: true,
              message: "목표명을 입력해주세요",
            },
          ]}
        >
          <div className="text-4xl mb-2">목표명</div>
          <Input className="" placeholder="오픽 공부 1시간" />
        </Form.Item>

        <Form.Item
          name="goal-content"
          className="w-4/6"
          label=""
          rules={[
            {
              required: true,
              message: "구체적인 실행 방법을 적어주세요",
            },
          ]}
        >
          <div className="text-4xl mb-2">가이드라인</div>
          <Input placeholder="수업 복습 20분 + 녹음 및 교정 20분 + 스크립트 암기 20분" />
        </Form.Item>

        <Form.Item name="count" label="" className="w-4/6">
          <div className="text-4xl mb-2">목표횟수</div>
          <TreeSelect
            value={value}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            treeData={treeData}
            placeholder="Please select"
            treeDefaultExpandAll
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item name="due-date" label="" className="w-4/6">
          <div className="text-4xl mb-2">기간</div>
          <SetDate />
        </Form.Item>

        <Form.Item name="" label="" className="">
          <Button type="primary" htmlType="submit" className="bg-black">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
