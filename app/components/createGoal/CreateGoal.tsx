"use client";

import axios from "axios";
import { Button, Form, Input, TreeSelect, DatePicker, Modal } from "antd";
import React, { useState } from "react";
import { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import styles from "./CreateGoal.module.css";

const { RangePicker } = DatePicker;
type RangeValue = [Dayjs | null, Dayjs | null] | null;

interface FormValue {
  goalTitle: string;

  goalDescription: string;
  dueDate: number;
  totalGoalRounds: number;
}

export default function CreateGoalPage() {
  const router = useRouter();
  const [dates, setDates] = useState<RangeValue>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imgSrc, setImgSrc] = useState("/images/basic.png");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    router.push("/goal-list");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
  // ⬇️ setValue의 용도를 모르겠음!
  const [value, setValue] = useState<string>();
  const [modalMessage, setModelMessage] = useState();

  const onFinish = (values: FormValue) => {
    axios
      .post("/api/goal/create-goal", {
        ...values,
        nowGoalRounds: [],
        goalImage: imgSrc,
      })
      .then(res => {
        setValue(res.data);
        setModelMessage(res.data.message);
        showModal();
        setTimeout(() => {
          setValue(undefined);
        }, 4000);
      })
      .catch(err => {
        setValue(err.response.data);
        setModelMessage(err.response.data);
        showModal();
        setTimeout(() => {
          setValue(undefined);
        }, 4000);
      });
  };

  const handleImage = e => {
    setImgSrc(e.target.getAttribute("src"));
  };

  // 목표 횟수 선택값
  const treeData = [
    {
      title: "5",
      value: 5,
    },
    {
      title: "10",
      value: 10,
    },
    {
      title: "15",
      value: 15,
    },
    {
      title: "20",
      value: 20,
    },
    {
      title: "25",
      value: 25,
    },
    {
      title: "30",
      value: 30,
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
        <div className="flex flex-col items-center mt-32 mb-10">
          <p className="text-6xl font-bold">새로운 목표를 추가합니다!</p>
          <p className="text-2xl">목표를 달성하기 위한 가이드라인을 작성해주세요.</p>
        </div>
        <div className="w-4/6">
          <div className="text-3xl mb-2 font-bold">목표명</div>
          <Form.Item
            name="goalTitle"
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
        </div>

        <div className="w-4/6">
          <div className="text-3xl mb-2 font-bold">가이드라인</div>
          <Form.Item
            name="goalDescription"
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
        </div>

        <div className="w-4/6">
          <div className="text-3xl mb-2 font-bold">목표횟수</div>
          <Form.Item name="totalGoalRounds" label="">
            <TreeSelect
              value={value}
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              treeData={treeData}
              placeholder="다섯 번 단위로 목표횟수를 선택할 수 있어요"
              treeDefaultExpandAll
            />
          </Form.Item>
        </div>
        <div className="w-4/6 placeholder-red-500">
          <div className="text-3xl mb-2 font-bold">기간</div>
          <Form.Item name="dueDate" label="">
            <RangePicker
              className="w-full"
              value={dates || value}
              disabledDate={disabledDate}
              onCalendarChange={val => {
                setDates(val);
              }}
              onChange={val => {
                if (val) {
                  setValue(val);
                }
              }}
              onOpenChange={onOpenChange}
              changeOnBlur
            />
          </Form.Item>
        </div>

        <Modal
          cancelText="취소"
          okText="확인"
          className=""
          title="목표 등록 알림"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{
            style: {
              backgroundColor: "red",
              borderColor: "white",
              color: "white",
              transition: "none",
            },
            onMouseOver: e => {
              e.currentTarget.style.backgroundColor = "red";
              e.currentTarget.style.borderColor = "red";
            },
            onMouseOut: e => {
              e.currentTarget.style.backgroundColor = "red";
              e.currentTarget.style.borderColor = "red";
            },
          }}
        >
          <p>{modalMessage && modalMessage}</p>
        </Modal>
        <div className="w-4/6">
          <div className="text-3xl mb-2 font-bold">이미지 선택</div>
          <ul className={styles.imgList} onClick={handleImage} role="presentation">
            <li>
              <img src="/images/babel.png" alt="" />
            </li>
            <li>
              <img src="/images/books.png" alt="" />
            </li>
            <li>
              <img src="/images/goalImage.png" alt="" />
            </li>
          </ul>
        </div>
        <Form.Item label="" className="">
          <Button type="primary" htmlType="submit" className="bg-main-color">
            저장하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
