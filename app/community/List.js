import dynamic from "next/dynamic";
import Link from "next/link";

export default function List({ dbData, i }) {
  const CardDetail = dynamic(() => import("./CardDetail"), {
    ssr: false,
  });
  return (
    <li className="conList" key={i}>
      <div className="conList-top">
        <Link
          prefetch={false}
          href={"/community/detail/" + dbData[i].communityId}
        >
          {/* 제목부분 */}
          <p>{dbData[i].title}</p>
        </Link>
        {/* 닉네임, 조회수, 댓글 */}
        <CardDetail dbData={dbData} i={i} />
      </div>
      <div className="conList-tag">
        {dbData[i] &&
          dbData[i].tags.map((a, i) => {
            return (
              <div className="tag" key={i}>
                {a}
              </div>
            );
          })}
      </div>
    </li>
  );
}
