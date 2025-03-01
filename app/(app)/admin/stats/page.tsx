"use client";
import React, { useContext, useEffect, useState } from "react";
import DashboardHeader from "../../../../components/common/dashboardHeader";
import { AppContext } from "../../../(app)/context";
import ReactApexChart from "react-apexcharts";
import instance from "../../../instance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function AdminStats() {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  const [mount, setMount] = useState<boolean>(false);
  const [stats, setStats] = useState({
    loading: true,
    packageSales: {
      successfulSalesData: [],
      failedSalesData: [],
      monthDataSeries1: { prices: [], dates: [] },
    },
    subscriptionSales: {
      successfulSalesData: [],
      failedSalesData: [],
      monthDataSeries1: { prices: [], dates: [] },
    },
    redirects: {
      activeRedirectsData: [],
      passiveRedirectsData: [],
      monthDataSeries1: { prices: [], dates: [] },
    },
  });
  useEffect(() => {
    setStats((prevStats) => ({ ...prevStats, loading: true }));
    instance
      .post("statictics")
      .then((res) => {
        if (res.data.status === "ok") {
          console.log("receivedStatsData", res.data);
          setStats({
            loading: false,
            packageSales: res.data.packageSales,
            subscriptionSales: res.data.subscriptionSales,
            redirects: res.data.redirects,
          });
        } else {
          toast.error("İstatistikler yüklenirken bir hata oluştu.");
        }
      })
      .catch(() => {
        toast.error("İstatistikler yüklenirken bir hata oluştu.");
      });
  }, [state.loading]);
  const generateChartData = (salesData: any) => ({
    series: [
      {
        name: "Başarılı Satışlar",
        data: salesData.successfulSalesData || [],
        color: "#00FF00",
        type: "area",
      },
      {
        name: "Başarısız Satışlar",
        data: salesData.failedSalesData || [],
        color: "#FF0000",
        type: "area",
      },
      {
        name: "Toplam Satışlar",
        data: salesData.monthDataSeries1.prices || [],
        color: "#ffffff",
        type: "area",
      },
    ],
    options: {
      grid: {
        padding: { left: 0, right: 5, top: 0, bottom: -1 },
        borderColor: "#252525",
      },
      theme: { mode: "dark" as any },
      chart: {
        toolbar: { show: false },
        background: "transparent" as any,
        type: "area" as any,
        zoom: { enabled: false },
      },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth" as any },
      labels: salesData.monthDataSeries1.dates || [],
      xaxis: { type: "datetime" as any },
      yaxis: { opposite: true },
    },
  });
  const generateRedirectsChartData = (redirects: any) => ({
    series: [
      {
        name: "Aktif Yönlendirmeler",
        data: redirects.activeRedirectsData || [],
        color: "#00FF00",
        type: "area",
      },
      {
        name: "Pasif Yönlendirmeler",
        data: redirects.passiveRedirectsData || [],
        color: "#FF0000",
        type: "area",
      },
      {
        name: "Toplam Yönlendirmeler",
        data: redirects.monthDataSeries1.prices || [],
        color: "#ffffff",
        type: "area",
      },
    ],
    options: {
      grid: {
        padding: { left: 0, right: 5, top: 0, bottom: -1 },
        borderColor: "#252525",
      },
      theme: { mode: "dark" as any },
      chart: {
        toolbar: { show: false },
        background: "transparent" as any,
        type: "area" as any,
        zoom: { enabled: false },
      },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth" as any },
      labels: redirects.monthDataSeries1.dates || [],
      xaxis: { type: "datetime" as any },
      yaxis: { opposite: true },
    },
  });
  const packageChart = generateChartData(stats.packageSales);
  const subscriptionChart = generateChartData(stats.subscriptionSales);
  const redirectsChart = generateRedirectsChartData(stats.redirects);
  useEffect(() => {
    if (window && typeof window !== "undefined") {
      setMount(true);
    } else {
      setMount(false);
    }
  }, []);
  return (
    mount && (
      <div className="flex space-y-2.5 flex-col items-start px-5 py-4 justify-start w-full h-full">
        <DashboardHeader page="İstatistikler" />
        <div className="w-full gap-3 grid z-50 grid-cols-1 grid-rows-3 md:grid-rows-2 md:grid-cols-2 lg:grid-cols-2 lg:grid-rows-2 xl:grid-cols-3 xl:grid-rows-1">
          <div className="neon-box-2 min-h-[140px] lg:min-h-[150px] rounded-3xl flex flex-col items-start justify-start transition-all ease-out duration-200 border border-transparent bg-gradient-to-br backdrop-blur-md pt-6 px-6">
            <span className="text-lg font-medium text-white">
              Paket Satışları
            </span>
            <div className="w-full h-full">
              <ReactApexChart
                options={packageChart.options}
                series={packageChart.series}
                type="area"
                height={280}
              />
            </div>
          </div>
          <div className="neon-box-2 min-h-[140px] lg:min-h-[150px] rounded-3xl flex flex-col items-start justify-start transition-all ease-out duration-200 border border-transparent bg-gradient-to-br backdrop-blur-md pt-6 px-6">
            <span className="text-lg font-medium text-white">
              Abonelik Satışları
            </span>
            <div className="w-full h-full">
              <ReactApexChart
                options={subscriptionChart.options}
                series={subscriptionChart.series}
                type="area"
                height={280}
              />
            </div>
          </div>
          <div className="neon-box-2 min-h-[140px] lg:min-h-[150px] rounded-3xl flex flex-col items-start justify-start transition-all ease-out duration-200 border border-transparent bg-gradient-to-br backdrop-blur-md pt-6 px-6">
            <span className="text-lg font-medium text-white">
              Yönlendirmeler
            </span>
            <div className="w-full h-full">
              <ReactApexChart
                options={redirectsChart.options}
                series={redirectsChart.series}
                type="area"
                height={280}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
