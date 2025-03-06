"use client";
import React, { useContext } from "react";
import {
  Calendar,
  CheckCircle,
  ExternalLink,
  Globe,
  Hash,
  HashIcon,
  Package as PkgIcon,
  Ticket,
  TicketCheck,
  User,
} from "lucide-react";
import DashboardHeader from "../../../components/common/dashboardHeader";
import { AppContext } from "../context";
import { Activity } from "../../../types";
import { useNavigate } from "react-router";
import { ActivityRow } from "./activities/page";

export default function AdminHome() {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);

  return (
    state.userData.permission === "admin" && (
      <div className="flex space-y-2.5 flex-col items-start px-5 py-4 justify-start w-full h-full">
        <DashboardHeader page={`Yönetim Paneli`} />
        <div className="w-full gap-3 grid z-50 grid-cols-1 grid-rows-4 md:grid-rows-2 md:grid-cols-2 lg:grid-cols-2 lg:grid-rows-2 xl:grid-cols-4 xl:grid-rows-1">
          {[
            {
              title: "Toplam Yönlendirme",
              icon: ExternalLink,
              bg: {
                from: "from-[#8929e2]/95",
                via: "via-[#6110e1]/95",
                to: "to-[#4f04e0]/95",
              },
              shadow: "shadow-[#5b21b6]/10",
            },
            {
              title: "Abonelikler",
              icon: Ticket,
              bg: {
                from: "from-[#892ae1]/95",
                via: "via-[#6814e1]/95",
                to: "to-[#5004e0]/95",
              },
              shadow: "shadow-[#1e40af]/10",
            },
            {
              title: "Paketler",
              icon: PkgIcon,
              bg: {
                from: "from-[#892ae1]/95",
                via: "via-[#6814e1]/95",
                to: "to-[#5004e0]/95",
              },
              shadow: "shadow-[#1e40af]/10",
            },
            {
              title: "Hesaplar",
              icon: TicketCheck,
              bg: {
                from: "from-[#e307c5]/95",
                via: "via-[#901cb0]/95",
                to: "to-[#4c2b9b]/95",
              },
              shadow: "shadow-[#ca8a04]/10",
            },
          ].map((item, index) => {
            const itemTitle = item.title
              .toString()
              .toLowerCase()
              .trim()
              .replace(/\s+/g, "");
            return (
              <div
                key={index}
                className={`relative neon-box-2 hover:cursor-pointer min-h-[140px] lg:min-h-[150px] rounded-3xl p-6 flex flex-row items-start justify-between transition-all ease-out duration-200 border border-transparent bg-gradient-to-br ${item.bg.from} ${item.bg.via} ${item.bg.to} backdrop-blur-md shadow-lg hover:shadow-xl`}
              >
                <div className="flex flex-col items-end justify-start space-y-3.5 h-full w-auto z-10">
                  <div
                    className={`relative p-4 rounded-full bg-white/20 shadow-sm`}
                  >
                    <item.icon
                      stroke="#ffffff"
                      strokeWidth={2.25}
                      height={22}
                      width={22}
                    />
                  </div>
                </div>
                <div className="flex flex-col ml-4 w-full space-y-1 items-start justify-start z-10">
                  <span className="text-2xl font-semibold text-white">
                    {!state.loading
                      ? itemTitle === "toplamyönlendirme"
                        ? state?.redirects?.length.toString()
                        : itemTitle === "paketler"
                        ? state.packages.length
                        : itemTitle === "hesaplar"
                        ? state.packages.reduce(
                            (sum, pkg) => sum + pkg.accounts.length,
                            0
                          )
                        : itemTitle === "abonelikler"
                        ? state.subscriptions.length
                        : "--"
                      : "Yükleniyor..."}
                  </span>
                  <p className="tracking-[-0.012em] text-[17px] font-medium text-white/90">
                    {item.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <h1 className="text-lg font-[450] text-zinc-800 dark:text-zinc-200">
            Aktivite Logları
          </h1>
          <h2
            onClick={() => navigate("/admin/activities")}
            className="text-md text-blue-500 hover:underline hover:cursor-pointer font-[450]"
          >
            Tümünü gör {"->"}
          </h2>
        </div>
        <div className="flex neon-box-2 overflow-x-auto overflow-y-auto flex-col bg-light/20 dark:bg-[#292929] border dark:border-zinc-700 border-light-border rounded-2xl w-full h-full">
          <table className="min-w-full w-full">
            <thead className="border-b dark:border-zinc-700 border-light-border/80 rounded-t-2xl w-full">
              <tr>
                <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] pl-3 py-2">
                  <div className="inline-flex items-center space-x-1.5">
                    <Hash
                      className="text-blue-500"
                      height={17}
                      width={17}
                      stroke="currentColor"
                    />
                    <span className="mt-px">Aktivite ID</span>
                  </div>
                </th>
                <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] py-2">
                  <div className="inline-flex items-center space-x-1.5">
                    <User
                      className="text-blue-500"
                      height={17}
                      width={17}
                      stroke="currentColor"
                    />
                    <span className="mt-px">Kullanıcı ID</span>
                  </div>
                </th>
                <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-3 py-2">
                  <div className="inline-flex items-center space-x-1.5">
                    <Globe
                      className="text-blue-500"
                      height={17}
                      width={17}
                      stroke="currentColor"
                    />
                    <span className="mt-px">Aktivite</span>
                  </div>
                </th>
                <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                  <div className="inline-flex items-center space-x-1.5">
                    <Calendar
                      className="text-blue-500"
                      height={17}
                      width={17}
                      stroke="currentColor"
                    />
                    <span className="mt-px">Zaman</span>
                  </div>
                </th>
                <th className="text-end dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] pr-3 py-2">
                  <div className="inline-flex items-center space-x-1.5">
                    <CheckCircle
                      className="text-blue-500"
                      height={17}
                      width={17}
                      stroke="currentColor"
                    />
                    <span className="mt-px">Durum</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-zinc-700 divide-light-border/80">
              {state.activities
                .slice(0, 5)
                .map((activity: Activity, index: number) => (
                  <ActivityRow activity={activity} index={index} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
}
