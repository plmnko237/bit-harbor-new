import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { membersData } from "@/util/db_member";

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const { email, password } = credentials;

        try {
          // 서버에 인증 요청을 보냄
          const response = await axios.post(
            "http://ec2-13-125-193-97.ap-northeast-2.compute.amazonaws.com:8080/members/login",
            {
              email,
              password,
            }
          );
          const authorization = response.headers.get("authorization");
          const refresh = response.headers.get("refresh");

          console.log("authorization : ", authorization);
          console.log("refresh : ", refresh);

          let db = await membersData();
          let findUser = db.find(
            (member) => member.email === credentials.email
          );
          console.log("findUser : ", findUser);
          if (!findUser) {
            console.log("해당 이메일은 없음");
            return null;
          }

          if (findUser) {
            const user = {
              id: findUser.memberId,
              name: findUser.userName,
              email: findUser.email,
              memberId: findUser.memberId,
              authorization: authorization,
              refresh: refresh,
            };
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("로그인 오류:", error);
          return Promise.resolve(null);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30일
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {
          name: user.name,
          email: user.email,
          memberId: user.memberId,
          authorization: user.authorization,
          refresh: user.refresh,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/members",
  },
};

export default NextAuth(authOptions);
