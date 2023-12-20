import dynamic from "next/dynamic";
import TopSec from "./Topsec"; //공통 top영역
import { fetchData } from "@/util/db_community";

export default async function Community() {
  const PageNumber = dynamic(() => import("./Pagenumber"), {
    ssr: false,
  });
  const List = dynamic(() => import("./List"), {
    ssr: false,
  });
  const dbData = await fetchData();
  return (
    <main>
      <TopSec />
      <div className="container">
        <ul>
          {dbData &&
            dbData.map((a, i) => <List dbData={dbData} i={i} key={i} />)}
        </ul>
      </div>
      {/* 페이저 */}
      <PageNumber />
    </main>
  );
}
