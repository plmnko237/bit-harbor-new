"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <div className="loading">Error! 다시 시도해주세요.</div>
      <button
        onClick={() => {
          reset();
        }}
      >
        새로고침
      </button>
    </div>
  );
}
