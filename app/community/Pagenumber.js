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
            //   "https://ba9b-118-32-224-80.ngrok-free.app/community?page=0&size=10"
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
