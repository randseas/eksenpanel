"use client";
import React, { useContext, useEffect, useState } from "react";
import DashboardHeader from "../../../../components/common/dashboardHeader";
import { AppContext } from "../../context";
import { Check } from "lucide-react";
import instance from "../../../../app/instance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Settings } from "types";

export default function PanelSettings() {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);

  const [existingSettings, setExistingSettings] = useState<
    Partial<Settings> | any
  >();

  const [telegramUsername, setTelegramUsername] = useState<string>(
    existingSettings?.telegramUsername || ""
  );
  const [whatsappNumber, setWhatsappNumber] = useState<string>(
    existingSettings?.whatsappNumber || ""
  );
  useEffect(() => {
    instance
      .post("settings")
      .then((res) => {
        setExistingSettings(res.data.settings);
        setTelegramUsername(res.data.settings.telegramUsername);
        setWhatsappNumber(res.data.settings.whatsappNumber);
      })
      .catch((err: any) => {
        toast.error(err.message);
        console.error(err);
      });
  }, []);
  const handleChangeSettings = () => {
    const payload = new FormData();
    payload.append("token", state.userData.token || "");
    payload.append("telegramUsername", telegramUsername);
    payload.append("whatsappNumber", whatsappNumber);
    if (
      payload.has("token") ||
      payload.has("telegramUsername") ||
      payload.has("whatsappNumber")
    ) {
      const toastloading = toast.loading("Ayarlar güncelleniyor...");
      instance
        .post("changeSiteSettings", payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res: any) => {
          if (res.data.message === "settings_updated") {
            toast.success("Ayarlar güncellendi");
          } else {
            toast.error("Ayarlar güncellenemedi");
          }
        })
        .catch((err: any) => {
          toast.error(err.message || "Bir hata oluştu");
        })
        .finally(() => {
          toast.dismiss(toastloading);
        });
    } else {
      toast.error("Değişiklik yapılmadı.");
    }
  };

  return (
    <div className="flex flex-col min-h-[100vh] items-start px-4 md:px-5 py-4 w-full h-full">
      <DashboardHeader page="Site Ayarları" />
      <div className="border mx-auto neon-box mt-4 md:mt-12 md:max-w-screen-md shadow-lg shadow-zinc-900/10 w-full flex flex-col items-start justify-between border-light-border dark:border-zinc-700 bg-light/20 dark:bg-[#333333] rounded-2xl p-5">
        <h1 className="text-lg font-medium">Site Ayarları</h1>
        <span className="dark:text-zinc-200 text-base font-[450]">
          Site ayarlarını düzenleyin.
        </span>
        <div className="w-full flex flex-col mt-3.5 items-center justify-center">
          <div className="flex flex-col md:flex-row gap-3.5 items-center justify-between w-full">
            <div className="flex mt-3.5 flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="telegramUsername"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Yönetici Telegram Kullanıcı Adı
              </label>
              <input
                id="telegramUsername"
                value={telegramUsername}
                onChange={(e: any) => setTelegramUsername(e.target.value)}
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="Kullanıcı adı girin"
              />
            </div>
            <div className="flex mt-3.5 flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="whatsappNumber"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Yönetici WhatsApp Telefon Numarası
              </label>
              <input
                id="whatsappNumber"
                value={whatsappNumber}
                onChange={(e: any) => setWhatsappNumber(e.target.value)}
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
