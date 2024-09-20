import ReactEcharts from "echarts-for-react";
import { useLoaderData } from "react-router-dom";

const RecordDetail = () => {
  const { data } = useLoaderData();

  console.log(data);

  const tempValue = parseInt(data?.bodyTemperature?.value);
  const tempUnit = data?.bodyTemperature?.unit;
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }; // Format: "20 Jul 2024"
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const tempData = {
    tooltip: {
      formatter: "{a} <br/>{b} : {c} mmHg",
    },
    series: [
      {
        name: "Systolic",
        type: "gauge",
        detail: { formatter: "{value} bph" },
        data: [{ value: `${tempValue}`, name: `${tempUnit}` }],
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.3, "#00e396"], // Green for normal
              [0.6, "#feb019"], // Yellow for warning
              [1, "#ff4560"], // Red for danger
            ],
          },
        },
        pointer: {
          width: 5,
        },
        splitLine: {
          length: 10,
        },
        axisTick: {
          length: 5,
        },
      },
    ],
  };
  const heartData = {
    tooltip: {
      formatter: "{a} <br/>{b} : {c} mmHg",
    },
    series: [
      {
        name: "Systolic",
        type: "gauge",
        detail: { formatter: "{value} bph" },
        data: [{ value: `${data?.heartRate}`, name: `` }],
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.3, "#00e396"], // Green for normal
              [0.6, "#feb019"], // Yellow for warning
              [1, "#ff4560"], // Red for danger
            ],
          },
        },
        pointer: {
          width: 5,
        },
        splitLine: {
          length: 10,
        },
        axisTick: {
          length: 5,
        },
      },
    ],
  };
  const bloodPresureDiastolic = {
    tooltip: {
      formatter: "{a} <br/>{b} : {c} mmHg",
    },
    series: [
      {
        name: "Systolic",
        type: "gauge",
        detail: { formatter: "{value} mmHg" },
        data: [
          { value: `${data?.bloodPressure.diastolic}`, name: `diastolic` },
        ],
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.3, "#00e396"], // Green for normal
              [0.6, "#feb019"], // Yellow for warning
              [1, "#ff4560"], // Red for danger
            ],
          },
        },
        pointer: {
          width: 5,
        },
        splitLine: {
          length: 10,
        },
        axisTick: {
          length: 5,
        },
      },
    ],
  };
  const bloodPresureSystolic = {
    tooltip: {
      formatter: "{a} <br/>{b} : {c} mmHg",
    },
    series: [
      {
        name: "Systolic",
        type: "gauge",
        detail: { formatter: "{value} mmHg" },
        data: [{ value: `${data?.bloodPressure.systolic}`, name: `systolic` }],
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.3, "#00e396"], // Green for normal
              [0.6, "#feb019"], // Yellow for warning
              [1, "#ff4560"], // Red for danger
            ],
          },
        },
        pointer: {
          width: 5,
        },
        splitLine: {
          length: 10,
        },
        axisTick: {
          length: 5,
        },
      },
    ],
  };

  return (
    <>
      <h1 className="text-lg font-bold mb-5">Record Details</h1>
      {formatDate(data?.date)}
      <div className="grid lg:grid-cols-2 gap-4 ">
        <div className="shadow-lg p-4">
          <p className="text-center font-bold"> Body Temperature</p>
          <ReactEcharts
            option={tempData}
            style={{ height: 400, width: "100%" }}
          />
        </div>
        <div className="shadow-lg p-4">
          <p className="text-center font-bold"> Heart Rate</p>
          <ReactEcharts
            option={heartData}
            style={{ height: 400, width: "100%" }}
          />
        </div>
      </div>
      <div className="shadow-lg p-4 mt-20">
        <p className="text-center font-bold"> Heart Rate</p>
        <div className="grid lg:grid-cols-2">
          <ReactEcharts
            option={bloodPresureDiastolic}
            style={{ height: 400, width: "100%" }}
          />
          <ReactEcharts
            option={bloodPresureSystolic}
            style={{ height: 400, width: "100%" }}
          />
        </div>
      </div>
    </>
  );
};

export default RecordDetail;
