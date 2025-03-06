"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Calendar,
  DollarSign,
  DotSquare,
  Hash,
  SquarePen,
  Trash2,
  User,
} from "lucide-react";
import { timeAgo } from "../../../../lib/date";
import { AppContext } from "../../context";
import DashboardHeader from "../../../../components/common/dashboardHeader";
import { OrderedSubscription, SubscriptionInterface } from "../../../../types";
import toast from "react-hot-toast";
import instance from "../../../../app/instance";
import { useNavigate } from "react-router";

export default function SubscriptionOrders() {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const [orderedSubscriptions, setOrderedSubscriptions] = useState<
    Array<OrderedSubscription & { userId: string }>
  >([]);
  useEffect(() => {
    setOrderedSubscriptions(
      state.users
        .flatMap(
          (user) =>
            user.orderedSubscriptions
              ?.filter(
                (sub) =>
                  sub.status === "pending" ||
                  sub.status === "success" ||
                  sub.status === "rejected"
              )
              .map((sub) => ({
                ...sub,
                userId: user.userId ?? "",
              })) || []
        )
        .sort(
          (a, b) =>
            new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        )
    );
  }, [state.users]);
  function handleUpdateSubscription(
    subscriptionId: string,
    orderId: string,
    action: "approve" | "reject"
  ) {
    const loadingtoast = toast.loading(
      action === "approve"
        ? "Abonelik onaylanıyor..."
        : "Abonelik reddediliyor..."
    );
    instance
      .post("updateSubscription", {
        token: state.userData.token,
        orderId,
        subscriptionId,
        action,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          toast.success(
            `Abonelik ${action === "approve" ? "onaylandı" : "reddedildi"}`
          );
          setOrderedSubscriptions((prev) =>
            prev.filter((sub) => sub.subscriptionId !== subscriptionId)
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
    <div className="flex space-y-4 flex-col min-h-[100vh] items-start px-5 py-[18px] justify-start w-full h-full">
      <DashboardHeader page="Abonelik Siparişleri" />
      <div className="flex neon-box-2 overflow-x-auto overflow-y-auto flex-col bg-light/20 dark:bg-[#292929] border dark:border-zinc-700 border-light-border rounded-2xl w-full h-full">
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
                  <span className="mt-px">Abonelik ID</span>
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
                  <Hash
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Abonelik Adı</span>
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
            {orderedSubscriptions?.map(
              (
                sub: { userId: string } & OrderedSubscription,
                index: number
              ) => {
                const findedSubscription: SubscriptionInterface | undefined =
                  state.subscriptions.find(
                    (subcription) =>
                      subcription.subscriptionId === sub.subscriptionId
                  );
                return (
                  <tr
                    key={index}
                    className="transition-all hover:bg-zinc-900/20 ease-linear duration-100"
                  >
                    <td className="text-[15px] px-2 py-4">{sub.userId}</td>
                    <td className="text-[15px] px-2 py-4">
                      {sub.subscriptionId}
                    </td>
                    <td className="text-[15px] px-2 py-4">{sub.orderId}</td>
                    <td className="text-[15px] px-2 py-4">
                      {findedSubscription?.title}
                    </td>
                    <td className="text-[15px] px-2 py-4">
                      {timeAgo(sub.orderDate)}
                    </td>
                    <td className="text-[15px] px-2 py-4">
                      ${findedSubscription?.price}
                    </td>
                    <td className="flex flex-row items-center justify-end space-x-2 px-3 py-2 h-full">
                      {sub.status === "pending" ? (
                        <>
                          <button
                            onClick={() =>
                              handleUpdateSubscription(
                                sub.subscriptionId,
                                sub.orderId,
                                "approve"
                              )
                            }
                            className="transition-all ease-linear duration-100 rounded-xl px-3 py-1.5 hover:bg-blue-600 bg-blue-500 hover:cursor-pointer"
                          >
                            Onayla
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateSubscription(
                                sub.subscriptionId,
                                sub.orderId,
                                "reject"
                              )
                            }
                            className="transition-all ease-linear duration-100 rounded-xl px-3.5 py-1.5 hover:bg-red-600 bg-red-500 hover:cursor-pointer"
                          >
                            Reddet
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="transition-all ease-linear duration-100 rounded-xl px-3 py-1.5 hover:bg-blue-600 bg-blue-500 hover:cursor-pointer">
                            Düzenle
                          </button>
                          <button className="transition-all ease-linear duration-100 rounded-xl px-3.5 py-1.5 hover:bg-red-600 bg-red-500 hover:cursor-pointer">
                            Geri al
                          </button>
                        </>
                      )}
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
