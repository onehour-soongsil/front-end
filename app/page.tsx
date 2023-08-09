"use client";

import { Layout } from "antd";
import Image from "next/image";
import RunningFigure from "../public/images/figures-running 1.png";

const { Content } = Layout;

export default function Home() {
  return (
    <Content className="h-screen bg-white relative">
      <div className="w-722 absolute top-56 left-28 z-10">
        <h3 className="text-7xl text-basic-black font-bold">
          더도말고 덜도말고 <br />
          하루에 딱 <span className="text-main-color">1시간</span>
        </h3>
        <p className="leading-130 text-3xl tracking-tighter text-basic-black font-bold">
          원아워로 꾸준한 목표실천, 시작해봐요!
        </p>
      </div>
      <Image
        src={RunningFigure}
        alt="running figure"
        width={885}
        height={630}
        className="absolute bottom-0 right-0"
      />
    </Content>
  );
}
