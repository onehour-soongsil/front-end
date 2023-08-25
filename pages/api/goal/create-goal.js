import { getToken } from "next-auth/jwt";
import { insertDocument } from "../../../helper/db-utils";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const token = await getToken({ req });
      if (!token) {
        throw new Error("토큰이 유효하지 않습니다...");
      }

      const goalPercentages = Math.floor(
        (req.body.nowGoalRounds.length / req.body.totalGoalRounds) * 100
      );
      const isFinished = goalPercentages >= 100;
      const goalData = {
        ...req.body,
        goalPercentages,
        isFinished,
        email: token.user.email,
      };
      const result = await insertDocument("goal-list", goalData);
      if (!result) {
        throw new Error("목표저장에 실패했습니다...😢");
      }
      res.status(200).json({ message: "목표저장에 성공했습니다!", result });
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}
