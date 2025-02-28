"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, DollarSign, DotSquare, Hash, User } from "lucide-react";
import { timeAgo } from "@/lib/date";
import { AppContext } from "../../context";
import DashboardHeader from "@/components/common/dashboardHeader";
import { OrderedPackage, Package } from "@/types";
import toast from "react-hot-toast";
import instance from "@/app/instance";

export default function PackageOrders() {
  const router = useRouter();
  const { state } = useContext(AppContext);
  const [orderedPackages, setOrderedPackages] = useState<
    Array<OrderedPackage & { userId: string }>
  >([]);
  useEffect(() => {
    setOrderedPackages(
      state.users
        .flatMap((user) =>
          user.orderedPackages
            ? user.orderedPackages
                .filter((pkg) => pkg.status === "pending")
                .map((pkg) => ({
                  ...pkg,
                  userId: user.userId ?? "",
                }))
            : []
        )
        .sort(
          (a, b) =>
            new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        )
    );
  }, [state.users]);
  function handleUpdatePackage(
    packageId: string,
    orderId: string,
    action: "approve" | "reject"
  ) {
    const loadingtoast = toast.loading(
      action === "approve" ? "Paket onaylanıyor..." : "Paket reddediliyor..."
    );
    instance
      .post("updatePackage", {
        token: state.userData.token,
        orderId,
        packageId,
        action,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          toast.success(
            `Paket siparişi ${
              action === "approve" ? "onaylandı" : "reddedildi"
            }`
          );
          setOrderedPackages((prev) =>
            prev.filter((pkg) => pkg.packageId !== packageId)
          );
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Bir hata oluştu.");
      })
      .finally(() => toast.dismiss(loadingtoast));
  }
  return (
    <div className="flex space-y-4 flex-col min-h-[90vh] md:min-h-[100vh] items-start px-5 py-[18px] justify-start w-full h-full">
      <DashboardHeader page="Paket Siparişleri" />
      <div className="flex neon-box-2 overflow-y-auto overflow-x-auto flex-col bg-light/20 dark:bg-[#292929] border dark:border-zinc-700 border-light-border rounded-2xl w-full h-full">
        <table className="min-w-full w-full">
          <thead className="border-b dark:border-zinc-700 border-light-border/80 rounded-t-2xl w-full">
            <tr>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
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
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <Hash
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Paket ID</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <Hash
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Sipariş ID</span>
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
                  <span className="mt-px">Sipariş Tarihi</span>
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
                  <span className="mt-px">Ödenecek Tutar</span>
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
            {orderedPackages?.map(
              (pkg: OrderedPackage & { userId: string }, index: number) => {
                const findedPackage: Package | undefined = state.packages.find(
                  (pxg) => pxg.packageId === pkg.packageId
                );
                return (
                  <tr
                    key={index}
                    className="transition-all hover:bg-zinc-900/20 ease-linear duration-100"
                  >
                    <td className="text-[15px] px-2 py-4">{pkg.userId}</td>
                    <td className="text-[15px] px-2 py-4">{pkg.packageId}</td>
                    <td className="text-[15px] px-2 py-4">{pkg.orderId}</td>
                    <td className="text-[15px] px-2 py-4">
                      {timeAgo(pkg.orderDate)}
                    </td>
                    <td className="text-[15px] px-2 py-4">
                      ${findedPackage?.price}
                    </td>
                    <td className="flex flex-row items-center justify-end space-x-2 px-3 py-2 h-full">
                      <button
                        onClick={() =>
                          handleUpdatePackage(
                            findedPackage?.packageId || "",
                            pkg.orderId,
                            "approve"
                          )
                        }
                        className="transition-all ease-linear duration-100 rounded-xl px-3 py-1.5 hover:bg-blue-600 bg-blue-500 hover:cursor-pointer"
                      >
                        Onay
                      </button>
                      <button
                        onClick={() =>
                          handleUpdatePackage(
                            findedPackage?.packageId || "",
                            pkg.orderId,

                            "reject"
                          )
                        }
                        className="transition-all ease-linear duration-100 rounded-xl px-3.5 py-1.5 hover:bg-red-600 bg-red-500 hover:cursor-pointer"
                      >
                        Ret
                      </button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
