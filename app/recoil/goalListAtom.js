import dayjs from "dayjs";
import { atom, selector } from "recoil";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

const now = dayjs();

export const goalListState = atom({
  key: "goalListState",
  default: [],
});

export const filteredGoalListSelector = selector({
  key: "filteredGoalListSelector",
  get: ({ get }) => {
    const goalList = get(goalListState);
    const filteredList = goalList.filter(goal => {
      const [start, due] = goal.dueDate;
      const startDate = dayjs(start);
      return now.isSameOrAfter(startDate);
    });
    return filteredList;
  },
});
