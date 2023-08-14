import { getToken } from "next-auth/jwt";
import { replaceDocument, getSelectedGoalData } from "../../../helper/db-utils";

export default async function handler(req, res) {
  const selectedGoalId = req.query.showGoalDetail;
  console.log("selectedGoalId:", selectedGoalId);
  if (req.method === "POST") {
    try {
      const token = await getToken({ req });

      if (!token) {
        throw new Error("토큰이 유효하지 않습니다...");
      }

      const goalData = {
        ...req.body,
        email: token.user.email,
      };

      const result = await replaceDocument("goal-list", selectedGoalId, goalData);
      if (!result) {
        throw new Error("데이터를 DB에 저장하는데 실패했습니다...");
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}
