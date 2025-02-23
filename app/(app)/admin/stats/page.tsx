"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/common/dashboardHeader";
import { AppContext } from "@/app/(app)/context";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function AdminStats() {
  const router = useRouter();
  const { state } = useContext(AppContext);
  const series = {
    monthDataSeries1: {
      prices: [
        8107.85, 8128.0, 8122.9, 8165.5, 8340.7, 8423.7, 8423.5, 8514.3,
        8481.85, 8487.7, 8506.9, 8626.2, 8668.95, 8602.3, 8607.55, 8512.9,
        8496.25, 8600.65, 8881.1, 9340.85,
      ],
      dates: [
        "13 Nov 2017",
        "14 Nov 2017",
        "15 Nov 2017",
        "16 Nov 2017",
        "17 Nov 2017",
        "20 Nov 2017",
        "21 Nov 2017",
        "22 Nov 2017",
        "23 Nov 2017",
        "24 Nov 2017",
        "27 Nov 2017",
        "28 Nov 2017",
        "29 Nov 2017",
        "30 Nov 2017",
        "01 Dec 2017",
        "04 Dec 2017",
        "05 Dec 2017",
        "06 Dec 2017",
        "07 Dec 2017",
        "08 Dec 2017",
      ],
    },
  };
  const [chart, setChart] = useState<{
    series: Array<any>;
    options: ApexOptions;
  }>({
    series: [
      {
        name: "",
        data: series.monthDataSeries1.prices,
      },
    ],
    options: {
      grid: {
        padding: { left: 0, right: 0, top: 0, bottom: 0 },
        borderColor: "#444",
      },
      theme: { mode: "dark" },
      chart: {
        toolbar: { show: false },
        background: "transparent",
        type: "area",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      labels: series.monthDataSeries1.dates,
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        opposite: true,
      },
    },
  });
  return (
    <div className="flex space-y-2.5 flex-col items-start px-5 py-4 justify-start w-full h-full">
      <DashboardHeader page="İstatistikler" />
      <div className="w-full gap-3 grid z-50 grid-cols-1 grid-rows-3 md:grid-rows-2 md:grid-cols-2 lg:grid-cols-2 lg:grid-rows-2 xl:grid-cols-3 xl:grid-rows-1">
        <div className="first-line:relative neon-box-2 hover:cursor-pointer min-h-[140px] lg:min-h-[150px] rounded-3xl p-6 flex flex-row items-start justify-between transition-all ease-out duration-200 border border-transparent bg-gradient-to-br backdrop-blur-md">
          <div className="flex flex-col w-full space-y-1 items-start justify-start z-10">
            <span className="text-lg font-medium text-white">
              Paket Satışları
            </span>
            <div className="w-full">
              <ReactApexChart
                options={chart.options}
                series={chart.series}
                type="area"
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
