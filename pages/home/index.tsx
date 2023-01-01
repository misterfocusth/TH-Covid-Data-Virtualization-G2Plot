import { InferGetStaticPropsType } from "next";
import { stringify } from "querystring";
import { wrapper } from "../../store";

// Icons
import {
  InfoCircleOutlined,
  UpCircleFilled,
  UpCircleOutlined,
} from "@ant-design/icons";

// React
import react, { useEffect, useState } from "react";
import { Divider, Spin } from "antd";
import MyLoader from "../../components/loader/MyLoader";

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [weekData, setWeekData] = useState<any[]>([]);
  const [timelineData, setTimelineData] = useState<any[]>([]);
  const [probincesData, setProvincesData] = useState<any[]>([]);

  useEffect(() => {
    async function getData() {
      console.log("Getting Data...");

      const REQUEST_WEEK_DATA_URL =
        "https://covid19.ddc.moph.go.th/api/Cases/today-cases-all";
      const REQUEST_TIMELINE_DATA_URL =
        "https://covid19.ddc.moph.go.th/api/Cases/timeline-cases-all";
      const REQUEST_PROVINCES_DATA =
        "https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces";

      const weekDataRequest = await fetch(REQUEST_WEEK_DATA_URL);
      const timelineDataRequest = await fetch(REQUEST_TIMELINE_DATA_URL);
      const provincesDataRequest = await fetch(REQUEST_PROVINCES_DATA);

      const weekDataResponse = weekDataRequest.json();
      const timelineDataResponse = timelineDataRequest.json();
      const provincesDataResponse = provincesDataRequest.json();

      Promise.all([
        weekDataResponse,
        timelineDataResponse,
        provincesDataResponse,
      ]).then((res: any[]) => {
        setWeekData(res[0]);
        setTimelineData(res[1]);
        setProvincesData(res[2]);
        setIsLoading(false);
      });
    }

    getData();
  }, []);

  const formatNumber = (number: number) => {
    return number.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  if (isLoading) return <MyLoader />;

  return (
    <div className="p-2">
      <div className="mt-2">
        <p className="font-bold text-lg text-center text-blue-500">
          Overview ภาพรวมสถานการณ์โควิด-19
        </p>
      </div>

      <div className="flex mt-2 flex-wrap justify-center gap-2">
        <div className="w-full p-4 bg-red-300 border border-gray-200 rounded-lg shadow-md m-1">
          <p className="text-lg font-bold">
            ผู้ป่วยรายใหม่ / สะสม (ประจำสัปดาห์)
          </p>

          <div className="flex justify-around">
            <div className="mt-2">
              <p className="text-sm text-center">รายใหม่ประจำสัปดาห์</p>
              <div className="flex items-center gap-2 justify-center">
                <UpCircleOutlined style={{ fontSize: "20px", color: "red" }} />
                <p className="font-bold text-lg underline">
                  {formatNumber(weekData[0].new_case)} คน
                </p>
              </div>
            </div>

            <div className="mt-2 ml-4">
              <p className="text-sm text-center">ผู้ป่วยสะสม</p>
              <div className="flex items-center gap-2">
                <p className="font-bold text-lg underline">
                  {formatNumber(weekData[0].total_case)} คน
                </p>
              </div>
            </div>
          </div>

          <Divider className="m-2 mt-3" />

          <div className="mt-3">
            <p className="font-bold">ผู้ป่วยรายใหม่ตามประเภท (ประจำสัปดาห์)</p>
            <div className="mt-2">
              <p className="text-sm">
                รายใหม่ในประเทศ จำนวน :{" "}
                <span className="underline font-bold">
                  {formatNumber(weekData[0].new_case_excludeabroad)} คน
                </span>
              </p>
              <p className="text-sm">
                รายใหม่จากต่างประเทศ จำนวน :{" "}
                <span className="underline font-bold">
                  {formatNumber(weekData[0].case_foreign)} คน
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="w-44 p-4 bg-green-300 border border-gray-200 rounded-lg shadow-md text-center">
          <p className=" font-bold">ผู้หายป่วยรายใหม่</p>
          <div className="flex items-center gap-2 mt-2 justify-center">
            <UpCircleOutlined style={{ fontSize: "20px", color: "green" }} />
            <p className="font-bold text-lg underline">
              {formatNumber(weekData[0].new_recovered)} คน
            </p>
          </div>
          <p className="text-sm mt-2">
            สะสม :{" "}
            <span className="underline">
              {formatNumber(weekData[0].total_recovered)} คน
            </span>
          </p>
        </div>

        <div className="w-44 p-4 bg-gray-300 border border-gray-200 rounded-lg shadow-md text-center">
          <p className=" font-bold">ผู้เสียชีวิตรายใหม่</p>
          <div className="flex items-center gap-2 mt-2 justify-center">
            <UpCircleOutlined style={{ fontSize: "20px" }} />
            <p className="font-bold text-lg underline">
              {formatNumber(weekData[0].new_death)} คน
            </p>
          </div>
          <p className="text-sm mt-2">
            สะสม :{" "}
            <span className="underline">
              {formatNumber(weekData[0].total_death)} คน
            </span>
          </p>
        </div>

        <div className="w-full p-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-md m-1">
          <div className="flex items-center gap-2 text-sm">
            <InfoCircleOutlined />
            <p>
              อัพเดทล่าสุด ณ วันที่ :{" "}
              <span className="font-bold underline">
                {weekData[0].update_date}
              </span>
            </p>
          </div>
          <div className="text-sm mt-1">
            <p>
              ขอบคุณข้อมูลจาก :{" "}
              <a href="https://covid19.ddc.moph.go.th/" className="underline">
                COVID-19 API
              </a>{" "}
              กรมควบคุมโรค กระทรวงสาธารณสุข *( ข้อมูลจะถูกอัปเดตภายใน
              <span className="font-bold underline">วันจันทร์</span>
              ของทุกสัปดาห์)
            </p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

// const REQUEST_URL =
//   "https://covid19.ddc.moph.go.th/api/Cases/today-cases-all";
// const response = await fetch(REQUEST_URL);
// const data = await response.json();
// return {
//   props: {
//     data,
//   },
//   revalidate: 30,
// };

export default HomePage;
