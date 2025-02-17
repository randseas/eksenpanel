"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../navbar";
import Switch from "@/components/common/switch";
import DashboardHeader from "../dashboardHeader";
import instance from "@/app/instance";
import toast from "react-hot-toast";
import { AppContext } from "../../context";

export default function NewLink() {
  const router = useRouter();
  const { state } = useContext(AppContext);
  const [isRedirectActive, setIsRedirectActive] = useState<boolean>(true);

  const [mainUrl, setMainURL] = useState<string>("");
  const [destinationUrl, setDestinationURL] = useState<string>("");

  const [redirectDelay, setRedirectDelay] = useState<string>("0");
  const [redirectCode, setRedirectCode] = useState<string>("");
  function handleNewRedirect() {
    instance
      .post("newRedirect", {
        token: state.userData.token,
        mainUrl,
        destinationUrl,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          toast.success("Yönlendirme oluşturuldu");
          setMainURL("");
          setDestinationURL("");
          setRedirectDelay("0");
          setRedirectCode("");
          router.push("/dashboard/redirects");
        } else if (res.data.message === "missing_fields") {
          toast.error("Lütfen tüm alanları doldurun");
        } else if (res.data.message === "redirect_already_exists") {
          toast.error("Bu URL ile zaten bir yönlendirme mevcut");
        } else if (res.data.message === "db_error") {
          toast.error("Sunucu hatası");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      });
  }
  return (
    <main className="relative mt-[55px] md:mt-0 flex flex-row h-full w-full overflow-x-hidden">
      <Navbar />
      <div className="flex flex-col min-h-[100vh] items-start px-4 md:px-5 py-4 w-full h-full">
        <DashboardHeader page="Yönlendirme Ekle" />
        <div className="border mx-auto neon-box mt-4 md:mt-12 md:max-w-screen-md shadow-lg shadow-zinc-900/10 w-full flex flex-col items-start justify-between border-light-border dark:border-zinc-700 bg-light/20 dark:bg-[#333333] rounded-2xl p-5">
          <h1 className="text-lg font-medium">Yeni Yönlendirme Ekle</h1>
          <span className="dark:text-zinc-200 text-base font-[450]">
            Yeni bir yönlendirme ekleyin.
          </span>
          <div className="w-full flex flex-col mt-3.5 items-center justify-center">
            <div className="flex flex-col md:flex-row gap-3.5 items-center justify-between w-full">
              <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
                <label
                  htmlFor="link"
                  className="text-md font-[450] dark:text-zinc-200"
                >
                  Ana URL
                </label>
                <input
                  id="link"
                  value={mainUrl}
                  onChange={(e: any) => setMainURL(e.target.value)}
                  className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                  placeholder="https://example.com"
                />
              </div>
              <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
                <label
                  htmlFor="link"
                  className="text-md font-[450] dark:text-zinc-200"
                >
                  Hedef URL
                </label>
                <input
                  id="link"
                  value={destinationUrl}
                  onChange={(e: any) => setDestinationURL(e.target.value)}
                  className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                  placeholder="https://example2.com"
                />
              </div>
            </div>
            <div className="flex mt-3.5 flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="link"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Yönlendirme Kodu
              </label>
              <input
                id="link"
                disabled={true}
                value={redirectCode}
                readOnly={true}
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="Otomatik oluşturulacak"
              />
              <span className="dark:text-zinc-300 text-sm">
                Yönlendirme kodu otomatik olarak oluşturulacaktır
              </span>
            </div>
            <div className="flex mt-3.5 flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="link"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Yönlendirme Süresi (Saniye)
              </label>
              <input
                id="link"
                value={redirectDelay}
                onChange={(e: any) => setRedirectDelay(e.target.value)}
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="Yönlendirme süresi"
              />
              <span className="dark:text-zinc-300 text-sm">
                Yönlendirme için beklenecek süre (0 = anında yönlendirme)
              </span>
            </div>
            <div className="flex mt-3.5 flex-row w-full space-y-1 items-start justify-between text-start">
              <div className="flex flex-col text-start items-start justify-center">
                <label
                  htmlFor="link"
                  className="text-md font-[450] dark:text-zinc-200"
                >
                  Yönlendirme Durumu
                </label>
                <span className="dark:text-zinc-300 text-sm">
                  Yönlendirmenin aktifliğini belirleyin
                </span>
              </div>
              <Switch
                checked={isRedirectActive}
                onClick={() => setIsRedirectActive(!isRedirectActive)}
              />
            </div>
            <button
              onClick={handleNewRedirect}
              className="w-full text-white dark:text-white shadow-inner shadow-blue-400 mt-4 rounded-xl py-2.5 px-3 bg-blue-500 hover:bg-blue-600/95 active:bg-blue-600 transition-all ease-linear duration-100 hover:cursor-pointer"
            >
              Yönlendirme Ekle
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
