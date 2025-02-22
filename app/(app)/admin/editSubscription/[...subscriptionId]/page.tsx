"use client";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/common/dashboardHeader";
import { AppContext } from "@/app/(app)/context";
import instance from "@/app/instance";
import toast from "react-hot-toast";
import { Permission, SubscriptionInterface } from "@/types";

export default function EditSubscription({
  params,
}: {
  params: { subscriptionId: Array<string> };
}) {
  const router = useRouter();
  const { state } = useContext(AppContext);
  const subscriptionId = params.subscriptionId[0].toString();
  const [subscription, setSubscription] = useState<SubscriptionInterface>({
    subscriptionId: "",
    title: "",
    description: "",
    price: "",
    status: "active",
    creationDate: "",
    permissions: [],
  });
  useEffect(() => {
    if (subscriptionId && state.userData.token) {
      const existingSubscription = state.subscriptions?.find(
        (sub: SubscriptionInterface) => sub.subscriptionId === subscriptionId
      );
      if (existingSubscription) {
        setSubscription(existingSubscription);
      } else {
        toast.error("Abonelik bulunamadı");
        router.push("/admin/subscriptions");
      }
    }
  }, [subscriptionId, state.subscriptions, state.userData.token, router]);
  function handleEditSubscription() {
    const loadingtoast = toast.loading("Abonelik güncelleniyor");
    instance
      .post("editSubscription", {
        token: state.userData.token,
        subscriptionId: subscriptionId,
        title: subscription.title,
        description: subscription.description,
        price: subscription.price,
        status: subscription.status,
        endDate: subscription.endDate || undefined,
        permissions: subscription.permissions,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          toast.success("Abonelik güncellendi");
          router.push("/admin/subscriptions");
        } else if (res.data.message === "missing_fields") {
          toast.error("Lütfen gerekli alanları doldurun");
        } else if (res.data.message === "user_not_found") {
          toast.error("Kullanıcı bulunamadı");
        } else if (res.data.message === "subscription_not_found") {
          toast.error("Abonelik bulunamadı");
        } else if (res.data.message === "forbidden") {
          toast.error(
            "Erişim engellendi: Yalnızca adminler abonelik düzenleyebilir"
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
  function handlePermissionChange(
    index: number,
    field: string,
    value: string | number
  ) {
    const updatedPermissions = [...subscription.permissions];
    updatedPermissions[index] = {
      ...updatedPermissions[index],
      [field]: value,
    };
    setSubscription((prev) => ({
      ...prev,
      permissions: updatedPermissions,
    }));
  }
  function addPermission() {
    setSubscription((prev) => ({
      ...prev,
      permissions: [...prev.permissions, { permission: "", limit: 0 }],
    }));
  }
  function removePermission(index: number) {
    const updatedPermissions = subscription.permissions.filter(
      (_, i) => i !== index
    );
    setSubscription((prev) => ({
      ...prev,
      permissions: updatedPermissions,
    }));
  }
  return (
    <div className="flex flex-col min-h-[100vh] items-start px-4 md:px-5 py-4 w-full h-full">
      <DashboardHeader page="Abonelik Düzenle" />
      <div className="border mx-auto md:mt-4 neon-box md:max-w-screen-md shadow-lg shadow-zinc-900/10 w-full flex flex-col items-start justify-between border-light-border dark:border-zinc-700 bg-light/20 dark:bg-[#333333] rounded-2xl p-5">
        <h1 className="text-lg font-medium">Abonelik Düzenle</h1>
        <span className="dark:text-zinc-200 text-base font-[450]">
          Mevcut bir aboneliği güncelleyin.
        </span>
        <div className="w-full flex flex-col mt-3.5 items-center justify-center">
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
            {subscription.permissions.map((perm: Permission, index: number) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-3.5 items-center justify-between w-full"
              >
                <select
                  value={perm.permission}
                  onChange={(e) =>
                    handlePermissionChange(index, "permission", e.target.value)
                  }
                  className="px-2.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full md:w-1/2 transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white"
                >
                  <option
                    value=""
                    className="bg-white dark:bg-zinc-800 text-black dark:text-white"
                  >
                    Seçiniz
                  </option>
                  <option
                    value="yönlendirme"
                    className="bg-white dark:bg-zinc-800 text-black dark:text-white"
                  >
                    Yönlendirme
                  </option>
                </select>
                <input
                  type="number"
                  value={perm.limit}
                  min={0}
                  onChange={(e) =>
                    handlePermissionChange(
                      index,
                      "limit",
                      Number(e.target.value)
                    )
                  }
                  step={1}
                  className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full md:w-1/2 transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-700"
                  placeholder="Limit (0 = sınırsız)"
                />
                <button
                  type="button"
                  onClick={() => removePermission(index)}
                  className="text-red-500 hover:underline transition-all ease-linear duration-100 hover:text-red-600"
                >
                  Kaldır
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addPermission}
              className="mt-2 text-blue-500 hover:underline transition-all ease-linear duration-100 hover:text-blue-600"
            >
              Yetki Ekle
            </button>
          </div>
          <button
            onClick={handleEditSubscription}
            className="w-full text-white dark:text-white shadow-inner shadow-blue-400 mt-4 rounded-xl py-2.5 px-3 bg-blue-500 hover:bg-blue-600/95 active:bg-blue-600 transition-all ease-linear duration-100 hover:cursor-pointer"
          >
            Aboneliği Güncelle
          </button>
        </div>
      </div>
    </div>
  );
}
