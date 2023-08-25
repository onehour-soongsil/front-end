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

      const toProceedGoalList = filteredListByUser.filter(goal => {
        const now = dayjs();
        const [start] = goal.dueDate;
        const startDate = dayjs(start);
        return now.isBefore(startDate);
      });

      res.status(200).json(toProceedGoalList);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
