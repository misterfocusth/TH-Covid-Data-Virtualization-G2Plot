// Icons
import { InfoCircleOutlined, UpCircleOutlined } from "@ant-design/icons";

// React
import { useEffect, useState } from "react";
import { Divider } from "antd";
import MyLoader from "../../components/loader/MyLoader";
import HomePageTabs from "../../components/tabs/HomePageTabs";

// Redux
import type { AppState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import {
  setWeekData,
  setTimelineData,
  setProvincesData,
  setSelectedWeekRange,
  setTimelineProvincesData,
} from "../../slices/covidDataSlice";
import TopNewCaseProvincesTable from "../../components/tables/TopNewCaseProvincesTable";

const HomePage: React.FC = () => {
  const [isLoading, _setIsLoading] = useState<boolean>(true);
  const [weekData, _setWeekData] = useState<any[]>([]);
  const [timelineData, _setTimelineData] = useState<any[]>([]);
  const [probincesData, _setProvincesData] = useState<any[]>([]);

  // Redux
  const dispatch = useDispatch();
  const prevWeekData = useSelector((state: AppState) => state.covidData.weekData);
  const prevTimelineData = useSelector((state: AppState) => state.covidData.timelineData);
  const prevProvincesData = useSelector((state: AppState) => state.covidData.provincesData);

  useEffect(() => {
    async function getData() {
      console.log("Getting Data...");

      const REQUEST_WEEK_DATA_URL = "https://covid19.ddc.moph.go.th/api/Cases/today-cases-all";
      const REQUEST_TIMELINE_DATA_URL =
        "https://covid19.ddc.moph.go.th/api/Cases/timeline-cases-all";
      const REQUEST_TIMELINE_PROVINCES_DATA =
        "https://covid19.ddc.moph.go.th/api/Cases/timeline-cases-by-provinces";
      const REQUEST_PROVINCES_DATA =
        "https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces";

      const weekDataRequest = await fetch(REQUEST_WEEK_DATA_URL);
      const timelineDataRequest = await fetch(REQUEST_TIMELINE_DATA_URL);
      const timelineProvincesDataRequest = await fetch(REQUEST_TIMELINE_PROVINCES_DATA);
      const provincesDataRequest = await fetch(REQUEST_PROVINCES_DATA);

      const weekDataResponse = weekDataRequest.json();
      const timelineDataResponse = timelineDataRequest.json();
      const timelineProvincesDataResponse = timelineProvincesDataRequest.json();
      const provincesDataResponse = provincesDataRequest.json();

      Promise.all([
        weekDataResponse,
        timelineDataResponse,
        timelineProvincesDataResponse,
        provincesDataResponse,
      ]).then((res: any[]) => {
        _setWeekData(res[0]);
        _setTimelineData(res[1]);
        _setProvincesData(res[2]);

        dispatch(setWeekData(res[0]));
        dispatch(setTimelineData(res[1]));
        dispatch(setTimelineProvincesData(res[2]));
        dispatch(setProvincesData(res[3]));

        _setIsLoading(false);
      });
    }

    if (!prevWeekData || !prevTimelineData || !prevProvincesData) {
      getData();
      console.log("Get new data");
    } else {
      _setWeekData(prevWeekData);
      _setTimelineData(prevTimelineData);
      _setProvincesData(prevProvincesData);
      _setIsLoading(false);
    }
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
          <p className="text-lg font-bold">ผู้ป่วยรายใหม่ / สะสม (ประจำสัปดาห์)</p>

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
            สะสม : <span className="underline">{formatNumber(weekData[0].total_recovered)} คน</span>
          </p>
        </div>

        <div className="w-44 p-4 bg-gray-300 border border-gray-200 rounded-lg shadow-md text-center">
          <p className=" font-bold">ผู้เสียชีวิตรายใหม่</p>
          <div className="flex items-center gap-2 mt-2 justify-center">
            <UpCircleOutlined style={{ fontSize: "20px" }} />
            <p className="font-bold text-lg underline">{formatNumber(weekData[0].new_death)} คน</p>
          </div>
          <p className="text-sm mt-2">
            สะสม : <span className="underline">{formatNumber(weekData[0].total_death)} คน</span>
          </p>
        </div>

        <div className="w-full p-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-md m-1">
          <div className="flex items-center gap-2 text-sm">
            <InfoCircleOutlined />
            <p>
              อัพเดทล่าสุด ณ วันที่ :{" "}
              <span className="font-bold underline">{weekData[0].update_date}</span>
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

      <div className="p-2 mt-2">
        <p className="font-bold text-lg">
          จังหวัดในประเทศไทยที่มีผู้ป่วยรายใหม่ / สะสมสูงที่สุด (ประจำสัปดาห์)
        </p>

        <div className="mt-2 p-4 border border-gray-200 rounded-lg shadow-md">
          <TopNewCaseProvincesTable />
        </div>

        <p className="underline mt-4 text-center">กดเพื่อไปหน้าดูข้อมูลแบบแยกตามจังหวัด {">>"}</p>
      </div>

      <div className="p-2 mt-2">
        <p className="font-bold text-lg">ชาร์ตสถิติข้อมูลย้อนหลังรายสัปดาห์</p>
        <HomePageTabs />
      </div>
    </div>
  );
};

export default HomePage;
