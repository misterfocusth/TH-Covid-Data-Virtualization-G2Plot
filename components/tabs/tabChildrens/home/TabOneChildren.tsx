import dynamic from "next/dynamic";
import { InputNumber, Row, Slider } from "antd";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Redux
import { useSelector } from "react-redux";
import { AppState } from "../../../../store";

// Type
import { ChartsData } from "../../../../types/ChartsData";

const TabOneChildren: React.FC = () => {
  // Redux
  const weekData = useSelector((state: AppState) => state.covidData.weekData);
  const timelineData = useSelector((state: AppState) => state.covidData.timelineData);
  const timelineProvincesData = useSelector(
    (state: AppState) => state.covidData.timelineProvincesData
  );
  const provincesData = useSelector((state: AppState) => state.covidData.provincesData);

  // State
  const [filteredtimelineData, setFilteredTimelineData] = useState<any[]>([]);
  const [filteredTimelineProvincesData, setFilteredTimelineProvincesData] = useState<any[]>([]);
  const [selectedWeekRange, setSelectedWeekRange] = useState<number>(11); // Default: 12 Weeks
  const [newCaseChartData, setNewCaseChartData] = useState<number[]>([]);

  // Charts State
  const [chartsData, setChartsData] = useState<ChartsData>({
    weeknum: [],

    new_case_excludeabroad: [], // new cases domestic
    case_foreign: [], // new cases abroad
    case_prison: [], // new cases in prison
    case_walkin: [], // new cases by walk-in test
    total_case: [],

    new_recovered: [],
    total_recovered: [],
  });

  const handleRangeChange = (value: any) => {
    setDataRange(value);
  };

  const setDataRange = (weekRange: number = 11) => {
    let _timelineData = timelineData?.slice();
    _timelineData = _timelineData!.sort().reverse().slice(0, weekRange).reverse();

    const y = timelineProvincesData?.slice();
    y?.sort()
      .reverse()
      .slice(0, weekRange * 79);

    const tempChartsData: ChartsData = {
      weeknum: [],

      new_case_excludeabroad: [], // new cases domestic
      case_foreign: [], // new cases abroad
      case_prison: [], // new cases in prison
      case_walkin: [], // new cases by walk-in test
      total_case: [],

      new_recovered: [],
      total_recovered: [],
    };

    for (let z = 0; z <= weekRange - 1; z++) {
      tempChartsData.weeknum.push("สัปดาห์ที่ " + _timelineData![z].weeknum);
      tempChartsData.new_case_excludeabroad.push(_timelineData![z].new_case_excludeabroad);
      tempChartsData.case_foreign.push(_timelineData![z].case_foreign);
      tempChartsData.case_prison.push(_timelineData![z].case_prison);
      tempChartsData.case_walkin.push(_timelineData![z].case_walkin);
      tempChartsData.total_case.push(_timelineData![z].total_case);
      tempChartsData.new_recovered.push(_timelineData![z].new_recovered);
      tempChartsData.total_recovered.push(_timelineData![z].total_recovered);
    }

    setSelectedWeekRange(weekRange);
    setChartsData(tempChartsData);
    setFilteredTimelineData(_timelineData!);
    setFilteredTimelineProvincesData(y!);
  };

  useEffect(() => {
    setDataRange();
  }, []);

  return (
    <div>
      <div>
        <p>
          ช่วงระยะเวลาที่ต้องการดูข้อมูลย้อนหลัง (ค่าเริ่มต้น : 12 สัปดาห์ / 3 เดือน) สูงสุด 52
          สัปดาห์
        </p>
        <div>
          <Row className="flex justify-around">
            <Slider
              className="w-7/12"
              min={1}
              max={52}
              value={selectedWeekRange + 1}
              onChange={(value) => handleRangeChange(value - 1)}
            />
            <InputNumber
              className="w-1/3"
              min={0}
              max={52}
              disabled
              value={selectedWeekRange + 1}
              addonAfter={<p>สัปดาห์</p>}
            />
          </Row>
        </div>

        <div className="mt-4">
          <div className="p-2 bg-white border-gray-200 rounded-lg shadow-md border">
            <p className="font-bold p-2">สถิติผู้ป่วยรายใหม่ย้อนหลัง</p>
            <Chart
              options={{
                chart: {
                  id: "basic-bar",
                },
                dataLabels: {
                  enabled: false,
                },
                stroke: {
                  curve: "smooth",
                },
                xaxis: {
                  categories: chartsData.weeknum,
                },
              }}
              series={[
                {
                  name: "จำนวนผู้ป่วยรายใหม่ (ในประเทศ)",
                  data: chartsData.case_walkin,
                  color: "red",
                },
              ]}
              type="area"
              height={350}
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabOneChildren;
