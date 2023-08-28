"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import dayjs from "dayjs";
import report from "@/public/images/report.png";

interface SelectedGoalItemType {
  _id: string;
  goalTitle: string;
  goalDescription: string;
  dueDate: number;
  totalGoalRounds: number;
}

export default function Summary(props: { params: { id: any } }) {
  const [selectedGoal, setSelectedGoal] = useState<SelectedGoalItemType[]>([]);
  // eslint-disable-next-line react/destructuring-assignment
  const { id } = props.params;
  useEffect(() => {
    axios
      .get(`/api/goal/${id}`)
      .then(res => {
        setSelectedGoal(res.data);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (selectedGoal.length === 0) return <h1>로딩중...</h1>;

  if (selectedGoal.length !== 0) {
    const endDate = new Date(selectedGoal.dueDate[1]);
    // 현재 날짜와 시간을 가져옴
    const now = new Date();

    // 두 날짜 사이의 밀리초 단위 차이를 구하기
    const diff = endDate.getTime() - now.getTime();

    // 밀리초 단위 차이를 일(day) 단위로 변환해줌
    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

    console.log(daysLeft);

    const year = endDate.getFullYear(); // 연도 가져오기
    const month = endDate.getMonth() + 1; // 월 가져오기 (0부터 시작하므로 1을 더함)
    const date = endDate.getDate(); // 일 가져오기

    const formattedEndDate = `${year}년 ${month}월 ${date}일`;

    console.log(selectedGoal);
    return (
      <>
        <div className="w-full h-screen">
          <div className="relative w-full flex flex-col justify-center">
            <div className="">
              <div className="flex justify-center items-center">
                <Image
                  src={report}
                  alt="report icon"
                  width={200}
                  height={200}
                  className="flex flex-row justify-center mt-8"
                />
              </div>
              <p className="text-4xl font-bold flex flex-row justify-center py-5">
                '{selectedGoal.goalTitle}' 의 요약 레포트
              </p>
            </div>
          </div>
          <div className="relative w-full flex flex-col justify-center">
            <div className="flex justify-center items-center">
              <p className="flex flex-row justify-center py-3 text-3xl  text-gray-500">
                <div>
                  <span className="font-bold text-black">✅ {selectedGoal.totalGoalRounds}</span>
                  <span>번 하기로 마음 먹었는데, 현재까지</span>
                  <span className="font-bold text-main-color"> 3번 </span>
                  <span>성공했어요</span>
                </div>
              </p>
            </div>
          </div>
          <div className="relative w-full flex flex-col justify-center">
            <div className="flex justify-center items-center">
              <p className="flex flex-row justify-center py-3 text-3xl text-gray-500 ">
                <div>
                  <span>✅ 마감기한인 </span>
                  <span className="font-bold text-black">{formattedEndDate}</span>
                  <span>까지는 </span>
                  <span className="font-bold text-main-color">{daysLeft}일</span>
                  <span> 남았어요 </span>
                </div>
              </p>
            </div>
          </div>
          <div className="relative w-full flex flex-col justify-center">
            <div className="flex justify-center items-center">
              <p className="flex flex-row justify-center py-3 text-gray-500 text-3xl">
                🔽목표 달성 히스토리🔽
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
