import { getGoalList } from "../../../helper/db-utils";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const goalList = await getGoalList();
      if (!goalList) {
        throw new Error("데이터를 가져오는데 실패했습니다...");
      }
      res.status(200).json(goalList);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
