"use client";

export default async function PageNumber() {
  let count = 0;
  let pageNum = 1;
  let dbSize = 10;
  return (
    <div className="pager">
      <button
        onClick={() => {
          router.back();
        }}
      >
        <img src="/navigate_before.svg" alt="prev" />
      </button>
      {dbSize >= (count += 10) ? (
        <button
          onClick={(e) => {
            // fetch(
            //   "http://ec2-13-125-193-97.ap-northeast-2.compute.amazonaws.com:8080/community?page=0&size=10"
            // );
          }}
        >
          {pageNum}
        </button>
      ) : null}

      <button
        onClick={() => {
          router.forward();
        }}
      >
        <img
          src="/navigate_before.svg"
          alt="next"
          style={{ transform: "rotate(180deg)" }}
        />
      </button>
    </div>
  );
}
