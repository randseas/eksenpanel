"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Calendar,
  CheckCircle,
  Clock,
  Copy,
  DotSquare,
  Globe,
  SquareArrowOutUpRight,
  SquarePen,
  Trash2,
} from "lucide-react";
import { timeAgo } from "../../../../lib/date";
import instance from "../../../../app/instance";
import toast from "react-hot-toast";
import { AppContext } from "../../context";
import { Redirect } from "../../../../types";
import { useNavigate } from "react-router";

export default function Redirects() {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function deleteRedirect(redirectId: string) {
    const isConfirmed = window.confirm(
      "Yönlendirmeyi silmek istediğinize emin misiniz?"
    );
    if (!isConfirmed) return;
    const toastloading = toast.loading("Yönlendirme siliniyor...");
    instance
      .post("deleteRedirect", {
        token: state.userData.token,
        redirectId,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          toast.success("Yönlendirme başarıyla silindi");
        } else {
          toast.error("Yönlendirme silinemedi, tekrar deneyin.");
        }
      })
      .catch((err: any) => {
        console.error(err);
        toast.error(err.message || "Bir hata oluştu!");
      })
      .finally(() => {
        toast.dismiss(toastloading);
      });
  }
  return (
    <div className="flex space-y-4 flex-col min-h-[100vh] items-start px-5 py-[18px] justify-start w-full h-full">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-lg font-[450] text-zinc-800 dark:text-zinc-200">
          Yönlendirmeler
        </h1>
        <h2
          onClick={() => navigate("/dashboard/newRedirect")}
          className="text-md text-blue-500 hover:underline hover:cursor-pointer font-[450]"
        >
          Yeni Ekle {"->"}
        </h2>
      </div>
      <div className="flex overflow-x-auto overflow-y-auto neon-box-2 flex-col bg-light/20 dark:bg-[#292929] border dark:border-zinc-700 border-light-border rounded-2xl w-full h-full">
        <table className="min-w-full w-full">
          <thead className="border-b dark:border-zinc-700 border-light-border/80 rounded-t-2xl w-full">
            <tr>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-3 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <Globe
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Ana URL</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <SquareArrowOutUpRight
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Hedef URL</span>
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
                  <span className="mt-px">Eklenme Tarihi</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <Clock
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Son Kontrol</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <CheckCircle
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Durum</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <CheckCircle
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Yönlendirme Durumu</span>
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
            {state.userRedirects?.map((redirect: Redirect, index: number) => (
              <tr
                key={index}
                className="transition-all hover:bg-zinc-300/20 dark:hover:bg-zinc-900/20 ease-linear duration-100"
              >
                <td className="text-[15px] text-blue-500 hover:text-blue-600 transition-all ease-linear duration-100 hover:underline hover:cursor-pointer px-3 py-4">
                  <a target="blank" href={redirect.mainUrl}>
                    {redirect.mainUrl.length > 28
                      ? redirect.mainUrl.slice(0, 28) + "..."
                      : redirect.mainUrl}
                  </a>
                </td>
                <td className="text-[15px] text-blue-500 hover:text-blue-600 transition-all ease-linear duration-100 hover:underline hover:cursor-pointer px-2 py-4">
                  <a target="blank" href={redirect.destinationUrl}>
                    {redirect.destinationUrl.length > 28
                      ? redirect.destinationUrl.slice(0, 28) + "..."
                      : redirect.destinationUrl}
                  </a>
                </td>
                <td className="text-[15px] px-2 py-4">
                  {timeAgo(redirect.creationDate)}
                </td>
                <td className="text-[15px] px-2 py-4">
                  {timeAgo(redirect.lastCheckDate)}
                </td>
                <td className="flex-1 flex-row items-center space-x-1 px-2 py-4">
                  {redirect.status === "active" ? (
                    <a className="bg-green-500/20 text-[14px] dark:text-green-200 text-green-800 rounded-full px-2.5 py-1.5">
                      Aktif
                    </a>
                  ) : redirect.status === "passive" ? (
                    <a className="bg-red-500/20 text-[14px] dark:text-red-200 text-red-800 rounded-full px-2.5 py-1.5">
                      Pasif
                    </a>
                  ) : (
                    <a className="bg-zinc-500/20 text-[14px] dark:text-zinc-200 text-zinc-800 rounded-full px-2.5 py-1.5">
                      --
                    </a>
                  )}
                </td>
                <td className="flex-1 flex-row items-center space-x-1 px-2 py-4">
                  {redirect.check === "success" ? (
                    <a className="bg-green-500/20 text-[14px] dark:text-green-200 text-green-800 rounded-full px-2.5 py-1.5">
                      Çalışıyor
                    </a>
                  ) : redirect.check === "pending" ? (
                    <a className="bg-yellow-500/20 text-[14px] dark:text-yellow-200 text-yellow-800 rounded-full px-2.5 py-1.5">
                      Test ediliyor
                    </a>
                  ) : (
                    <a className="bg-red-500/20 text-[14px] dark:text-red-200 text-red-800 rounded-full px-2.5 py-1.5">
                      Çalışmıyor
                    </a>
                  )}
                </td>
                <td className="text-[15px] flex flex-row items-center justify-end space-x-1.5 text-end px-3 py-4">
                  <a
                    onClick={() => {
                      navigator.clipboard.writeText(redirect.jsUrl);
                      toast.success("JS kodu panoya kopyalandı");
                    }}
                    className="transition-all ease-linear duration-100 rounded-xl pr-3 hover:text-blue-600 text-blue-500 hover:cursor-pointer"
                  >
                    <Copy stroke="currentColor" width={22} height={22} />
                  </a>
                  <a
                    onClick={() =>
                      navigate(`/dashboard/editRedirect/${redirect.redirectId}`)
                    }
                    className="transition-all ease-linear duration-100 rounded-xl pr-1.5 hover:text-blue-600 text-blue-500 hover:cursor-pointer"
                  >
                    <SquarePen stroke="currentColor" width={22} height={22} />
                  </a>
                  <a
                    onClick={() => deleteRedirect(redirect.redirectId)}
                    className="transition-all ease-linear duration-100 rounded-xl pl-1.5 hover:text-red-600 text-red-500 hover:cursor-pointer"
                  >
                    <Trash2 stroke="currentColor" width={22} height={22} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
