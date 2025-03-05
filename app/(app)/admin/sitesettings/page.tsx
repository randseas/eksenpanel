"use client";
import React, { useContext, useState } from "react";
import DashboardHeader from "../../../../components/common/dashboardHeader";
import { AppContext } from "../../context";
import { Check } from "lucide-react";
import { TelegramBotDetails } from "../../../../types";
import instance from "../../../../app/instance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function PanelSettings() {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);

  const [email, setEmail] = useState<string>(state.userData.email);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [telegramBot, setTelegramBot] = useState<TelegramBotDetails>({
    key: state.userData.telegramBot?.key || "",
    groupId: state.userData.telegramBot?.groupId || "",
  });
  function handleChangeSettings() {
    const payload: any = { token: state.userData.token };
    if (currentPassword && newPassword) {
      payload.currentPassword = currentPassword;
      payload.newPassword = newPassword;
    }
    if (telegramBot.key || telegramBot.groupId) {
      payload.telegramBot = telegramBot;
    }
    if (Object.keys(payload).length > 1) {
      console.log("payyload", payload);
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
        });
    } else {
      toast("Değişiklik yapılmadı.");
    }
  }
  return (
    <div className="flex flex-col min-h-[100vh] items-start px-4 md:px-5 py-4 w-full h-full">
      <DashboardHeader page="Site Ayarları" />
      <div className="border mx-auto neon-box mt-4 md:mt-12 md:max-w-screen-md shadow-lg shadow-zinc-900/10 w-full flex flex-col items-start justify-between border-light-border dark:border-zinc-700 bg-light/20 dark:bg-[#333333] rounded-2xl p-5">
        <h1 className="text-lg font-medium">Site Ayarları</h1>
        <span className="dark:text-zinc-200 text-base font-[450]">
          Site ayarlarını düzenleyin.
        </span>
        <div className="w-full flex flex-col mt-3.5 items-center justify-center">
          <div className="flex mt-3.5 flex-col md:flex-row gap-3.5 items-center justify-between w-full">
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="siteTitle"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Başlık
              </label>
              <input
                id="siteTitle"
                value={telegramBot.key}
                onChange={(e: any) =>
                  setTelegramBot((prevTelegramBot) => ({
                    ...prevTelegramBot,
                    key: e.target.value,
                  }))
                }
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="Başlık girin"
              />
            </div>
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="siteDescription"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Açıklama
              </label>
              <input
                id="siteDescription"
                value={telegramBot.groupId}
                onChange={(e: any) =>
                  setTelegramBot((prevTelegramBot) => ({
                    ...prevTelegramBot,
                    groupId: e.target.value,
                  }))
                }
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="Açıklama girin"
              />
            </div>
          </div>
          <div className="flex mt-3.5 flex-col w-full space-y-1 items-start justify-start text-start">
            <label
              htmlFor="currentPassword"
              className="text-md font-[450] dark:text-zinc-200"
            >
              Logo
            </label>
            <input
              id="currentPassword"
              type="file"
              value={currentPassword}
              onChange={(e: any) => setCurrentPassword(e.target.value)}
              className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
              placeholder="Logo yükle"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-3.5 items-center justify-between w-full">
            <div className="flex mt-3.5 flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="newPassword"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Yönetici Telegram Kullanıcı Adı
              </label>
              <input
                id="newPassword"
                value={newPassword}
                onChange={(e: any) => setNewPassword(e.target.value)}
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="Kullanıcı adı girin"
              />
            </div>
            <div className="flex mt-3.5 flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="newPassword"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Yönetici WhatsApp Telefon Numarası
              </label>
              <input
                id="newPassword"
                value={newPassword}
                onChange={(e: any) => setNewPassword(e.target.value)}
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="Telefon numarası girin"
              />
            </div>
          </div>
          <button
            onClick={handleChangeSettings}
            className="w-full text-white dark:text-white shadow-inner shadow-blue-400 mt-4 rounded-xl py-2.5 px-3 bg-blue-500 hover:bg-blue-600/95 active:bg-blue-600 transition-all ease-linear duration-100 hover:cursor-pointer"
          >
            <div className="flex flex-row items-center w-full text-center justify-center space-x-2">
              <Check width={20} height={20} />
              <span>Site Ayarlarını kaydet</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
