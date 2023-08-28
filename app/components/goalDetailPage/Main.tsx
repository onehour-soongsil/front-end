"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Lottie from "lottie-react";
import axios from "axios";
import Link from "next/link";
import Timer from "../timer/Timer";
import trophy from "../../../public/images/trophy.png";
import torchAnimation from "../../../public/data/torch-animation.json";
import FinishTodaysGoal from "../FinishTodaysGoal/FinishTodaysGoal";
import edit from "@/public/images/edit.jpg";
import report from "@/public/images/report.png";
import Loading from "@/app/components/loadingbar/Loading";

interface SelectedGoalItemType {
  _id: string;
  goalTitle: string;
}

export default function Main({ _id }: { _id: string }) {
  const [selectedGoal, setSelectedGoal] = useState<SelectedGoalItemType[]>([]);

  useEffect(() => {
    axios
      .get(`/api/goal/${_id}`) //
      .then(res => {
        setSelectedGoal(res.data);
      })
      .catch(err => console.error(err));
  }, [_id]);

  useEffect(() => {
    const now = new Date();
    // const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const oneMinuteLater = new Date(now.getTime() + 20000); // 20초 후의 시간 (테스트용)
    const timeUntilMidnight = oneMinuteLater - now;

    const timer = setTimeout(() => {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("key_")) {
          localStorage.removeItem(key);
        }
      }
      // window.location.reload();
    }, timeUntilMidnight);

    return () => {
      clearTimeout(timer);
    };
  });

  if (selectedGoal.length === 0) return <Loading />;

  if (selectedGoal.length !== 0) {
    return (
      <div className="absolute w-full overflow-hidden">
        <div className="h-300vh">
          <div id="1" className="relative h-screen">
            <div className="flex items-center flex-col">
              <div className="mt-24">
                <h1 className="text-5xl font-bold">{selectedGoal.goalTitle}</h1>
              </div>
              <div className="">
                <Timer selectedGoal={selectedGoal} />
              </div>
            </div>
          </div>
          <div id="2" className="relative h-screen flex justify-center items-end ">
            <div className="absolute left-20 top-24">
              <h1 className="text-5xl tracking-tighter font-bold text-main-color">
                꺼지지 않는 불꽃처럼
              </h1>
              <p className="text-2xl leading-15 tracking-tighter text-basic-black">
                목표 달성도에따라 성화가 점등됩니다
              </p>
            </div>
            <ul className="flex items-center">
              <li className="relative flex flex-col items-center">
                {selectedGoal.goalPercentages === 0 ? (
                  <Lottie
                    className="w-0 absolute -top-40"
                    animationData={torchAnimation}
                    loop
                    autoplay
                  />
                ) : selectedGoal.goalPercentages <= 30 ? (
                  <Lottie
                    className="w-28 absolute -top-24"
                    animationData={torchAnimation}
                    loop
                    autoplay
                  />
                ) : selectedGoal.goalPercentages <= 60 ? (
                  <Lottie
                    className="w-36 absolute -top-24"
                    animationData={torchAnimation}
                    loop
                    autoplay
                  />
                ) : selectedGoal.goalPercentages <= 90 ? (
                  <Lottie
                    className="w-48 absolute -top-40"
                    animationData={torchAnimation}
                    loop
                    autoplay
                  />
                ) : (
                  <Lottie
                    className="w-48 absolute -top-40"
                    animationData={torchAnimation}
                    loop
                    autoplay
                  />
                )}

                <Image className="z-10" src={trophy} alt="torch" width={400} height={400} />
              </li>
              {/* <li className="relative flex flex-col items-center">
                <Lottie
                  className="w-36 absolute -top-40"
                  animationData={torchAnimation}
                  loop
                  autoplay
                />
                <Image className="" src={trophy} alt="torch" width={300} height={400} />
              </li>
              <li className="relative flex flex-col items-center">
                <Lottie
                  className="w-48 absolute -top-52"
                  animationData={torchAnimation}
                  loop
                  autoplay
                />
                <Image className="" src={trophy} alt="torch" width={400} height={400} />
              </li> */}
            </ul>
          </div>
          <div id="3" className="relative h-screen w-full flex flex-col justify-center">
            <div className="px-8">
              <div className="flex justify-center items-center">
                <Image
                  src={edit}
                  alt="edit icon"
                  width={200}
                  height={200}
                  className="flex flex-row justify-center mt-8"
                />
              </div>
              <p className="flex flex-row justify-center py-3 text-gray-500">
                너무 잦은 계획 변동은 좋지 않아요!
              </p>
              <Link
                className="text-3xl flex flex-row justify-center font-bold"
                href={`/edit/${_id}`}
              >
                목표 수정하기
              </Link>
            </div>

            <div className="px-8">
              <div className="flex justify-center items-center">
                <Image
                  src={report}
                  alt="edit icon"
                  width={225}
                  height={225}
                  className="flex flex-row justify-center mt-8"
                />
              </div>
              <p className="flex flex-row justify-center py-3 text-gray-500">
                내가 얼마나 달성했는지 궁금하다면
              </p>
              <Link
                className="text-3xl flex flex-row justify-center font-bold"
                href={`/summary/${_id}`}
              >
                목표 요약
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
