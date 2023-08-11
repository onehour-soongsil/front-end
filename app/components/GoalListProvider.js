"use client";

import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { goalListState } from "../recoil/goalListAtom";

export default function GoalListProvider({ allGoalList, children }) {
  const [goalList, setGoalList] = useRecoilState(goalListState);

  useEffect(() => {
    setGoalList(allGoalList);
  }, [allGoalList]);

  if (goalList.length !== 0) {
    return <>{children}</>;
  }
  if (goalList.length === 0) {
    return (
      <>
        <h1>저장된 목표 리스트가 없습니다!</h1>
      </>
    );
  }
  return (
    <>
      <h1>Loading...</h1>
    </>
  );
}
