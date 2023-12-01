import TopSec from "./Topsec"; //공통 top영역
import List from "./List"; //내용 1개

export default async function Community() {
  let dbData;
  const res = await fetch(
    "https://4a14-118-32-224-80.ngrok-free.app/community",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
      mode: "cors",
      cache: "no-store",
    }
  )
    .then((r) => {
      if (r.status == 200) {
        return r.json();
      } else {
        return <div className="loading" />;
      }
    })
    .then((result) => {
      dbData = result.data;
      console.log(dbData);
    })
    .catch((error) => {
      console.log(error);
      return <div className="loading" />; //인터넷문제 등으로 실패시 실행할코드
    });
  console.log("res:" + res);
  return (
    <main>
      <TopSec />
      <div className="container">
        <ul>
          {dbData.map((a, i) => (
            <List dbData={dbData} i={i} />
          ))}
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
