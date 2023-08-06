import { insertDocument } from "../../../helper/db-utils";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const result = await insertDocument("goal-list", req.body);
      if (!result) {
        throw new Error("데이터를 DB에 저장하는데 실패했습니다...");
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}
