/* eslint-disable no-console */
import { getGoalData, replaceDocument } from "../../../../helper/db-utils";

export default async function handler(req, res) {
  const { goalId } = req.query;

  console.log(goalId);
  if (req.method === "POST") {
    try {
      const goal = await getGoalData(goalId);
      console.log(req.body);
      goal.nowGoalRounds.push(req.body);
      goal.goalPercentages = Math.floor((goal.nowGoalRounds.length / goal.totalGoalRounds) * 100);
      goal.isFinished = goal.goalPercentages >= 100;

      const result = await replaceDocument("goal-list", goalId, goal);
      if (!result) {
        throw new Error("미션을 완료한 데이터가 DB에 저장되지 않았습니다...");
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}
