import { getToken } from "next-auth/jwt";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { getGoalList } from "../../../helper/db-utils";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const token = await getToken({ req });

      const goalList = await getGoalList();
      if (!goalList) {
        throw new Error("데이터를 가져오는데 실패했습니다...");
      }
      const filteredListByUser = goalList.filter(goal => {
        return goal.email === token.user.email;
      });

      const startingGoalList = filteredListByUser.filter(goal => {
        const now = dayjs();
        const [start, due] = goal.dueDate;
        const startDate = dayjs(start).startOf("day"); // Set to the start of the day
        const dueDate = dayjs(due).endOf("day"); // Set to the end of the day
        return now.isSameOrAfter(startDate) && now.isSameOrBefore(dueDate) && !goal.isFinished;
      });

      res.status(200).json(startingGoalList);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
