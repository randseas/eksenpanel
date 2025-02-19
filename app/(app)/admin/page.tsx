"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  CheckCircle,
  Clock,
  Code,
  DotSquare,
  Edit,
  ExternalLink,
  Globe,
  HashIcon,
  IdCard,
  Link,
  Package as PkgIcon,
  ShieldCheck,
  SquareArrowOutUpRight,
  SquarePen,
  TicketCheck,
  Trash2,
  User,
} from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import DashboardHeader from "../../../components/common/dashboardHeader";
import { AppContext } from "../context";
import { Activity, Package, Redirect } from "@/types";
import { timeAgo } from "@/lib/date";
import instance from "@/app/instance";

export default function AdminPanel() {
  const router = useRouter();
  const { state } = useContext(AppContext);
  function deleteRedirect(redirectId: string) {
    const isConfirmed = window.confirm(
      "Yönlendirmeyi silmek istediğinize emin misiniz?"
    );
    if (!isConfirmed) return;
    instance
      .post("deleteRedirect", {
        token: state.userData.token,
        redirectId,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          toast.success("Yönlendirme başarıyla silindi");
        } else {
          toast.error("Yönlendirme silinemedi, tekrar deneyin.");
        }
      })
      .catch((err: any) => {
        console.error(err);
        toast.error(err.message || "Bir hata oluştu!");
      });
  }
  return (
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
            title: "Aktif Yönlendirme",
            icon: ShieldCheck,
            bg: {
              from: "from-[#8900ff]/95",
              via: "via-[#bd00ff]/95",
              to: "to-[#d80bff]/95",
            },
            shadow: "shadow-[#15803d]/10",
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
                      ? state?.userRedirects?.length.toString()
                      : itemTitle === "aktifyönlendirme"
                      ? state?.userRedirects
                          ?.filter(
                            (redirect: Redirect) => redirect.status === "active"
                          )
                          ?.length.toString()
                      : itemTitle === "paketler"
                      ? state.packages.length
                      : itemTitle === "hesaplar"
                      ? state.packages.reduce(
                          (sum, pkg) => sum + pkg.accounts.length,
                          0
                        )
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
          onClick={() => router.push("/admin/activities")}
          className="text-md text-blue-500 hover:underline hover:cursor-pointer font-[450]"
        >
          Tümünü gör {"->"}
        </h2>
      </div>
      <div className="flex neon-box-2 flex-col bg-light/20 dark:bg-[#292929] border dark:border-zinc-700 border-light-border rounded-2xl w-full h-full">
        <table className="min-w-full overflow-x-auto overflow-y-auto w-full">
          <thead className="border-b dark:border-zinc-700 border-light-border/80 rounded-t-2xl w-full">
            <tr>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-3 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <HashIcon
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Aktivite ID</span>
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
                  <span className="mt-px">Aktivite Tipi</span>
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
                  <span className="mt-px">Tarih</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <User
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Kullanıcı</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
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
            {state.activities.map((activity: Activity, index: number) => (
              <tr
                key={index}
                className="transition-all hover:bg-zinc-300/20 dark:hover:bg-zinc-900/20 ease-linear duration-100"
              >
                <td className="text-[15px]  transition-all ease-linear duration-100 px-3 py-4">
                  {activity.activityId}
                </td>
                <td className="text-[15px]  transition-all ease-linear duration-100 px-3 py-4">
                  {activity.type}
                </td>
                <td className="text-[15px]  transition-all ease-linear duration-100 px-3 py-4">
                  {timeAgo(activity.date)}
                </td>
                <td className="text-[15px] px-2 py-4">{activity.userId}</td>
                <td className="flex-1 flex-row items-center space-x-1 px-2 py-4">
                  {activity.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
