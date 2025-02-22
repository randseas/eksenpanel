"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "../../../../components/common/dashboardHeader";
import { AppContext } from "../../context";
import instance from "@/app/instance";
import toast from "react-hot-toast";
import { SubscriptionInterface } from "@/types";

export default function NewSubscription() {
  const router = useRouter();
  const { state } = useContext(AppContext);
  const [subscription, setSubscription] = useState<
    Partial<SubscriptionInterface>
  >({
    title: "",
    description: "",
    price: "",
  });

  function handleNewSubscription() {
    const loadingtoast = toast.loading("Abonelik oluşturuluyor");
    instance
      .post("newSubscription", {
        token: state.userData.token,
        title: subscription.title,
        description: subscription.description,
        price: subscription.price,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          toast.success("Abonelik oluşturuldu");
          router.push("/admin/subscriptions");
        } else if (res.data.message === "missing_fields") {
          toast.error("Lütfen tüm alanları doldurun");
        } else if (res.data.message === "user_not_found") {
          toast.error("Kullanıcı bulunamadı");
        } else if (res.data.message === "forbidden") {
          toast.error(
            "Erişim engellendi: Yalnızca adminler abonelik oluşturabilir"
          );
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
      });
  }

  return (
    <div className="flex flex-col min-h-[100vh] items-start px-4 md:px-5 py-4 w-full h-full">
      <DashboardHeader page="Abonelik Ekle" />
      <div className="border mx-auto neon-box md:max-w-screen-md shadow-lg shadow-zinc-900/10 w-full flex flex-col items-start justify-between border-light-border dark:border-zinc-700 bg-light/20 dark:bg-[#333333] rounded-2xl p-5">
        <h1 className="text-lg font-medium">Yeni Abonelik Ekle</h1>
        <span className="dark:text-zinc-200 text-base font-[450]">
          Yeni bir abonelik ekleyin.
        </span>
        <div className="w-full flex flex-col mt-2 items-center justify-center">
          <span className="dark:text-yellow-500 text-[15.25px]">
            UYARI: Lütfen başlık ve açıklamada aylık veya yıllık olarak süre
            belirtmeyiniz. Paket ve fiyatı varsayılan olarak aylıktır.
          </span>
          <div className="flex mt-3.5 flex-col md:flex-row gap-3.5 items-center justify-between w-full">
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="subTitle"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Abonelik Başlığı
              </label>
              <input
                id="subTitle"
                value={subscription.title}
                onChange={(e) =>
                  setSubscription((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-700"
                placeholder="Örn. Premium"
              />
            </div>
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="subPrice"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Aylık Fiyat (USD)
              </label>
              <input
                id="subPrice"
                type="number"
                value={subscription.price}
                min={0}
                step={0.01}
                onChange={(e) =>
                  setSubscription((prev) => ({
                    ...prev,
                    price: e.target.value.replace(/\s+/g, ""),
                  }))
                }
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-700"
                placeholder="0,00"
              />
            </div>
          </div>
          <div className="flex mt-3.5 flex-col w-full space-y-1 items-start justify-start text-start">
            <label
              htmlFor="subDescription"
              className="text-md font-[450] dark:text-zinc-200"
            >
              Açıklama
            </label>
            <textarea
              id="subDescription"
              value={subscription.description}
              onChange={(e) =>
                setSubscription((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              spellCheck="false"
              className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 min-h-[100px] rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-700"
              placeholder="Örn. Premium abonelik, tüm özelliklere erişim sağlar."
            />
          </div>
          <div className="flex mt-3.5 flex-col w-full space-y-1 items-start justify-start text-start">
            <label
              htmlFor="subPermissions"
              className="text-md font-[450] dark:text-zinc-200"
            >
              Yetki(ler)
            </label>
            <textarea
              id="subPermissions"
              spellCheck="false"
              className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 min-h-[100px] rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-700"
              placeholder="Yetki tipi: yönlendirme | Limit: 1000"
            />
            <span className="dark:text-zinc-300 text-sm">
              <span className="font-mono">
                Yetki tipi: yönlendirme | Limit: sınırsız/(sayı)
              </span>
              &nbsp; formatında giriş yapınız. <br />
              Büyük/küçük harf duyarlılığı bulunmamaktadır.
            </span>
          </div>
          <button
            onClick={handleNewSubscription}
            className="w-full text-white dark:text-white shadow-inner shadow-blue-400 mt-4 rounded-xl py-2.5 px-3 bg-blue-500 hover:bg-blue-600/95 active:bg-blue-600 transition-all ease-linear duration-100 hover:cursor-pointer"
          >
            Aboneliği Ekle
          </button>
        </div>
      </div>
    </div>
  );
}
