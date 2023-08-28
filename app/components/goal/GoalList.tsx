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
  height: "380px",
  color: "#000",
  textAlign: "center",
};

export default function GoalPage({ data, type }) {
  const carouselRef = useRef(null);
  const [goalList, setGoalList] = useRecoilState(goalListState);

  useEffect(() => {
    setGoalList(data);
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

  if (goalList.length === 0) {
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
        <div className="flex justify-center mt-16 font-bold text-6xl">
          {type === "starting"
            ? "목표를 선택해볼까요?"
            : type === "success"
            ? "성공한 목표입니다"
            : type === "fail"
            ? "실패한 목표입니다"
            : "진행예정인 목표입니다"}
        </div>
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
              {goalList &&
                goalList.map(goal => (
                  <div key={goal._id}>
                    <div className="text-center">
                      {type === "starting" ? (
                        <Link href={`/detail/${goal._id}`}>
                          <h3 style={contentStyle}>
                            <div>
                              <Image src={goal.goalImage} alt="image1" width="400" height="400" />
                            </div>
                          </h3>
                          <span className="font-bold text-3xl">{goal.goalTitle}</span>
                        </Link>
                      ) : (
                        <>
                          <h3 style={contentStyle}>
                            <div>
                              <Image src={goal.goalImage} alt="image1" width="400" height="400" />
                            </div>
                          </h3>
                          <span className="font-bold text-3xl">{goal.goalTitle}</span>
                        </>
                      )}
                    </div>
                    <div className="flex justify-center">
                      {type === "starting" ? (
                        <Link href={`/detail/${goal._id}`}>
                          <Button
                            className="mt-6 bg-main-color w-177 h-75 font-bold text-2xl hover:bg-red-300"
                            type="ghost"
                            text="목표 시작"
                          />
                        </Link>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
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
