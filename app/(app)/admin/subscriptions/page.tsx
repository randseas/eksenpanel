"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  DollarSign,
  DotSquare,
  Hash,
  Package as PkgIcon,
  SquarePen,
  Trash2,
} from "lucide-react";
import { timeAgo } from "@/lib/date";
import { AppContext } from "../../context";
import DashboardHeader from "@/components/common/dashboardHeader";
import instance from "@/app/instance";
import toast from "react-hot-toast";
import { SubscriptionInterface } from "@/types";

export default function Subscriptions() {
  const router = useRouter();
  const { state } = useContext(AppContext);
  function handleDeleteSubscription(subscriptionId: string) {
    const isConfirmed = window.confirm(
      "Bu aboneliği silmek istediğinizden emin misiniz?"
    );
    if (!isConfirmed) return;
    const loadingtoast = toast.loading("Abonelik siliniyor");
    instance
      .post("deleteSubscription", {
        token: state.userData.token,
        subscriptionId,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          toast.success("Abonelik başarıyla silindi");
        } else if (res.data.message === "missing_fields") {
          toast.error("Gerekli alanlar eksik");
        } else if (res.data.message === "user_not_found") {
          toast.error("Kullanıcı bulunamadı");
        } else if (res.data.message === "subscription_not_found") {
          toast.error("Abonelik bulunamadı");
        } else if (res.data.message === "forbidden") {
          toast.error(
            "Erişim engellendi: Yalnızca adminler abonelik silebilir"
          );
        } else if (res.data.message === "db_error") {
          toast.error("Sunucu hatası");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message || "Bir hata oluştu!");
      })
      .finally(() => {
        toast.dismiss(loadingtoast);
      });
  }
  return (
    <div className="flex space-y-4 flex-col min-h-[100vh] items-start px-5 py-[18px] justify-start w-full h-full">
      <DashboardHeader page="Abonelikler" />
      <div className="flex neon-box-2 flex-col bg-light/20 dark:bg-[#292929] border dark:border-zinc-700 border-light-border rounded-2xl w-full h-full">
        <table className="min-w-full overflow-x-auto overflow-y-auto w-full">
          <thead className="border-b dark:border-zinc-700 border-light-border/80 rounded-t-2xl w-full">
            <tr>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <Hash
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Abonelik ID</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <PkgIcon
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Başlık</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <PkgIcon
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Açıklama</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <DollarSign
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Fiyat (USD)</span>
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
                  <span className="mt-px">Eklenme Tarihi</span>
                </div>
              </th>
              <th className="text-end dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-3 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <DotSquare
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Aksiyon</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-zinc-700 divide-light-border/80">
            {state.subscriptions?.map(
              (sub: SubscriptionInterface, index: number) => (
                <tr
                  key={index}
                  className="transition-all hover:bg-zinc-900/20 ease-linear duration-100"
                >
                  <td className="text-[15px] px-2 py-4">
                    {sub.subscriptionId.split("-")[0]}
                  </td>
                  <td className="text-[15px] px-2 py-4">{sub.title}</td>
                  <td className="text-[15px] px-2 py-4">
                    {sub.description.length >= 20
                      ? sub.description.slice(0, 20) + "..."
                      : sub.description}
                  </td>
                  <td className="text-[15px] px-2 py-4">${sub.price}</td>
                  <td className="text-[15px] px-2 py-4">
                    {timeAgo(sub.creationDate)}
                  </td>
                  <td className="text-[15px] flex flex-row items-center justify-end space-x-1.5 text-end px-3 py-4">
                    <a
                      onClick={() =>
                        router.push(
                          `/admin/editSubscription/${sub.subscriptionId}`
                        )
                      }
                      className="transition-all ease-linear duration-100 rounded-xl pr-1.5 hover:text-blue-600 text-blue-500 hover:cursor-pointer"
                    >
                      <SquarePen stroke="currentColor" width={22} height={22} />
                    </a>
                    <a
                      onClick={() =>
                        handleDeleteSubscription(sub.subscriptionId)
                      }
                      className="transition-all ease-linear duration-100 rounded-xl pl-1.5 hover:text-red-600 text-red-500 hover:cursor-pointer"
                    >
                      <Trash2 stroke="currentColor" width={22} height={22} />
                    </a>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
