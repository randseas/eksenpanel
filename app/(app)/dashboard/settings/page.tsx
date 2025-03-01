"use client";
import React, { useContext, useEffect, useState } from "react";
import DashboardHeader from "../../../../components/common/dashboardHeader";
import { AppContext } from "../../context";
import { Check } from "lucide-react";
import { SubscriptionInterface, TelegramBotDetails } from "../../../../types";
import instance from "../../../../app/instance";
import toast from "react-hot-toast";
import { timeRemaining } from "../../../../lib/date";
import { useNavigate } from "react-router";

export default function Settings() {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [email, setEmail] = useState<string>(state.userData.email);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [telegramBot, setTelegramBot] = useState<TelegramBotDetails>({
    key: state.userData.telegramBot?.key || "",
    groupId: state.userData.telegramBot?.groupId || "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function handleChangeSettings() {
    const toastloading = toast.loading("Ayarlar güncelleniyor...");
    const payload: any = { token: state.userData.token };
    if (currentPassword && newPassword) {
      payload.currentPassword = currentPassword;
      payload.newPassword = newPassword;
    }
    if (telegramBot.key || telegramBot.groupId) {
      payload.telegramBot = telegramBot;
    }
    if (Object.keys(payload).length > 1) {
      instance
        .post("change-settings", payload)
        .then((res: any) => {
          if (res.data.message === "settings_updated") {
            toast.success("Ayarlar güncellendi");
          } else {
            toast.error("Ayarlar güncellenemedi");
          }
        })
        .catch((err: any) => {
          toast.error(err.message);
        })
        .finally(() => {
          toast.dismiss(toastloading);
        });
    } else {
      toast("Değişiklik yapılmadı.");
      toast.dismiss(toastloading);
    }
  }
  return (
    <div className="flex flex-col min-h-[100vh] items-start px-4 md:px-5 py-4 w-full h-full">
      <DashboardHeader page="Ayarlar" />
      <div className="border mx-auto neon-box-2 md:max-w-screen-md shadow-lg shadow-zinc-900/10 w-full flex flex-col items-start justify-between border-light-border dark:border-zinc-700 bg-light/20 dark:bg-[#333333] rounded-2xl p-5">
        <h1 className="text-lg font-medium">Ayarlar</h1>
        <span className="dark:text-zinc-200 text-base font-[450]">
          Hesap ayarlarını düzenleyin.
        </span>
        <div className="w-full flex flex-col mt-3.5 items-center justify-center">
          <div className="flex flex-row items-center justify-center space-x-3.5 w-full">
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="emailAddress"
                className="text-md font-[450] dark:text-zinc-200"
              >
                E-posta adresi
              </label>
              <input
                id="emailAddress"
                value={email}
                disabled={true}
                readOnly={true}
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder={"example@provider.com"}
              />
            </div>
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="userId"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Kullanıcı ID
              </label>
              <input
                id="userId"
                value={state.userData.userId}
                disabled={true}
                readOnly={true}
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
              />
            </div>
          </div>
          <div className="flex flex-col w-full space-y-1 mt-3 items-start justify-start text-start">
            <label
              htmlFor="activeSubscription"
              className="text-md font-[450] dark:text-zinc-100"
            >
              Aboneliğim
            </label>
            <div className="flex dark:bg-[#252525] py-3 rounded-xl shadow-lg px-3 flex-col w-full space-y-1 items-start justify-start text-start">
              {state.userData.activeSubscription ? (
                (() => {
                  const dbSub = state.subscriptions.find(
                    (sub: SubscriptionInterface) =>
                      sub.subscriptionId ===
                      state.userData.activeSubscription?.subscriptionId
                  );
                  return (
                    <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
                      <span className="text-base font-[450] dark:text-zinc-50">
                        <strong className="font-[500] text-[17px]">
                          {dbSub?.title}
                        </strong>{" "}
                        (ID: {state.userData.activeSubscription.subscriptionId})
                      </span>
                      <span className="text-md font-[450] dark:text-zinc-200">
                        {"Bitmesine " +
                          timeRemaining(
                            state.userData.activeSubscription.endDate || ""
                          )}
                      </span>
                    </div>
                  );
                })()
              ) : (
                <span className="text-base font-[450] dark:text-zinc-100">
                  Aboneliğiniz bulunmamaktadır.
                </span>
              )}
            </div>
          </div>
          <div className="flex mt-3.5 flex-col md:flex-row gap-3.5 items-center justify-between w-full">
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="telegramBotKey"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Telegram Bot Anahtarı
              </label>
              <input
                id="telegramBotKey"
                value={telegramBot.key}
                onChange={(e: any) =>
                  setTelegramBot((prevTelegramBot) => ({
                    ...prevTelegramBot,
                    key: e.target.value,
                  }))
                }
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="********"
              />
            </div>
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="telegramGroupID"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Telegram Grup ID
              </label>
              <input
                id="telegramGroupID"
                value={telegramBot.groupId}
                onChange={(e: any) =>
                  setTelegramBot((prevTelegramBot) => ({
                    ...prevTelegramBot,
                    groupId: e.target.value,
                  }))
                }
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="1234567890"
              />
            </div>
          </div>
          <div className="flex mt-3.5 flex-col w-full space-y-1 items-start justify-start text-start">
            <label
              htmlFor="currentPassword"
              className="text-md font-[450] dark:text-zinc-200"
            >
              Mevcut Şifre
            </label>
            <input
              id="currentPassword"
              value={currentPassword}
              onChange={(e: any) => setCurrentPassword(e.target.value)}
              className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
              placeholder="Mevcut şifrenizi giriniz"
            />
          </div>
          <div className="flex mt-3.5 flex-col w-full space-y-1 items-start justify-start text-start">
            <label
              htmlFor="newPassword"
              className="text-md font-[450] dark:text-zinc-200"
            >
              Yeni Şifre
            </label>
            <input
              id="newPassword"
              value={newPassword}
              onChange={(e: any) => setNewPassword(e.target.value)}
              className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
              placeholder="Yeni şifreyi giriniz"
            />
          </div>
          <button
            onClick={handleChangeSettings}
            className="w-full text-white dark:text-white shadow-inner shadow-blue-400 mt-4 rounded-xl py-2.5 px-3 bg-blue-500 hover:bg-blue-600/95 active:bg-blue-600 transition-all ease-linear duration-100 hover:cursor-pointer"
          >
            <div className="flex flex-row items-center w-full text-center justify-center space-x-2">
              <Check width={20} height={20} />
              <span>Ayarları kaydet</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
