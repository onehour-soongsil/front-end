import dayjs from "dayjs";
import { atom, selector } from "recoil";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

const now = dayjs();

export const goalListState = atom({
  key: "goalListStateKey",
  default: [],
});

// 할당량을 전부 채운 목표들
export const finishedGoalListState = selector({
  key: "finishedGoalListStateKey",
  get: ({ get }) => {
    const goalList = get(goalListState);
    const finishedGoalList = goalList.filter(goal => {
      return goal.isFinished === true;
    });

    return finishedGoalList;
  },
});

// 만료시간이 지난 데이터
export const closedGoalListState = selector({
  key: "closedGoalListStateKey",
  get: ({ get }) => {
    const goalList = get(goalListState);

    const closedGoalList = goalList.filter(goal => {
      if (goal.dueDate) {
        const [, due] = goal.dueDate;
        const dueDate = dayjs(due);
        return dueDate.isBefore(now);
      }
      return false;
    });

    return closedGoalList;
  },
});

// 만료시간이 지났고, 할당량을 못채운 목표들
export const failGoalListState = selector({
  key: "failGoalListStateKey",
  get: ({ get }) => {
    const closedList = get(closedGoalListState);
    const finishedList = get(finishedGoalListState);

    const failGoalList = closedList.filter(goal => {
      return !finishedList.includes(goal);
    });

    return failGoalList;
  },
});

// 만료시간이 남은 목표들
export const openGoalListState = selector({
  key: "openGoalListStateKey",
  get: ({ get }) => {
    const goalList = get(goalListState);
    const closedGoalList = get(closedGoalListState);

    const notClosedGoalList = goalList.filter(goal => {
      return !closedGoalList.includes(goal);
    });

    const openGoalList = notClosedGoalList.filter(goal => {
      return goal.isFinished === false;
    });

    return openGoalList;
  },
});

// 만료시간이 남았고, 진행중인 목표들
export const startingGoalListState = selector({
  key: "startingGoalListStateKey",
  get: ({ get }) => {
    const openList = get(openGoalListState);
    const startingGoalList = openList.filter(goal => {
      if (goal.dueDate) {
        const [start] = goal.dueDate;
        const startDate = dayjs(start);
        return now.isSameOrAfter(startDate);
      }
      return false;
    });

    return startingGoalList;
  },
});

// 만료시간이 남았고, 아직 시작날짜가 되지 않은 목표들
export const notStartedGoalListState = selector({
  key: "notStartedGoalListStateKey",
  get: ({ get }) => {
    const openList = get(openGoalListState);
    const startingGoalList = get(startingGoalListState);
    const notStartedGoalList = openList.filter(goal => {
      return !startingGoalList.includes(goal);
    });

    return notStartedGoalList;
  },
});
