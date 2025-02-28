"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Switch from "@/components/common/switch";
import DashboardHeader from "../../../../components/common/dashboardHeader";
import instance from "@/app/instance";
import toast from "react-hot-toast";
import { AppContext } from "../../context";

export default function NewLink() {
  const router = useRouter();
  const { state } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [mainUrl, setMainURL] = useState<string>("");
  const [destinationUrl, setDestinationURL] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [redirectCode, setRedirectCode] = useState<string>("");
  function handleNewRedirect() {
    if (!loading) {
      const normalUrlRegex =
        /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/.*)?$/;
      if (!normalUrlRegex.test(mainUrl)) {
        toast.error("Ana URL geçerli bir alan adı olmalıdır");
        return;
      }
      if (!normalUrlRegex.test(destinationUrl)) {
        toast.error("Hedef URL geçerli bir alan adı olmalıdır");
        return;
      }
      const tumblrUrlRegex =
        /^(https?:\/\/)?([a-zA-Z0-9_-]+\.)?tumblr\.com\/?$/;
      if (!tumblrUrlRegex.test(mainUrl)) {
        toast.error("Ana URL bir Tumblr alt adı olmalıdır.");
        return;
      }
      if (mainUrl === destinationUrl) {
        toast.error("Ana URL Hedef URL ile aynı olamaz!");
        return;
      }
      setLoading(true);
      const loadingtoast = toast.loading("Yönlendirme ekleniyor...");
      instance
        .post("newRedirect", {
          token: state.userData.token,
          mainUrl,
          destinationUrl,
          title,
          description,
        })
        .then((res) => {
          if (res.data.status === "ok") {
            toast.success("Yönlendirme oluşturuldu");
            setMainURL("");
            setDestinationURL("");
            setRedirectCode("");
            router.push("/dashboard/redirects");
          } else if (res.data.message === "missing_fields") {
            toast.error("Lütfen tüm alanları doldurun");
          } else if (res.data.message === "main_url_invalid") {
            toast.error("Ana URL bir tumblr alt adı olmalıdır");
          } else if (res.data.message === "destination_url_invalid") {
            toast.error("Hedef URL geçerli bir alan adı olmalıdır");
          } else if (res.data.message === "redirect_already_exists") {
            toast.error("Bu URL ile zaten bir yönlendirme mevcut");
          } else if (res.data.message === "db_error") {
            toast.error("Sunucu hatası");
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.message);
        })
        .finally(() => {
          toast.dismiss(loadingtoast);
          setLoading(false);
        });
    }
  }
  return (
    <div className="flex flex-col min-h-[100vh] items-start px-4 md:px-5 py-4 w-full h-full">
      <DashboardHeader page="Yönlendirme Ekle" />
      <div className="border mx-auto neon-box mt-2 md:mt-20 md:max-w-screen-md shadow-lg shadow-zinc-900/10 w-full flex flex-col items-start justify-between border-light-border dark:border-zinc-700 bg-light/20 dark:bg-[#333333] rounded-2xl p-5">
        <h1 className="text-lg font-medium">Yeni Yönlendirme Ekle</h1>
        <span className="dark:text-zinc-200 text-base font-[450]">
          Yeni bir yönlendirme ekleyin.
        </span>
        <div className="w-full flex flex-col mt-3.5 items-center justify-center">
          <div className="flex flex-col md:flex-row gap-3.5 items-center justify-between w-full">
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="mainUrl"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Ana URL
              </label>
              <input
                id="mainUrl"
                value={mainUrl}
                onChange={(e: any) => setMainURL(e.target.value)}
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="https://example.com"
              />
            </div>
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="destinationUrl"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Hedef URL
              </label>
              <input
                id="destinationUrl"
                value={destinationUrl}
                onChange={(e: any) => setDestinationURL(e.target.value)}
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="https://example2.com"
              />
            </div>
          </div>
          <div className="flex mt-3.5 flex-col md:flex-row gap-3.5 items-center justify-between w-full">
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="title"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Başlık
              </label>
              <input
                id="title"
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="Örnek başlık"
              />
            </div>
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="description"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Açıklama
              </label>
              <input
                id="description"
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="Örnek site açıklaması"
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
          <button
            onClick={handleNewRedirect}
            className="w-full text-white dark:text-white shadow-inner shadow-blue-400 mt-4 rounded-xl py-2.5 px-3 bg-blue-500 hover:bg-blue-600/95 active:bg-blue-600 transition-all ease-linear duration-100 hover:cursor-pointer"
          >
            Yönlendirme Ekle
          </button>
        </div>
      </div>
    </div>
  );
}
