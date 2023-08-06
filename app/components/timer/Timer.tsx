"use client";

import { useState, useEffect } from "react";
import Button from "../ui/Button";
import FinishTodaysGoal from "../FinishTodaysGoal/FinishTodaysGoal";

export default function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const formatTime = (times: number) => {
    const hours = Math.floor(times / 3600);
    const minutes = Math.floor((times % 3600) / 60);
    const seconds = times % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // 타이머가 1시간 이상인지를 저장하는 상태 변수 추가
  const [isCompleted, setIsCompleted] = useState(false);

  // 타이머가 1시간 이상일 때 임무 완수 처리하는 함수
  const handleCompletion = () => {
    setIsCompleted(true);
    stopTimer(); // stopTimer 함수 실행
  };

  useEffect(() => {
    // 타이머가 1시간 이상인 경우 처리
    if (time >= 3 && !isCompleted) {
      // 5를 나중에 3600으로 바꿔야함
      handleCompletion();
    }
  }, [time, isCompleted]);

  return (
    <div className="">
      {isCompleted ? (
        <FinishTodaysGoal />
      ) : (
        <>
          <div className="flex flex-col items-center justify-center mt-49">
            <h4 className="text-2xl">할 수 있잖아? 힘내보는거야!</h4>
          </div>
          <div className="flex text-9xl justify-center items-center text-red-500 font-bold mt-61">
            {formatTime(time)}
          </div>
          <div className="flex justify-center mt-36 space-x-20">
            <Button
              className="bg-black w-177 h-75  font-bold text-2xl hover:bg-gray-500"
              type="ghost"
              onClick={stopTimer}
              text="타이머 중지"
            />
            <Button
              className="bg-main-color w-177 h-75 font-bold text-2xl hover:bg-red-300"
              type="ghost"
              onClick={startTimer}
              text="타이머 시작"
            />
          </div>
        </>
      )}
    </div>
  );
}
