"use client";
import React, { useContext } from "react";
import { Calendar, Hash, Mail, Wrench, DotSquare, Ticket } from "lucide-react";
import { timeAgo } from "../../../../lib/date";
import { AppContext } from "../../context";
import { SubscriptionInterface, User } from "../../../../types";
import DashboardHeader from "../../../../components/common/dashboardHeader";
import toast from "react-hot-toast";
import instance from "../../../instance";
import { useNavigate } from "react-router";

export default function Users() {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);

  function updatePermission(userId: string) {
    const permInput = prompt(
      "Kullanıcı yetkisini güncellemek için 'admin' veya 'user' yazınız."
    );
    if (!permInput) return;
    const permission = permInput.toLowerCase().trim();
    if (permission !== "admin" && permission !== "user") {
      toast.error("Geçersiz yetki türü girdiniz.");
      return;
    }
    const loadingtoast = toast.loading("Kullanıcı yetkisi güncelleniyor...");
    instance
      .post("updatePermission", {
        token: state.userData.token,
        userId,
        permission,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          toast.success("Kullanıcı yetkisi başarıyla güncellendi.");
        }
      })
      .catch((err) => {
        toast.error("Kullanıcı yetkisi güncellenirken bir hata oluştu.");
      })
      .finally(() => {
        toast.dismiss(loadingtoast);
      });
  }
  return (
    <div className="flex space-y-4 flex-col min-h-[100vh] items-start px-5 py-[18px] justify-start w-full h-full">
      <DashboardHeader page="Kullanıcılar" />
      <div className="flex neon-box-2 overflow-x-auto overflow-y-auto flex-col bg-light/20 dark:bg-[#292929] border dark:border-zinc-700 border-light-border rounded-2xl w-full h-full">
        <table className="min-w-full w-full">
          <thead className="border-b dark:border-zinc-700 border-light-border/80 rounded-t-2xl w-full">
            <tr>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-3 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <Hash
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Kullanıcı ID</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-3 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <Mail
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">E-posta adresi</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <Wrench
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Yetki</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <Calendar
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Kayıt tarihi</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <Calendar
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Satın Aldığı Paketler</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <Ticket
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Abonelik</span>
                </div>
              </th>
              <th className="text-end dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-3 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <DotSquare
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Aksiyon</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-zinc-700 divide-light-border/80">
            {state.users.map((user: Partial<User>, index: number) => {
              const userActiveSubscription: SubscriptionInterface | undefined =
                state.subscriptions.find(
                  (sub: SubscriptionInterface) =>
                    sub.subscriptionId ===
                    user.activeSubscription?.subscriptionId
                );
              return (
                <tr
                  key={index}
                  className="transition-all hover:bg-zinc-300/20 dark:hover:bg-zinc-900/20 ease-linear duration-100"
                >
                  <td className="text-[15px] transition-all ease-linear duration-100 px-3 py-4">
                    {user.userId}
                  </td>
                  <td className="text-[15px] transition-all ease-linear duration-100 px-3 py-4">
                    {user.email}
                  </td>
                  <td
                    className={`${
                      user.permission === "admin"
                        ? "text-red-500"
                        : "text-blue-500"
                    } text-[15px] transition-all ease-linear duration-100 px-3 py-4`}
                  >
                    {user.permission === "admin" ? "Yönetici" : "Kullanıcı"}
                  </td>
                  <td className="text-[15px] px-2 py-4">
                    {timeAgo(parseInt(user.created || "0"))}
                  </td>
                  <td className="flex-1 flex-row items-center space-x-1 px-2 py-4">
                    {user.purchasedPackages?.length.toString()}
                  </td>
                  <td className="flex-1 flex-row items-center space-x-1 px-2 py-4">
                    {userActiveSubscription?.title || "-"}
                  </td>
                  <td className="text-[15px] flex flex-row items-center justify-end space-x-1.5 text-end px-3 py-4">
                    <a
                      onClick={() => navigate(`/admin/editUser/${user.userId}`)}
                      className="transition-all ease-linear hover:underline duration-100 rounded-xl pr-2 hover:text-blue-600 text-blue-500 hover:cursor-pointer"
                    >
                      Kullanıcıyı Düzenle
                    </a>
                    <a
                      onClick={() => updatePermission(user.userId || "")}
                      className="transition-all ease-linear hover:underline duration-100 rounded-xl pr-1.5 hover:text-red-600 text-red-500 hover:cursor-pointer"
                    >
                      Yetki Düzenle
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
