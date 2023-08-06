import dayjs from "dayjs";
import { atom, selector } from "recoil";

export const goalListState = atom({
  key: "goalListState",
  default: [],
});

export const filteredGoalListState = selector({
  key: "filteredGoalListState",
  get: ({ get }) => {
    const goalList = get(goalListState);
    const now = dayjs();

    // 수정필요
    const filteredList = goalList.find(goal => {
      const goalDate = dayjs(goal.goalDate);
      return goalDate.diff(now, "days") >= 1;
    });
    return filteredList;
  },
});
