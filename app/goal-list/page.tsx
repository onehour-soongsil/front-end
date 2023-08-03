"use client";

import axios from "axios";
import { Carousel, Space, ConfigProvider } from "antd";
import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line import/no-absolute-path
import goalImage from "/public/images/goalImage.png";
import Image from "next/image";
import Link from "next/link";
import Button from "../components/ui/Button";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "400px",
  color: "#000",
  textAlign: "center",
  // background: "#364d79",
};

interface GoalItemType {
  id: {
    goalId: string;
  };
  snippet: {
    title: string;
  };
}

export default function GoalPage() {
  const [goal, setGoal] = useState<GoalItemType[]>([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    axios.get(`/data/goal.json`).then(res => {
      if (res.data.items && res.data.items.length > 0) {
        setGoal(res.data.items);
      }
    });
  }, [setGoal]);

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  const goToPrevSlide = () => {
    carouselRef.current.prev();
  };
  const goToNextSlide = () => {
    carouselRef.current.next();
  };

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
        <div className="flex justify-center mt-36 font-bold text-6xl">목표를 선택해볼까요?</div>
        <div className="flex justify-center">
          <div className="mt-48 mr-11">
            <Button className="bg-button-color" type="ghost" onClick={goToPrevSlide} text="<" />
          </div>
          <div className="mt-11">
            <Carousel
              afterChange={onChange}
              ref={carouselRef}
              style={{ width: "300px", height: "380px" }}
            >
              {goal.map((item, i) => (
                <>
                  <div key={i}>
                    <Link href={`/detail/${goal[i].id.goalId}`}>
                      <h3 style={contentStyle}>
                        <div>
                          <Image src={goalImage} alt="image1" width="400" height="400" />
                        </div>
                        {goal.length > 0 && (
                          <span className="font-bold text-xl">{goal[i].snippet.title}</span>
                        )}
                      </h3>
                    </Link>
                  </div>
                  <div className="flex justify-center">
                    <Link href={`/detail/${goal[i].id.goalId}`}>
                      <Button
                        className="bg-button-color w-177 h-75 font-bold text-2xl hover:bg-red-300"
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
            <Button className="bg-button-color" type="ghost" onClick={goToNextSlide} text=">" />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
