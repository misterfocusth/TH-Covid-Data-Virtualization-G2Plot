import { Spin } from "antd";

export default function MyLoader() {
  return (
    <div className="flex min-h-screen min-w-screen justify-center items-center">
      <Spin size="large" tip="กำลังโหลดข้อมูล..." />
    </div>
  );
}
