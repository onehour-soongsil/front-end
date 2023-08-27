import { getToken } from "next-auth/jwt";
import dayjs from "dayjs";
import { getGoalList } from "../../../helper/db-utils";

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

      const failGoalList = filteredListByUser.filter(goal => {
        const now = dayjs();
        const [, due] = goal.dueDate;
        const dueDate = dayjs(due).endOf("day");
        return dueDate.isBefore(now) && !goal.isFinished;
      });

      res.status(200).json(failGoalList);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
