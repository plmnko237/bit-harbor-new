/*eslint-disable*/
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LogoutBtn from "./members/LogoutBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { membersData } from "@/util/db_member";
import Gnb from "./Gnb";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <div className="con">
            <h1>
              <Link href={"/"}>
                <img src="/logo_color.svg" />
              </Link>
            </h1>
            <Gnb />

            {session ? (
              <div className="loginActive">
                <span>{session.user.name}님</span>
                <LogoutBtn />
              </div>
            ) : (
              <Link href={"/members"}>
                <button className="login">
                  <img src="/person.svg" alt="login" />
                  <span>로그인</span>
                </button>
              </Link>
            )}
          </div>
        </header>
        {children}
        <footer>
          <div className="con">
            <h2>
              <Link href={"/"}>
                <img src="/footer_logo.svg" />
              </Link>
            </h2>
            <p>&copy; 2023 BitHarbor. all rights reserved.</p>
            <div className="sns-icons">
              <ul>
                <li>
                  <Link
                    href={
                      "https://www.notion.so/side-project-04b609ff07564e41a5cdbb3f54523c8f?pvs=4"
                    }
                  >
                    <img src="/notion_button.svg" alt="notion" />
                  </Link>
                </li>
                <li>
                  <Link href={""}>
                    <img src="/git_button.svg" alt="notion" />
                  </Link>
                </li>
                <li>
                  <Link
                    href={
                      "https://www.figma.com/file/lZTKPzCMlPT8kMHdwgs4B7/main_page?type=design&node-id=44%3A33733&mode=design&t=MvuVAV1e1zPyfoh5-1"
                    }
                  >
                    <img src="/figma_button.svg" alt="notion" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
