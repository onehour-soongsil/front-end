import Image from "next/image";
import Books from "../../../public/images/books.png";
import Button from "../ui/Button";

export default function FinishTodaysGoal() {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-10">
        <Image src={Books} alt="books" width={202.9} height={202.9} />
      </div>
      <div className="font-bold text-4xl mt-5">오늘의 목표 완수!</div>
      <div className="mt-6 text-3xl">지금까지 목표에 총 30시간 가까워졌어요😄</div>
      <Button
        className="bg-main-color w-220 h-75 font-bold text-2xl mt-16 hover:bg-red-300"
        type="ghost"
        text="요약 바로가기"
      />
    </div>
  );
}
