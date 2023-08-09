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

    const filteredList = goalList.filter(goal => {
      console.log(goal.dueDate);
      const dueDate = dayjs(goal.dueDate[1]); // 포멧팅(문자열)을 다시 dayjs 객체로
      return dueDate.diff(now, "days") + 1 >= 0;
    });
    return filteredList;
  },
});
