import { getToken } from "next-auth/jwt";
import { deleteSelectedDocument } from "../../../../helper/db-utils";

export default async function handler(req, res) {
  const { deleteGoalId } = req.query;

  if (req.method === "DELETE") {
    try {
      const token = await getToken({ req });

      if (!token) {
        throw new Error("토큰이 유효하지 않습니다...");
      }

      const result = await deleteSelectedDocument("goal-list", deleteGoalId);
      if (!result) {
        throw new Error("데이터를 DB에 저장하는데 실패했습니다...");
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}
