import TopSec from "./Topsec"; //공통 top영역
import List from "./List"; //내용 1개
import { fetchData } from "@/util/database";
import PageNumber from "./Pagenumber";
export const revalidate = 20;
export default async function Community() {
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
