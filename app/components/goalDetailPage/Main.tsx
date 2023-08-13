"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Lottie from "lottie-react";
import axios from "axios";
import Timer from "../timer/Timer";
import trophy from "../../../public/images/trophy.png";
import torchAnimation from "../../../public/data/torch-animation.json";
import GoalEditForm from "../goal/GoalEdit";

interface SelectedGoalItemType {
  _id: string;
  goalTitle: string;
}

export default function Main({ _id }: { _id: string }) {
  const [selectedGoal, setSelectedGoal] = useState<SelectedGoalItemType[]>([]);

  useEffect(() => {
    axios.get("/api/goal/show-goalList").then(res => {
      const startingGoalList = res.data;
      const selected = startingGoalList.find(goal => goal._id === _id);
      setSelectedGoal(selected);
    });
  }, [_id]);

  if (selectedGoal.length === 0) return <h1>로딩중...</h1>;

  if (selectedGoal.length !== 0) {
    return (
      <div className="absolute w-full overflow-hidden">
        <div className="h-300vh">
          <div id="1" className="relative h-screen">
            <div className="flex items-center flex-col">
              <div className="mt-48">
                <h1 className="text-5xl font-bold">{selectedGoal.goalTitle}</h1>
              </div>
              <div className="">
                <Timer />
              </div>
            </div>
          </div>
          <div id="2" className="relative h-screen flex justify-center items-end ">
            <div className="absolute left-20 top-24">
              <h1 className="text-5xl tracking-tighter font-bold text-main-color">
                꺼지지 않는 불꽃처럼
              </h1>
              <p className="text-2xl  leading-15 tracking-tighter text-basic-black">
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
          <div id="3" className="relative h-screen">
            <GoalEditForm />
            {/* <div>나의 설정 목표</div>
            <div className="">
              {selectedGoal && <h1 className="text-40px font-bold">{selectedGoal.snippet.title}</h1>}
            </div>
            <div>목표설명</div>
            <div className="">
              {selectedGoal && (
                <h1 className="text-40px font-bold">{selectedGoal.snippet.description}</h1>
              )}
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}
