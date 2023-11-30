import TopSec from "./Topsec"; //공통 top영역
import List from "./List"; //내용 1개
import Link from "next/link";

export default function Qna() {
  return (
    <main>
      <TopSec />
      <div className="container">
        <ul>
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
        </ul>
      </div>
      <div className="pager">
        <button>
          <img src="/navigate_before.svg" alt="prev" />
        </button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>10</button>
        <button>
          <img
            src="/navigate_before.svg"
            alt="next"
            style={{ transform: "rotate(180deg)" }}
          />
        </button>
      </div>
    </main>
  );
}
