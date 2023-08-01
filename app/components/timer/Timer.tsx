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

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

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
    if (time >= 5 && !isCompleted) {
      handleCompletion();
    }
  }, [time, isCompleted]);

  return (
    <div className="">
      {isCompleted ? (
        <FinishTodaysGoal />
      ) : (
        <>
          <div className="flex flex-col items-center">
            <h4 className="text-2xl">할 수 있잖아? 힘내보는거야!</h4>
          </div>
          <div className="flex text-9xl justify-center text-red-500 font-bold mt-3">
            {formatTime(time)}
          </div>
          <div className="flex justify-center">
            <Button
              className="text-red-400 hover:text-red-900"
              danger={false}
              // type="primary"
              onClick={stopTimer}
              text="타이머 중지"
            />
            <Button type="primary" danger onClick={startTimer} text="타이머 시작" />
          </div>
        </>
      )}
    </div>
  );
}
