import React, { useContext, useState, useEffect } from "react";
import DashboardHeader from "../../../../components/common/dashboardHeader";
import { AppContext } from "../../../(app)/context";
import instance from "../../../instance";
import toast from "react-hot-toast";
import { Permission, SubscriptionInterface } from "../../../../types";
import { useNavigate, useParams } from "react-router";

export default function EditSubscription() {
  const { subscriptionId } = useParams();
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  const [defaultPerms, setDefaultPerms] = useState<Permission[]>([
    {
      permission: "Yönlendirme sayısı",
      title: "redirects",
      type: "number",
      value: "",
    },
    {
      permission: "Yönlendirmeye başlık ve açıklama ekleme",
      title: "redirectHeadAndDesc",
      type: "boolean",
      value: false,
    },
    {
      permission: "Her şeye sınırsız erişim",
      title: "unlimited",
      type: "boolean",
      value: false,
    },
  ]);
  const [subscription, setSubscription] = useState<
    Partial<SubscriptionInterface>
  >({
    title: "",
    description: "",
    price: "",
    permissions: [],
  });

  useEffect(() => {
    const loadingtoast = toast.loading("Abonelik aranıyor");
    const findedSubscription = state.subscriptions.find(
      (sub: SubscriptionInterface) =>
        sub.subscriptionId?.toString().toLowerCase().trim() ===
        JSON.stringify(subscriptionId).toString().toLowerCase().trim()
    );
    if (findedSubscription) {
      toast.dismiss(loadingtoast);
      setSubscription(findedSubscription);
    } else {
      toast.dismiss(loadingtoast);
      toast.error("Abonelik bulunamadı");
      navigate("/admin/subscriptions");
    }
  }, [subscriptionId]);

  function handleEditSubscription() {
    if (subscription.permissions?.length === 0) {
      toast.error("En az bir yetki eklenmelidir");
      return;
    }
    const loadingtoast = toast.loading("Abonelik düzenleniyor");
    instance
      .post("editSubscription", {
        token: state.userData.token,
        subscriptionId: subscription.subscriptionId,
        title: subscription.title,
        description: subscription.description,
        price: subscription.price,
        permissions: subscription.permissions,
      })
      .then((res) => {
        console.log("sended", subscription);
        console.log("result", res.data);
        if (res.data.status === "ok") {
          toast.success("Abonelik düzenlendi");
          navigate("/admin/subscriptions");
        } else if (res.data.message === "missing_fields") {
          toast.error("Lütfen tüm alanları doldurun");
        } else if (res.data.message === "user_not_found") {
          toast.error("Kullanıcı bulunamadı");
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
  function handlePermissionChange(index: number, field: string, newVal: any) {
    const updatedPermissions = [...(subscription.permissions || [])];
    const permissionType = defaultPerms.find(
      (p) => p.title === updatedPermissions[index].permission
    )?.type;

    if (permissionType === "boolean") {
      updatedPermissions[index] = {
        ...updatedPermissions[index],
        [field]: newVal === "active" ? true : false,
      };
    } else {
      updatedPermissions[index] = {
        ...updatedPermissions[index],
        [field]: newVal,
      };
    }
    setSubscription((prev) => ({
      ...prev,
      permissions: updatedPermissions,
    }));
  }
  function addPermission() {
    const availablePermissions = defaultPerms.filter(
      (perm) =>
        !subscription.permissions?.some(
          (subPerm) => subPerm.permission === perm.title
        )
    );
    if (availablePermissions.length > 0) {
      const newPerm = availablePermissions[0];
      setSubscription((prev) => ({
        ...prev,
        permissions: [
          ...(prev.permissions || []),
          {
            permission: newPerm.title || "",
            title: newPerm.permission || "",
            type: newPerm.type,
            value: newPerm.type === "boolean" ? false : "",
          },
        ],
      }));
    } else {
      toast.error("Tüm yetkiler eklendi");
    }
  }
  function removePermission(index: number) {
    if (subscription.permissions?.length === 1) {
      toast.error("En az bir yetki eklenmelidir");
      return;
    }
    const updatedPermissions = subscription.permissions?.filter(
      (_, i) => i !== index
    );
    setSubscription((prev) => ({
      ...prev,
      permissions: updatedPermissions,
    }));
  }
  return (
    <div className="flex flex-col min-h-[100vh] items-start px-4 md:px-5 py-4 w-full h-full">
      <DashboardHeader page="Abonelik Ekle" />
      <div className="border mx-auto neon-box md:mt-2 md:max-w-screen-md shadow-lg shadow-zinc-900/10 w-full flex flex-col items-start justify-between border-light-border dark:border-zinc-700 bg-light/20 dark:bg-[#333333] rounded-2xl p-5">
        <h1 className="text-lg font-medium">Aboneliği Düzenle</h1>
        <span className="dark:text-zinc-200 text-base font-[450]">
          Var olan aboneliği düzenleyin.
        </span>
        <div className="w-full flex flex-col mt-2 items-center justify-center">
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
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-600"
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
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-600"
                placeholder="0,00"
              />
            </div>
          </div>
          {/* Açıklama */}
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
              className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 min-h-[100px] rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-600"
              placeholder="Örn. Premium abonelik, tüm özelliklere erişim sağlar."
            />
          </div>
          {/* Yetkiler */}
          <div className="flex mt-3.5 flex-col w-full space-y-1 items-start justify-start text-start">
            <label
              htmlFor="subPermissions"
              className="text-md font-[450] dark:text-zinc-200"
            >
              Yetki(ler)
            </label>
            {subscription.permissions?.map((perm, index) => {
              const isBoolean =
                defaultPerms.find((p) => p.title === perm.permission)?.type ===
                "boolean";
              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-3.5 items-center justify-between w-full"
                >
                  {/* İzin Seçimi */}
                  <select
                    value={perm.permission}
                    onChange={(e) =>
                      setSubscription((prev) => ({
                        ...prev,
                        permissions: prev.permissions?.map((p, i) =>
                          i === index ? { ...p, permission: e.target.value } : p
                        ),
                      }))
                    }
                    className="w-full md:w-1/2 px-3 py-2.5 rounded-[11px] border dark:border-zinc-600 bg-white dark:bg-dark/10 text-black dark:text-white focus:ring-[1px] focus:ring-blue-500/90 focus:border-blue-500 transition-all"
                  >
                    {defaultPerms.map((permx, idx) => (
                      <option
                        key={idx}
                        value={permx.title}
                        className="bg-white dark:bg-zinc-700 text-black dark:text-white"
                      >
                        {permx.permission}
                      </option>
                    ))}
                  </select>
                  {/* Boolean ise select, değilse string input */}
                  {isBoolean ? (
                    <select
                      value={perm.value ? "active" : "passive"}
                      onChange={(e) =>
                        handlePermissionChange(index, "value", e.target.value)
                      }
                      className="w-full md:w-1/2 px-3 py-2.5 rounded-[11px] border dark:border-zinc-600 bg-white dark:bg-dark/10 text-black dark:text-white focus:ring-[1px] focus:ring-blue-500/90 focus:border-blue-500 transition-all"
                    >
                      <option
                        value="active"
                        className="bg-white dark:bg-zinc-700"
                      >
                        Aktif
                      </option>
                      <option
                        value="passive"
                        className="bg-white dark:bg-zinc-700"
                      >
                        Pasif
                      </option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={
                        (typeof perm.value === "string" && perm.value) || ""
                      }
                      onChange={(e) =>
                        handlePermissionChange(index, "value", e.target.value)
                      }
                      placeholder="Değer girin"
                      className="w-full md:w-1/2 px-3.5 py-2.5 rounded-[11px] border dark:border-zinc-600 dark:bg-dark/10 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 transition-all"
                    />
                  )}
                  {/* Kaldır Butonu */}
                  <button
                    type="button"
                    onClick={() => removePermission(index)}
                    className="text-red-500 hover:underline hover:text-red-600 transition-all"
                  >
                    Kaldır
                  </button>
                </div>
              );
            })}
            {/* Yetki Ekle Butonu */}
            <button
              type="button"
              onClick={addPermission}
              className="mt-2 text-blue-500 hover:underline transition-all ease-linear duration-100 hover:text-blue-600"
            >
              Yetki Ekle
            </button>
          </div>
          {/* Aboneliği Ekle Butonu */}
          <button
            onClick={handleEditSubscription}
            className="w-full text-white dark:text-white shadow-inner shadow-blue-400 mt-4 rounded-xl py-2.5 px-3 bg-blue-500 hover:bg-blue-600/95 active:bg-blue-600 transition-all ease-linear duration-100 hover:cursor-pointer"
          >
            Aboneliği Düzenle
          </button>
        </div>
      </div>
    </div>
  );
}
