"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Lottie from "lottie-react";
import Timer from "../timer/Timer";
import trophy from "../../../public/images/trophy.png";
import torchAnimation from "../../../public/data/torch-animation.json";

interface SelectedGoalItemType {
  id: {
    goalId: string;
  };
  snippet: {
    title: string;
  };
}

export default function Main({ goalId }: { goalId: string }) {
  const [selectedGoal, setSelectedGoal] = useState<SelectedGoalItemType[]>();
  useEffect(() => {
    axios.get("/data/goal.json").then(res => {
      const selected = res.data.items.find(
        (item: SelectedGoalItemType) => item.id.goalId === goalId
      );
      if (selected) {
        setSelectedGoal(selected);
        console.log(selected);
      }
    });
  }, [goalId]);

  return (
    <div className="absolute w-full overflow-hidden">
      <div className="h-300vh">
        <div id="1" className="relative h-screen">
          <div className="flex items-center flex-col">
            <div className="mt-48">
              {selectedGoal && <h1 className="text-5xl font-bold">{selectedGoal.snippet.title}</h1>}
            </div>
            <div className="">
              <Timer />
            </div>
          </div>
        </div>
        <div id="2" className="relative h-screen flex justify-center items-end ">
          <div className="absolute left-20 top-24">
            <h1 className="text-40px tracking-tighter font-bold text-button-color">
              꺼지지 않는 불꽃처럼
            </h1>
            <p className="text-base font-bold leading-15 tracking-tighter text-homepage-title-color">
              목표 달성도에따라 성화가 점등됩니다
            </p>
          </div>
          <ul className="flex items-center">
            <li className="relative flex flex-col items-center">
              <Lottie
                className="w-24 absolute -top-28"
                animationData={torchAnimation}
                loop
                autoplay
              />
              <Image className="" src={trophy} alt="torch" width={200} height={400} />
            </li>
            <li className="relative flex flex-col items-center">
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
            </li>
            <li className="relative flex flex-col items-center">
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
                className="w-24 absolute -top-28"
                animationData={torchAnimation}
                loop
                autoplay
              />
              <Image className="" src={trophy} alt="torch" width={200} height={400} />
            </li>
          </ul>
        </div>
        <div id="3" className="relative h-screen">
          지수야 안만들고 뭐하냐
        </div>
      </div>
    </div>
  );
}
