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
    successfulSalesData: [
      { x: new Date("2025-02-01").getTime(), y: 1 }, // 1 Şubat, 120 başarılı satış
      { x: new Date("2025-02-02").getTime(), y: 2 }, // 2 Şubat, 95 başarılı satış
      { x: new Date("2025-02-03").getTime(), y: 3 }, // 3 Şubat, 150 başarılı satış
      { x: new Date("2025-02-04").getTime(), y: 4 }, // 4 Şubat, 130 başarılı satış
      { x: new Date("2025-02-05").getTime(), y: 5 }, // 5 Şubat, 110 başarılı satış
    ],
    failedSalesData: [
      { x: new Date("2025-02-01").getTime(), y: 0 }, // 1 Şubat, 30 başarısız satış
      { x: new Date("2025-02-02").getTime(), y: 0 }, // 2 Şubat, 25 başarısız satış
      { x: new Date("2025-02-03").getTime(), y: 1 }, // 3 Şubat, 40 başarısız satış
      { x: new Date("2025-02-04").getTime(), y: 2 }, // 4 Şubat, 20 başarısız satış
      { x: new Date("2025-02-05").getTime(), y: 0 }, // 5 Şubat, 35 başarısız satış
    ],
    monthDataSeries1: {
      prices: [
        { x: new Date("2025-02-01").getTime(), y: 1 },
        { x: new Date("2025-02-02").getTime(), y: 2 },
        { x: new Date("2025-02-03").getTime(), y: 4 },
        { x: new Date("2025-02-04").getTime(), y: 6 },
        { x: new Date("2025-02-05").getTime(), y: 5 },
      ],
      dates: [
        "2025-02-01",
        "2025-02-02",
        "2025-02-03",
        "2025-02-04",
        "2025-02-05",
      ],
    },
  };
  const [chart, setChart] = useState<{
    series: Array<any>;
    options: ApexOptions;
  }>({
    series: [
      {
        name: "Başarılı Paket Satışları",
        data: series.successfulSalesData,
        color: "#00FF00", // Yeşil renk
        type: "area",
        curve: "smooth",
        stroke: {
          width: 0.1, // Line genişliği
        },
      },
      {
        name: "Başarısız Paket Satışları",
        data: series.failedSalesData,
        color: "#FF0000", // Kırmızı renk
        type: "area",
        curve: "smooth",
        stroke: {
          width: 0.1, // Line genişliği
        },
      },
      {
        name: "Toplam Satışlar",
        data: series.monthDataSeries1.prices,
        type: "area",
        curve: "smooth",
      },
    ],
    options: {
      grid: {
        padding: { left: 0, right: 5, top: 0, bottom: 0 },
        borderColor: "#252525",
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
        <div className="first-line:relative neon-box-2 hover:cursor-pointer min-h-[140px] lg:min-h-[150px] rounded-3xl flex flex-row items-start justify-between transition-all ease-out duration-200 border border-transparent bg-gradient-to-br backdrop-blur-md">
          <div className="flex flex-col w-full space-y-1 items-start justify-start z-10">
            <span className="text-lg px-6 pt-6 font-medium text-white">
              Paket Satışları
            </span>
            <div className="w-full pl-6">
              <ReactApexChart
                options={chart.options}
                series={chart.series}
                type="area"
                height={280}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
