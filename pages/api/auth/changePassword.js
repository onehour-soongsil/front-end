import bcrypt from "bcrypt";
import { getToken } from "next-auth/jwt";
import { findUserByEmail, replaceDocument } from "../../../helper/db-utils";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const token = await getToken({ req });
      if (!token) {
        throw new Error("토큰이 유효하지 않습니다...");
      }

      if (req.body.password !== req.body.confirm) {
        throw new Error("비밀번호가 일치하지 않습니다...");
      }
      const user = await findUserByEmail(token.email);
      const hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash;
      req.body.confirm = hash;

      const result = await replaceDocument("users", user._id, req.body);

      if (!result) {
        throw new Error("비밀번호 변경에 실패했습니다...");
      }
      res.status(200).json("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
}
