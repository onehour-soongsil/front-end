"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../ui/Button";
import FinishTodaysGoal from "../FinishTodaysGoal/FinishTodaysGoal";

export default function Timer(props) {
  const { _id } = props.selectedGoal;
  const [time, setTime] = useState(0);
  const [duringStopTime, setDuringStopTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCompletedToday, setIsCompletedToday] = useState(false);
  const [lastStopTime, setLastStopTime] = useState(0);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      interval = setInterval(() => {
        setDuringStopTime(prevTime => prevTime + 1);
      }, 1000);

      if (duringStopTime >= 1200) {
        // duringStopTime이 5 이상이 되면 타이머 초기화
        setTime(0);
        setDuringStopTime(0);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, duringStopTime]);

  const startTimer = () => {
    setIsRunning(true);
    setLastStopTime(0);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setLastStopTime(Date.now());
  };

  const formatTime = (times: number) => {
    const hours = Math.floor(times / 3600);
    const minutes = Math.floor((times % 3600) / 60);
    const seconds = times % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const elapsedSinceStop = Date.now() - lastStopTime;
    if (!isRunning && elapsedSinceStop >= 1200000) {
      // 5초
      setTime(0); // 5초 이상 경과 시 타이머 초기화
      setDuringStopTime(0);
      console.log("time : ", time);
    }
  }, [isRunning, lastStopTime]);

  // 타이머가 1시간 이상일 때 임무 완수 처리하는 함수
  const handleCompletion = async () => {
    setIsCompleted(true);
    stopTimer(); // stopTimer 함수 실행

    // API 요청으로 nowGoalRounds 증가시키기
    try {
      await axios.put(`/api/goals/${_id}`, { nowGoalRounds: 1 });
      console.log("nowGoalRounds 증가 성공");
    } catch (error) {
      console.error("nowGoalRounds 증가 실패", error);
    }

    const today = new Date().toISOString().substring(0, 10);
    localStorage.setItem(`key_${_id}`, today);
  };

  useEffect(() => {
    if (time >= 3600 && !isCompleted) {
      handleCompletion();
    }
  }, [time, isCompleted]);

  useEffect(() => {
    if (localStorage.getItem(`key_${_id}`)) {
      setIsCompletedToday(true);
    }
  }, []);

  return (
    <div className="">
      {isCompleted || isCompletedToday ? (
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
