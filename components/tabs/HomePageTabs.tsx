import React from "react";
import { Tabs } from "antd";
import TabOneChildren from "./tabChildrens/home/TabOneChildren";

const onChange = (key: string) => {
  console.log(key);
};

const HomePageTabs: React.FC = () => (
  <Tabs
    defaultActiveKey="1"
    onChange={onChange}
    items={[
      {
        label: `ข้อมูลย้อนหลังทั้งหมด`,
        key: "1",
        children: <TabOneChildren data={[]} />,
      },
      {
        label: `ข้อมูลผู้ป่วยรายใหม่`,
        key: "2",
        children: `Content of Tab Pane 2`,
      },
      {
        label: `ข้อมูลผู้หายป่วยรายใหม่`,
        key: "3",
        children: `Content of Tab Pane 3`,
      },
      {
        label: `ข้อมูลผู้เสียชีวิต`,
        key: "4",
        children: `Content of Tab Pane 4`,
      },
    ]}
  />
);

export default HomePageTabs;
