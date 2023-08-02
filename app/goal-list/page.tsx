"use client";

import axios from "axios";
import { Carousel, Button, Space } from "antd";
import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line import/no-absolute-path
import goalImage from "/public/images/goalImage.png";
import Image from "next/image";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Link from "next/link";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "500px",
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
    <div
      className="bg-red-100"
      style={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ marginTop: "300px" }}>
        <Button type="primary" ghost onClick={goToPrevSlide} size="large">
          <LeftOutlined />
        </Button>
      </div>

      <Carousel
        afterChange={onChange}
        ref={carouselRef}
        style={{ width: "500px", height: "500px", marginTop: "90px" }}
      >
        {goal.map((item, i) => (
          <div key={i}>
            <Link href={`/detail/${goal[i].id.goalId}`}>
              <h3 style={contentStyle}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Image
                    src={goalImage}
                    alt="image1"
                    width="400"
                    height="400"
                    style={{ marginTop: "20px" }}
                  />
                </div>
                {goal.length > 0 && <span>{goal[i].snippet.title}</span>}
              </h3>
            </Link>
          </div>
        ))}
      </Carousel>
      <div style={{ marginTop: "300px" }}>
        <Button type="primary" ghost onClick={goToNextSlide} size="large">
          <RightOutlined />
        </Button>
      </div>
    </div>
  );
}
