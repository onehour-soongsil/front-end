"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Timer from "../timer/Timer.tsx";

interface selectedGoalItemType {
  id: {
    goalId: string;
  };
  snippet: {
    title: string;
  };
}

export default function Main(props: { goalId: string }) {
  const [selectedGoal, setSelectedGoal] = useState<selectedGoalItemType[]>();
  useEffect(() => {
    axios.get("/data/goal.json").then(res => {
      for (const i in res.data.items) {
        if (res.data.items[i].id.goalId === props.goalId) {
          setSelectedGoal(res.data.items[i]);
          console.log(res.data.items[i]);
        }
      }
    });
  }, [setSelectedGoal]);

  return (
    <div className="absolute w-full overflow-hidden">
      <div className="h-300vh">
        <div id="1" className="relative h-screen">
          <div className="flex items-center flex-col">
            <div className="mt-236">
              {selectedGoal && (
                <h1 className="text-40px font-bold">{selectedGoal.snippet.title}</h1>
              )}
            </div>
            <div className="">
              <Timer />
            </div>
          </div>
        </div>
        <div id="2" className="relative h-screen">
          2
        </div>
        <div id="3" className="relative h-screen">
          3
        </div>
      </div>
    </div>
  );
}
