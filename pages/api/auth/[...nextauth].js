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
        console.log("🚀 ~ authorize: ~ credentials:", credentials);

        try {
          // 서버에 인증 요청을 보냄
          const response = await axios.post(
            "https://server.bit-harbor.net/members/login",
            {
              email,
              password,
            }
          );
          const authorization = response.headers.get("authorization");
          const refresh = response.headers.get("refresh");

          // console.log("authorization : ", authorization);
          // console.log("refresh : ", refresh);

          let db = await membersData();
          let findUser = db.find(
            (member) => member.email === credentials.email
          );
          //console.log("findUser : ", findUser);
          if (!findUser) {
            console.log("해당 이메일은 없음");
            return null;
          }

          if (findUser) {
            const user = {
              id: findUser.memberId,
              name: findUser.userName,
              userNickname: findUser.userNickname,
              email: findUser.email,
              memberId: findUser.memberId,
              authorization: authorization,
              refresh: refresh,
            };
            console.log("찾은회원", user);
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
    jwt: async ({ token, trigger, user, session }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.userNickname = user.userNickname;
        token.user.email = user.email;
        token.user.memberId = user.memberId;
        token.user.authorization = user.authorization;
        token.user.refresh = user.refresh;
      }
      // 조건문 에러 session 값은 userNickname, userName 프로퍼티만 존재함 name 프로퍼티 없음
      // if (trigger === "update" && session.name) {
      if (trigger === "update") {
        // 클라이언트에서 보낸 변경된 회원 정보를 세션에 반영
        token.user.userNickname = session.userNickname;
        token.user.userName = session.userName;

        console.log("회원", token);
        console.log("trigger", trigger);
        console.log("session", session);
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
