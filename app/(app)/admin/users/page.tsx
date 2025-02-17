"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Globe,
  Hash,
  CheckCircle,
  User as UserSvg,
  Mail,
  Wrench,
} from "lucide-react";
import { timeAgo } from "@/lib/date";
import { AppContext } from "../../context";
import { Redirect, User } from "@/types";
import DashboardHeader from "@/components/common/dashboardHeader";

export default function Users() {
  const router = useRouter();
  const { state } = useContext(AppContext);
  return (
    <div className="flex space-y-4 flex-col min-h-[100vh] items-start px-5 py-[18px] justify-start w-full h-full">
      <DashboardHeader page="Kullanıcılar" />
      <div className="flex neon-box-2 flex-col bg-light/20 dark:bg-[#292929] border dark:border-zinc-700 border-light-border rounded-2xl w-full h-full">
        <table className="min-w-full overflow-x-auto overflow-y-auto w-full">
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
                  <span className="mt-px">User ID</span>
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
                  <UserSvg
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Kullanıcı</span>
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
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-zinc-700 divide-light-border/80">
            {state.users.map((user: Partial<User>, index: number) => (
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
                <td className="text-[15px] transition-all ease-linear duration-100 px-3 py-4">
                  {user.permission === "admin" ? "Yönetici" : "Kullanıcı"}
                </td>
                <td className="flex-1 flex-row items-center space-x-1 px-2 py-4">
                  -
                </td>
                <td className="text-[15px] px-2 py-4">
                  {timeAgo(user.created || "0")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
