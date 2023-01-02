import React, { useState } from "react";
import {
  InfoCircleFilled,
  HomeFilled,
  AreaChartOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

// Redux
import type { AppState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedKeys, toggleMenu } from "../../slices/menuSlice";
import { setCurrentPage } from "../../slices/pageSlice";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("หน้าแรก", "/", <HomeFilled />),
  getItem("ข้อมูลแนวโน้มสถานการณ์ย้อนหลัง", "/timeline", <AreaChartOutlined />),
  getItem("ข้อมูลแบบแยกตามจังหวัด", "/provinces", <PieChartOutlined />),
  getItem("เกี่ยวกับ", "/about", <InfoCircleFilled />),
];

export const CustomMenu: React.FC = () => {
  // Redux
  const selectedKeys = useSelector((state: AppState) => state.menu.selectedKeys);
  const currentPage = useSelector((state: AppState) => state.page.currentPage);

  const dispatch = useDispatch();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    dispatch(setSelectedKeys(e.key));
    dispatch(setCurrentPage(e.key));
    dispatch(toggleMenu());
  };

  return (
    <div className="p-2">
      <Menu
        className="px-2 py-2 drop-shadow-lg rounded-lg"
        onClick={onClick}
        selectedKeys={[selectedKeys]}
        mode="inline"
        items={items}
      />
    </div>
  );
};
