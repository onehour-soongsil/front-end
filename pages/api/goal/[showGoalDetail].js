import { getToken } from "next-auth/jwt";
import { getSelectedGoalData } from "../../../helper/db-utils";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const selectedGoalId = req.query.showGoalDetail;
      const selectedGoalData = await getSelectedGoalData(selectedGoalId);
      if (!selectedGoalData) {
        throw new Error("해당 id에 맞는 데이터가 DB에 존재하지 않습니다...");
      }

      const token = await getToken({ req });
      if (selectedGoalData.email !== token.user.email) {
        throw new Error("해당 목표를 등록한 사람은 당신이 아닙니다...");
      }

      res.status(200).json(selectedGoalData);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
