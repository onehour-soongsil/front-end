import bcrypt from "bcrypt";
import { getToken } from "next-auth/jwt";
import { findUserByEmail } from "../../../helper/db-utils";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const token = await getToken({ req });
      if (!token) {
        throw new Error("토큰이 유효하지 않습니다...");
      }
      const user = await findUserByEmail(token.email);
      const pwcheck = await bcrypt.compare(req.body.password, user.password);
      if (!pwcheck) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }

      res.status(200).json("비밀번호가 일치합니다!");
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
}
