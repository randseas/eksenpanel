"use client";
import React, { useContext, useEffect, useState } from "react";
import DashboardHeader from "../../../../components/common/dashboardHeader";
import instance from "../../../instance";
import toast from "react-hot-toast";
import { AppContext } from "../../context";
import { SubscriptionInterface, User } from "../../../../types";
import { useNavigate, useParams } from "react-router";

export default function AdminEditUser() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { state } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [existingUser, setExistingUser] = useState<Partial<User> | undefined>(
    undefined
  );
  useEffect(() => {
    const findedUser = state.users.find(
      (user: Partial<User>) => user.userId?.toString() === userId?.toString()
    );
    if (!findedUser) {
      toast.error("Kullanıcı bulunamadı");
      navigate("/admin/users");
    }
    setSubscriptions(
      state.subscriptions.map((subscription: SubscriptionInterface) => ({
        subscriptionId: subscription.subscriptionId,
        title: subscription.title,
      }))
    );
    setExistingUser(findedUser);
    setUserEmail(findedUser?.email || "");
    setUserPermission(findedUser?.permission || "");
    setUserSubscriptionId(findedUser?.activeSubscription?.subscriptionId || "");
    setUserTgBotKey(findedUser?.telegramBot?.key || "");
    setUserTgGroupId(findedUser?.telegramBot?.groupId || "");
  }, [userId]);
  const [userEmail, setUserEmail] = useState<string>(existingUser?.email || "");
  const [userPermission, setUserPermission] = useState<string>(
    existingUser?.permission || ""
  );
  const [userSubscriptionId, setUserSubscriptionId] = useState<string>(
    existingUser?.activeSubscription?.subscriptionId || ""
  );
  const [userTgBotKey, setUserTgBotKey] = useState<string>(
    existingUser?.telegramBot?.key || ""
  );
  const [userTgGroupId, setUserTgGroupId] = useState<string>(
    existingUser?.telegramBot?.groupId || ""
  );
  const [subscriptions, setSubscriptions] = useState<
    Partial<SubscriptionInterface>[]
  >(
    state.subscriptions.map((subscription: SubscriptionInterface) => ({
      subscriptionId: subscription.subscriptionId,
      title: subscription.title,
    }))
  );
  function handleEditUser() {
    if (!loading) {
      setLoading(true);
      const loadingtoast = toast.loading("Kullanıcı düzenleniyor...");
      instance
        .post("adminEditUser", {
          token: state.userData.token,
          userId,
          userEmail,
          userPermission,
          userSubscriptionId,
          userTgBotKey,
          userTgGroupId,
        })
        .then((res) => {
          if (res.data.status === "ok") {
            toast.success("Kullanıcı düzenleme başarılı");
            navigate("/admin/users");
          } else if (res.data.message === "missing_fields") {
            toast.error("Lütfen tüm alanları doldurun");
          } else if (res.data.message === "redirect_not_exists") {
            toast.error("Bu kullanıcı mevcut değil");
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
      <DashboardHeader page="Kullanıcı Düzenleme" />
      <div className="border mx-auto neon-box mt-2 md:mt-5 md:max-w-screen-md shadow-lg shadow-zinc-900/10 w-full flex flex-col items-start justify-between border-light-border dark:border-zinc-700 bg-light/20 dark:bg-[#333333] rounded-2xl p-5">
        <h1 className="text-lg font-medium">Kullanıcı Düzenleme</h1>
        <span className="dark:text-zinc-200 text-base font-[450]">
          Kullanıcıyı düzenleme.
        </span>
        <div className="w-full flex flex-col mt-3.5 items-center justify-center">
          <div className="flex flex-col md:flex-row gap-3.5 items-center justify-between w-full">
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="link"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Kullanıcı ID
              </label>
              <input
                id="link"
                value={existingUser?.userId}
                readOnly
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="******"
                spellCheck={false}
              />
            </div>
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="emailAddress"
                className="text-md font-[450] dark:text-zinc-200"
              >
                E-posta adresi
              </label>
              <input
                id="emailAddress"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="name@example.com"
                spellCheck={false}
              />
            </div>
          </div>
          <div className="flex mt-3.5 flex-col md:flex-row gap-3.5 items-center justify-between w-full">
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="userPermission"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Yetki
              </label>
              <input
                id="userPermission"
                value={userPermission}
                onChange={(e: any) => setUserPermission(e.target.value)}
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="user"
                spellCheck={false}
              />
            </div>
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="userSubscription"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Abonelik
              </label>
              <select
                id="userSubscription"
                value={userSubscriptionId}
                onChange={(e) => setUserSubscriptionId(e.target.value)}
                className="w-full px-2.5 py-3 rounded-[11px] border dark:border-zinc-500 bg-white dark:bg-dark/10 text-black dark:text-white focus:ring-[1px] focus:ring-blue-500/90 focus:border-blue-500 transition-all"
              >
                {subscriptions.map(
                  (sub: Partial<SubscriptionInterface>, index: number) => (
                    <option
                      key={index}
                      value={sub.subscriptionId}
                      className="bg-white dark:bg-zinc-700 text-black dark:text-white"
                    >
                      {sub.title}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <div className="flex mt-3.5 flex-col md:flex-row gap-3.5 items-center justify-between w-full">
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="userPermission"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Telegram Bot Key
              </label>
              <input
                id="userPermission"
                value={userTgBotKey}
                onChange={(e: any) => setUserTgBotKey(e.target.value)}
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="-"
                spellCheck={false}
              />
            </div>
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="userPermission"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Telegram Grup ID
              </label>
              <input
                id="userPermission"
                value={userTgGroupId}
                onChange={(e: any) => setUserTgGroupId(e.target.value)}
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="-"
                spellCheck={false}
              />
            </div>
          </div>
          <button
            onClick={handleEditUser}
            className="w-full text-white dark:text-white shadow-inner shadow-blue-400 mt-4 rounded-xl py-2.5 px-3 bg-blue-500 hover:bg-blue-600/95 active:bg-blue-600 transition-all ease-linear duration-100 hover:cursor-pointer"
          >
            Kullanıcıyı Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}
