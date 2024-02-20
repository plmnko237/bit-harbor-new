import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NaverProvider from "next-auth/providers/naver";
import GoogleProvider from "next-auth/providers/google";
import { membersData } from "@/util/db_member";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials, req, res) => {
        const { email, password } = credentials;
        const bodyData = JSON.stringify({ email, password });
        // console.log("🚀 ~ authorize: ~ credentials:", credentials);

        try {
          // 서버에 인증 요청을 보냄
          const response = await fetch(
            "https://server.bit-harbor.net/members/login",
            {
              method: "POST",
              body: bodyData,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const authorization = response.headers.get("authorization");
            const refresh = response.headers.get("refresh");

            let db = await membersData();
            let findUser = db.find(
              (member) => member.email === credentials.email
            );

            if (!findUser) {
              return null;
            }

            const user = {
              id: findUser.memberId,
              name: findUser.userName,
              userNickname: findUser.userNickname,
              email: findUser.email,
              memberId: findUser.memberId,
              profileNum: findUser.profileNum,
              authorization: authorization,
              refresh: refresh,
            };

            return user;
          } else {
            return res
              .status(401)
              .json({ error: "로그인 실패 - 비밀번호가 일치하지 않음" });
          }
        } catch (error) {
          console.error("nextauth로그인 오류:", error);
          return Promise.resolve(null);
        }
      },
    }),
    // NaverProvider({
    //   clientId: process.env.NAVER_CLIENT_ID,
    //   clientSecret: process.env.NAVER_CLIENT_SECRET,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
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
        token.user.profileNum = user.profileNum;
        token.user.authorization = user.authorization;
        token.user.refresh = user.refresh;
      }

      // 조건문 에러 session 값은 userNickname, userName 프로퍼티만 존재함 name 프로퍼티 없음
      // if (trigger === "update" && session.name) {
      if (trigger === "update") {
        token.user.userNickname = session.userNickname;
        token.user.userName = session.userName;
      }

      return token;
    },

    session: async ({ session, token }) => {
      //console.log("Session Callback:", session, token);
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
