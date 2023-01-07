import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";

// Redux
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import { setCurrentPage } from "../../slices/pageSlice";

export const TopNewCaseProvincesTable: React.FC<{ data: any[] }> = ({ data }) => {
  const provincesData = useSelector((state: AppState) => state.covidData.provincesData);
  const [sortedProvincesData, setSortedProvincesData] = useState<any[] | null>([]);

  useEffect(() => {
    function sortProvincesData() {
      const x = provincesData!.slice();
      x!.sort((a, b) => b.new_case - a.new_case);
      setSortedProvincesData(x!.slice(1, 11));
    }

    sortProvincesData();
  }, []);

  const formatNumber = (number: number) => {
    return number.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <caption className="mb-5 text-lg font-bold text-left text-gray-900 bg-whites">
          สถิติผู้ป่วยรายใหม่ประจำจังหวัด (รายสัปดาห์)
          <p className="mt-1 text-sm font-normal text-gray-500">
            จังหวัดในประเทศไทยที่มีอัตราผู้ป่วยรายใหม่และผู้ป่วยสะสมมากที่สุด 10
            อันดับแรกประจำอาทิตย์นี้
          </p>
        </caption>
        <thead className="text-gray-700 bg-gray-50">
          <tr>
            <th scope="col" className="px-0 py-2">
              อันดับ
            </th>
            <th scope="col" className="px-2 py-2">
              จังหวัด
            </th>
            <th scope="col" className="px-2 py-2">
              ผู้ป่วยรายใหม่
            </th>
            <th scope="col" className="px-2 py-2">
              ผู้ป่วยสะสม
            </th>
          </tr>
        </thead>

        <tbody>
          {sortedProvincesData?.map((data, index) => (
            <tr className="bg-white border-b" key={index}>
              <td className="px-2 py-2">{index + 1}</td>
              <th scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap">
                {data.province}
              </th>
              <td className="px-2 py-2 text-red-600 font-bold">{formatNumber(data.new_case)}</td>
              <td className="px-2 py-2">{formatNumber(data.total_case)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
