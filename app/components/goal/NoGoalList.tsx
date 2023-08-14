import Link from "next/link";
import { Empty } from "antd";
import Button from "../ui/Button";

export default function NoGoalList() {
  return (
    <div className="flex items-center flex-col h-screen">
      <h1 className="mt-32 text-4xl font-bold">등록된 목표가 없습니다!</h1>
      <h3 className="mt-10 mb-7 text-3xl font-bold">목표를 등록해 보세요!</h3>
      <Empty />

      <Link href="/create-goal">
        <Button
          className="mt-16 bg-main-color w-177 h-75 font-bold text-2xl hover:bg-red-300"
          type="ghost"
          text="목표 등록"
        />
      </Link>
    </div>
  );
}