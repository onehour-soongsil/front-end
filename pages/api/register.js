import bcrypt from "bcrypt";
import { findUserByEmail, insertDocument } from "../../helper/db-utils";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const user = await findUserByEmail(req.body.email);
      if (user) {
        throw new Error("이미 가입한 회원입니다.");
      }

      const hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash;
      req.body.confirm = hash;
      await insertDocument("users", { ...req.body, image: "/images/basic-avatar.png" });
      res.status(200).json("가입에 성공했습니다!");
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
}
