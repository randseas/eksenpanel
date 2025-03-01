"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Calendar,
  CircleCheck,
  DollarSign,
  DotSquare,
  Hash,
  SquareArrowOutUpRight,
} from "lucide-react";
import { timeAgo } from "../../../../lib/date";
import instance from "../../../../app/instance";
import toast from "react-hot-toast";
import { AppContext } from "../../context";
import {
  UserOrder,
  Package,
  PurchasedPackage,
  OrderedPackage,
  OrderedSubscription,
  SubscriptionInterface,
} from "../../../../types";
import { useNavigate } from "react-router";

export default function OrderHistory() {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const [userOrders, setUserOrders] = useState<Array<UserOrder>>([]);
  useEffect(() => {
    if (!state.userData) return;
    const { orderedPackages, orderedSubscriptions } = state.userData;
    const packageOrders: UserOrder[] = orderedPackages.map(
      (pkg: OrderedPackage) => ({
        type: "package",
        orderId: pkg.orderId,
        productId: pkg.packageId,
        status: pkg.status as "pending" | "success" | "rejected",
        orderDate: pkg.orderDate,
      })
    );
    const subscriptionOrders: UserOrder[] | undefined =
      orderedSubscriptions?.map((sub: OrderedSubscription) => ({
        type: "subscription",
        orderId: sub.orderId,
        productId: sub.subscriptionId,
        status: sub.status as "pending" | "success" | "rejected",
        orderDate: sub.orderDate,
      }));
    setUserOrders([...packageOrders, ...(subscriptionOrders || [])]);
  }, [state.userData]);

  function deleteOrder(
    orderId: string,
    productId: string,
    orderType: "subscription" | "package"
  ) {
    const isConfirmed = window.confirm(
      "Siparişi iptal etmek istediğinize emin misiniz?"
    );
    if (!isConfirmed) return;
    const toastloading = toast.loading("Sipariş iptal ediliyor...");
    instance
      .post("deleteOrder", {
        token: state.userData.token,
        orderId,
        productId,
        orderType,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          toast.success("Sipariş iptal edildi");
        } else {
          toast.error("Sipariş iptal edilemedi, tekrar deneyin.");
        }
      })
      .catch((err: any) => {
        console.error(err);
        toast.error(err.message || "Bir hata oluştu!");
      })
      .finally(() => {
        toast.dismiss(toastloading);
      });
  }
  return (
    <div className="flex space-y-4 flex-col min-h-[100vh] items-start px-5 py-[18px] justify-start w-full h-full">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-lg font-[450] text-zinc-800 dark:text-zinc-200">
          Siparişlerim
        </h1>
        <h2
          onClick={() => navigate("/dashboard#packages")}
          className="text-md text-blue-500 hover:underline hover:cursor-pointer font-[450]"
        >
          Satın al {"->"}
        </h2>
      </div>
      <div className="flex neon-box-2 overflow-x-auto overflow-y-auto flex-col bg-light/20 dark:bg-[#292929] border dark:border-zinc-700 border-light-border rounded-2xl w-full h-full">
        <table className="min-w-full w-full">
          <thead className="border-b dark:border-zinc-700 border-light-border/80 rounded-t-2xl w-full">
            <tr>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-3 py-2">
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
                  <span className="mt-px">Ürün ID</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <SquareArrowOutUpRight
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Ürün Adı</span>
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
                  <CircleCheck
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Durum</span>
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
            {userOrders
              .sort(
                (a, b) =>
                  new Date(b.orderDate).getTime() -
                  new Date(a.orderDate).getTime()
              )
              .map((order: UserOrder, index: number) => {
                const dbProduct: Package | SubscriptionInterface | undefined =
                  order.type === "package"
                    ? state.packages.find(
                        (pkg: Package) => pkg.packageId === order.productId
                      )
                    : state.subscriptions?.find(
                        (sub: SubscriptionInterface) =>
                          sub.subscriptionId === order.productId
                      );
                return (
                  <tr
                    key={index}
                    className="transition-all hover:bg-zinc-900/20 ease-linear duration-100"
                  >
                    <td className="text-[15px] px-2 py-4">{order.orderId}</td>
                    <td className="text-[15px] px-2 py-4">{order.productId}</td>
                    <td className="text-[15px] px-2 py-4">
                      {dbProduct
                        ? "name" in dbProduct
                          ? dbProduct.name
                          : dbProduct.title
                        : "Ürün bulunamadı"}
                    </td>
                    <td className="text-[15px] px-2 py-4">
                      {dbProduct ? "$" + dbProduct.price : "Ürün bulunamadı"}
                    </td>
                    <td className="text-[15px] px-2 py-4">
                      {timeAgo(order.orderDate)}
                    </td>
                    <td className="text-[15px] space-x-1.5 text-start px-3 py-4">
                      {order.status === "success" ? (
                        <a className="bg-green-500/20 text-[14px] dark:text-green-200 text-green-800 rounded-full px-2.5 py-1.5">
                          Onaylandı
                        </a>
                      ) : order.status === "pending" ? (
                        <a className="bg-yellow-500/20 text-[14px] dark:text-yellow-200 text-yellow-800 rounded-full px-2.5 py-1.5">
                          Onay Bekliyor
                        </a>
                      ) : order.status === "rejected" ? (
                        <a className="bg-red-500/20 text-[14px] dark:text-red-200 text-red-800 rounded-full px-2.5 py-1.5">
                          Reddedildi
                        </a>
                      ) : (
                        <a className="bg-red-500/20 text-[14px] dark:text-red-200 text-red-800 rounded-full px-2.5 py-1.5">
                          İptal Edildi
                        </a>
                      )}
                    </td>
                    {order.status === "pending" ? (
                      <td className="text-[15px] flex flex-row items-center justify-end space-x-1.5 text-end px-3 py-4">
                        <a
                          onClick={() =>
                            deleteOrder(
                              order.orderId,
                              order.productId,
                              order.type
                            )
                          }
                          className="transition-all ease-linear hover:underline duration-100 rounded-xl pr-2 hover:text-blue-600 text-blue-500 hover:cursor-pointer"
                        >
                          İptal et
                        </a>
                      </td>
                    ) : (
                      <td className="text-[15px] flex flex-row items-center justify-end space-x-1.5 text-end px-3 py-4"></td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
