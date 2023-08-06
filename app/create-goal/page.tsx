"use client";

import axios from "axios";
import { Button, Form, Input, Select, TreeSelect, DatePicker } from "antd";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import MyDatePicker from "../components/goal/DatePicker";
import SetDate from "../components/goal/CreateDatePicker";

const { Option } = Select;
const { RangePicker } = DatePicker;
type RangeValue = [Dayjs | null, Dayjs | null] | null;

interface FormValue {
  goalTitle: string;
  // goalImage: string;
  goalDescription: string;
  dueDate: number;
  totalGoalRounds: number;
}

export default function CreateGoalPage() {
  const [dates, setDates] = useState<RangeValue>(null);

  const disabledDate = (current: Dayjs) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") >= 31;
    const tooEarly = dates[1] && dates[1].diff(current, "days") >= 31;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  const [form] = Form.useForm();
  const [value, setValue] = useState<string>();

  const onFinish = (values: FormValue) => {
    console.log("post되는 form데이터", values);

    axios
      .post("/api/goal/create-goal", {
        ...values,
        isFinished: false,
      })
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
      value: "5",
    },
    {
      title: "10",
      value: "10",
    },
    {
      title: "15",
      value: "15",
    },
    {
      title: "20",
      value: "20",
    },
    {
      title: "25",
      value: "25",
    },
  ];

  return (
    <div>
      <Form
        form={form}
        className="flex flex-col justify-center items-center h-screen"
        name="register"
        onFinish={onFinish}
      >
        <div className="flex flex-col items-center mt-10 mb-10">
          <p className="text-6xl font-bold">새로운 목표를 추가합니다!</p>
          <p className="text-2xl">목표를 달성하기 위한 가이드라인을 작성해주세요.</p>
        </div>

        <Form.Item
          name="goalTitle"s
          className="w-4/6"
          label=""
          rules={[
            {
              required: true,
              message: "목표명을 입력해주세요",
            },
          ]}
        >
          {/* <div className="text-4xl mb-2">목표명</div> */}
          <Input className="" placeholder="오픽 공부 1시간" />
        </Form.Item>

        <Form.Item
          name="goalDescription"
          className="w-4/6"
          label=""
          rules={[
            {
              required: true,
              message: "구체적인 실행 방법을 적어주세요",
            },
          ]}
        >
          {/* <div className="text-4xl mb-2">가이드라인</div> */}
          <Input placeholder="수업 복습 20분 + 녹음 및 교정 20분 + 스크립트 암기 20분" />
        </Form.Item>

        <Form.Item name="totalGoalRounds" label="" className="w-4/6">
          {/* <div className="text-4xl mb-2">목표횟수</div> */}
          <TreeSelect
            value={value}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            treeData={treeData}
            placeholder="Please select"
            treeDefaultExpandAll
          />
        </Form.Item>

        <Form.Item name="dueDate" label="" className="w-4/6">
          {/* <div className="text-4xl mb-2">기간</div> */}
          <RangePicker
            className="w-full placeholder-red-500"
            value={dates || value}
            disabledDate={disabledDate}
            onCalendarChange={val => {
              setDates(val);
            }}
            onChange={val => {
              if (val) {
                const now = dayjs(); // 현재시간
                console.log("현재", now);
                console.log("종료시간", val[1]);
                console.log("시작-현재", val[0]?.diff(now, "days"));
                console.log("종료-시작", val[1]?.diff(val[0], "days"));
                console.log("종료-현재", val[1]?.diff(now, "days"));

                setValue(val);
              }
            }}
            onOpenChange={onOpenChange}
            changeOnBlur
          />
        </Form.Item>

        <Form.Item label="" className="">
          <Button type="primary" htmlType="submit" className="bg-black">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
