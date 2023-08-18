"use client";

import { Carousel, ConfigProvider } from "antd";
import { useEffect, useRef } from "react";
// eslint-disable-next-line import/no-absolute-path
import Image from "next/image";
import Link from "next/link";
import { useRecoilState } from "recoil";
import Button from "../ui/Button";
import { goalListState } from "@/app/recoil/goalListAtom";
import NoGoalList from "./NoGoalList";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "400px",
  color: "#000",
  textAlign: "center",
};

export default function GoalPage({ data }) {
  const carouselRef = useRef(null);
  const [startingGoalList, setStartingGoalList] = useRecoilState(goalListState);

  useEffect(() => {
    setStartingGoalList(data);
  }, [data]);

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  const goToPrevSlide = () => {
    carouselRef.current.prev();
  };
  const goToNextSlide = () => {
    carouselRef.current.next();
  };

  if (startingGoalList.length === 0) {
    return <NoGoalList />;
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            dotWidth: 10,
            dotHeight: 10,
            dotActiveWidth: 20,
          },
        },
      }}
    >
      <div className="h-screen overflow-hidden">
        <div className="flex justify-center mt-16 font-bold text-6xl">목표를 선택해볼까요?</div>
        <div className="flex justify-center">
          <div className="mt-48 mr-11">
            <Button className="bg-main-color" type="ghost" onClick={goToPrevSlide} text="<" />
          </div>
          <div className="mt-11">
            <Carousel
              afterChange={onChange}
              ref={carouselRef}
              style={{ width: "330px", height: "380px" }}
            >
              {startingGoalList &&
                startingGoalList.map(goal => (
                  <>
                    <div key={goal._id}>
                      <Link href={`/detail/${goal._id}`}>
                        <h3 style={contentStyle}>
                          <div>
                            <Image src={goal.goalImage} alt="image1" width="400" height="400" />
                          </div>
                          <span className="font-bold text-3xl">{goal.goalTitle}</span>
                        </h3>
                      </Link>
                    </div>
                    <div className="flex justify-center">
                      <Link href={`/detail/${goal._id}`}>
                        <Button
                          className="mt-5 bg-main-color w-177 h-75 font-bold text-2xl hover:bg-red-300"
                          type="ghost"
                          text="목표 시작"
                        />
                      </Link>
                    </div>
                  </>
                ))}
            </Carousel>
          </div>
          <div className="mt-48 ml-11">
            <Button className="bg-main-color" type="ghost" onClick={goToNextSlide} text=">" />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
