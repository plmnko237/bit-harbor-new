import dynamic from "next/dynamic";

const MyPageComponent = dynamic(() => import("./MyPageComponent"), {
  loading: () => <div className="loading">Loading...</div>,
});

export default function MyPage() {
  return <MyPageComponent />;
}
