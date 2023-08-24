import { getToken } from "next-auth/jwt";
import { deleteUser } from "../../../../helper/db-utils";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const token = await getToken({ req });

      if (!token) {
        throw new Error("토큰이 유효하지 않습니다...");
      }

      const result = await deleteUser("users", token.email);
      if (!result) {
        throw new Error("유저 삭제에 실패했습니다...");
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}
