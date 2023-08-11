import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { getGoalList } from "../../../helper/db-utils";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const token = await getToken({ req });

      console.log("현재 로그인한 사람", token);

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
