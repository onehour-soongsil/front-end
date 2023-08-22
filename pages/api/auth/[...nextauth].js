import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { findUserByEmail } from "../../../helper/db-utils";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // 1. 로그인페이지 폼을 자동생성해주는 코드
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "password", type: "password" },
      },

      // 2. 로그인 요청시, 실행되는 코드
      async authorize(credentials, req) {
        const user = await findUserByEmail(credentials.email);
        if (!user) {
          throw new Error("계정이 존재하지 않습니다.");
        }
        const pwcheck = await bcrypt.compare(credentials.password, user.password);
        if (!pwcheck) {
          throw new Error("비밀번호가 일치하지 않습니다.");
        }

        return user;
      },
    }),
  ],

  // jwt 토큰 방식 + 만료일 설정
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    // jwt 생성 시, 실행되는 코드
    // user 변수는 DB의 유저정보
    // token.user를 통해 jwt에 저장할 데이터를 생성할 수 있음

    jwt: async ({ token, user }) => {
      const newToken = { ...token };

      if (user) {
        newToken.user = {};
        newToken.user.nickname = user.nickname;
        newToken.user.email = user.email;
      }

      return newToken;
    },

    // 유저 세션이 조회될 때마다 실행되는 코드
    session: async ({ session, token }) => {
      const newSession = { ...session };

      newSession.user = token.user;

      return newSession;
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
