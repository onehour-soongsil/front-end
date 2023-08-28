import Lottie from "lottie-react";
import loaing from "../../../public/data/loading-animation.json";

export default function Loading() {
  return (
    <div className="w-full h-screen flex flex-col justify-center">
      <Lottie className="w-80 h-full mx-auto" animationData={loaing} />
    </div>
  );
}
