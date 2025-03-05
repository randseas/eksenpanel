import { AppContext } from "@/(app)/context";
import { formatContent } from "../../../../components/common/dashboardHeader";
import { timeAgo } from "../../../../lib/date";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { NotificationInterface } from "types";
import instance from "@/instance";
import toast from "react-hot-toast";

export default function Notifications() {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();

  function deleteAllNotifications() {
    try {
      const toastloading = toast.loading("Bildirimler siliniyor...");
      instance
        .post("notifications/deleteAll", {
          token: state.userData?.token,
        })
        .then((res) => {
          if (res.data.status === "ok") {
            toast.success("Bildirimler silindi");
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          toast.dismiss(toastloading);
        });
    } catch (error) {
      console.error("Bildirimler silinirken hata oluştu:", error);
    }
  }
  function deleteNotification(notificationTimestamp: string) {
    try {
      const toastloading = toast.loading("Bildirim siliniyor...");
      instance
        .post("/notifications/deleteOne", {
          token: state.userData?.token,
          notificationTimestamp,
        })
        .then((res) => {
          if (res.data.status === "ok") {
            toast.success("Bildirim silindi");
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          toast.dismiss(toastloading);
        });
    } catch (error) {
      console.error("Bildirimler silinirken hata oluştu:", error);
    }
  }
  return (
    <div className="flex space-y-4 flex-col min-h-[88vh] items-start px-5 py-[18px] justify-start w-full h-full">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-lg font-[450] text-zinc-800 dark:text-zinc-200">
          Bildirimler ({state.userData?.notifications?.length})
        </h1>
        <h2
          onClick={() => deleteAllNotifications()}
          className="text-md text-blue-500 hover:underline hover:cursor-pointer font-[450]"
        >
          Tümünü Sil
        </h2>
      </div>
      <div>
        <div className="flex flex-col text-start items-center justify-center space-y-1.5">
          {state.userData?.notifications?.length > 0 ? (
            state.userData?.notifications
              ?.sort(
                (a: NotificationInterface, b: NotificationInterface) =>
                  new Date(b.timestamp).getTime() -
                  new Date(a.timestamp).getTime()
              )
              .map((notification: NotificationInterface, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-800 border relative border-zinc-900 max-w-[100%] w-full rounded-xl px-4 py-3"
                >
                  <p
                    onClick={() => deleteNotification(notification.timestamp)}
                    className="absolute cursor-pointer right-4 text-[16.5px] top-4 hover:text-red-600 hover:underline text-red-500 font-medium"
                  >
                    Sil
                  </p>
                  <span className="text-[16px] tracking-[-0.005em] font-[500]">
                    {notification.title}
                  </span>
                  <p className="text-zinc-100 mt-1 text-[15px]">
                    {formatContent(notification.content)}
                  </p>
                  <span className="mt-1 text-[15px] font-[500]">
                    {timeAgo(notification.timestamp)}
                  </span>
                </div>
              ))
          ) : (
            <span className="dark:text-zinc-200 text-start text-base text-zinc-700">
              Hiç bildiriminiz yok.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
