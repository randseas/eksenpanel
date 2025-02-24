"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  CheckCircle,
  Clock,
  DotSquare,
  ExternalLink,
  Globe,
  Package as PkgIcon,
  ShieldCheck,
  SquareArrowOutUpRight,
  SquarePen,
  TicketCheck,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import DashboardHeader from "../../../components/common/dashboardHeader";
import { AppContext } from "../context";
import { Redirect, SubscriptionInterface } from "@/types";
import { timeAgo } from "@/lib/date";
import instance from "@/app/instance";
import config from "@/config";

export default function Dashboard() {
  const router = useRouter();
  const { state } = useContext(AppContext);
  const [subscriptionPlan, setSubscriptionPlan] = useState<string>("monthly");
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
      });
  }
  return (
    <div className="flex space-y-2.5 flex-col items-start px-5 py-4 justify-start w-full h-full">
      <DashboardHeader
        page={
          state.userData.permission === "admin"
            ? "Hoş geldiniz, Yönetici"
            : state.userData.permission === "verified" ||
              state.userData.permission === "user"
            ? "Ana sayfa"
            : ""
        }
      />
      {state.userData.permission === "user" ? (
        <div className="flex flex-col items-center justify-center min-h-[88vh] w-full h-full">
          <h2 className="text-[27px] font-medium">Tumblr'da tam güce ulaş!</h2>
          <p className="mb-3 mt-1.5 text-[15.5px] text-center max-w-[480px]">
            Bu paketler, Tumblr'da görünürlüğünüzü artırmak için sınırsız
            yönlendirme ve başlık/açıklama ekleme imkanı sunarak, aylık ve
            yıllık seçeneklerle kesintisiz kullanım sağlar.
          </p>
          <div className="flex flex-row neon-box-2 bg-[#242424] px-3 pt-1.5 rounded-t-2xl rounded-b-xl items-center justify-start space-x-4">
            <span
              onClick={() => setSubscriptionPlan("monthly")}
              className={`pt-1 transition-all h-[40px] ease-linear duration-100 hover:cursor-pointer px-2.5 ${
                subscriptionPlan === "monthly"
                  ? "border-b-2 border-blue-500 pb-2.5"
                  : "border-none pb-3 hover:border-zinc-700"
              } font-medium text-base`}
            >
              Aylık
            </span>
            <span
              onClick={() => setSubscriptionPlan("yearly")}
              className={`pt-1 transition-all h-[40px] ease-linear duration-100 hover:cursor-pointer px-2.5 ${
                subscriptionPlan === "yearly"
                  ? "border-b-2 border-blue-500 pb-2.5"
                  : "border-none pb-3 hover:border-zinc-700"
              } font-medium text-base`}
            >
              Yıllık
            </span>
          </div>
          <div className="flex flex-col md:flex-row mt-4 mx-auto items-center justify-center gap-2.5 w-full">
            {state.subscriptions.map((subscription: SubscriptionInterface, index: number) => (
              <div
                key={index}
                className="bg-[#282828] w-full md:max-w-[24.35%] neon-box relative rounded-2xl space-y-1 hover:scale-[1.01] transition-all ease-linear duration-100 hover:cursor-pointer p-4"
              >
                <h3 className="text-[18px] font-medium">{subscription.title}</h3>
                <p className="text-2xl font-medium pt-2.5">
                  $
                  {subscriptionPlan === "monthly"
                    ? subscription.price
                    : (parseFloat(subscription.price) * 12).toString()}
                  <span className="opacity-95 text-lg">
                    /{subscriptionPlan === "monthly" ? "ay" : "yıl"}
                  </span>
                </p>
                <ul className="list-disc pl-4 pb-16 pt-0.5 space-y-0.5">
                  {subscription.description
                    .split(",")
                    .map((text: string, key: number) => (
                      <li key={key}>{text}</li>
                    ))}
                </ul>
                <div
                  onClick={() => {
                    const loadingtoast = toast.loading(
                      "Sipariş oluşturuluyor..."
                    );
                    instance
                      .post("createSubscriptionOrder", {
                        token: state.userData.token,
                        subscriptionId: subscription.subscriptionId,
                        subscriptionPlan: subscriptionPlan,
                      })
                      .then((res) => {
                        if (res.data.status === "ok") {
                          toast.success("Sipariş başarıyla oluşturuldu");
                          toast.loading("Telegram'a yönlendiriliyorsunuz");
                          document.location.href = config.TELEGRAM_LINK;
                        } else {
                          console.log(res.data);
                          toast.error(
                            "Sipariş oluşturulamadı, tekrar deneyin."
                          );
                        }
                      })
                      .catch((err) => {
                        toast.error("Sipariş oluşturulamadı, tekrar deneyin.");
                      })
                      .finally(() => toast.dismiss(loadingtoast));
                  }}
                  className="bg-white/90 z-50 backdrop-blur-lg min-w-[89%] left-4 right-4 absolute bottom-4 border dark:hover:bg-white border-light-border dark:border-dark-border p-2 hover:cursor-pointer rounded-full flex flex-row items-center justify-between w-auto"
                >
                  <span className="px-2 font-medium text-zinc-900 text-base">
                    Satın al
                  </span>
                  <div className="bg-zinc-900 px-2.5 py-1 text-white rounded-full font-medium text-lg">
                    {"->"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : state.userData.permission === "verified" ||
        state.userData.permission === "admin" ? (
        <>
          <div className="w-full gap-3 grid z-50 grid-cols-1 grid-rows-4 md:grid-rows-2 md:grid-cols-2 lg:grid-cols-2 lg:grid-rows-2 xl:grid-cols-4 xl:grid-rows-1">
            {[
              {
                title: "Toplam Yönlendirme",
                icon: ExternalLink,
                bg: {
                  from: "from-[#8929e2]/95",
                  via: "via-[#6110e1]/95",
                  to: "to-[#4f04e0]/95",
                },
                shadow: "shadow-[#5b21b6]/10",
              },
              {
                title: "Aktif Yönlendirme",
                icon: ShieldCheck,
                bg: {
                  from: "from-[#8900ff]/95",
                  via: "via-[#bd00ff]/95",
                  to: "to-[#d80bff]/95",
                },
                shadow: "shadow-[#15803d]/10",
              },
              {
                title: "Paketlerim",
                icon: PkgIcon,
                bg: {
                  from: "from-[#892ae1]/95",
                  via: "via-[#6814e1]/95",
                  to: "to-[#5004e0]/95",
                },
                shadow: "shadow-[#1e40af]/10",
              },
              {
                title: "Hesaplarım",
                icon: TicketCheck,
                bg: {
                  from: "from-[#e307c5]/95",
                  via: "via-[#901cb0]/95",
                  to: "to-[#4c2b9b]/95",
                },
                shadow: "shadow-[#ca8a04]/10",
              },
            ].map((item, index) => {
              const itemTitle = item.title
                .toString()
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "");
              return (
                <div
                  key={index}
                  className={`relative neon-box-2 hover:cursor-pointer min-h-[140px] lg:min-h-[150px] rounded-3xl p-6 flex flex-row items-start justify-between transition-all ease-out duration-200 border border-transparent bg-gradient-to-br ${item.bg.from} ${item.bg.via} ${item.bg.to} backdrop-blur-md shadow-lg hover:shadow-xl`}
                >
                  <div className="flex flex-col items-end justify-start space-y-3.5 h-full w-auto z-10">
                    <div
                      className={`relative p-4 rounded-full bg-white/20 shadow-sm`}
                    >
                      <item.icon
                        stroke="#ffffff"
                        strokeWidth={2.25}
                        height={22}
                        width={22}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col ml-4 w-full space-y-1 items-start justify-start z-10">
                    <span className="text-2xl font-semibold text-white">
                      {!state.loading
                        ? itemTitle === "toplamyönlendirme"
                          ? state?.userRedirects?.length.toString()
                          : itemTitle === "aktifyönlendirme"
                          ? state?.userRedirects
                              ?.filter(
                                (redirect: Redirect) =>
                                  redirect.status === "active"
                              )
                              ?.length.toString()
                          : itemTitle === "paketlerim"
                          ? state.userData.purchasedPackages.length
                          : itemTitle === "hesaplarım"
                          ? state.userData.purchasedPackages.reduce(
                              (sum, pkg) => sum + pkg.accounts.length,
                              0
                            )
                          : "--"
                        : "Yükleniyor..."}
                    </span>
                    <p className="tracking-[-0.012em] text-[17px] font-medium text-white/90">
                      {item.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          {state.userRedirects?.length > 0 && (
            <>
              <div className="flex flex-row items-center justify-between w-full">
                <h1 className="text-lg font-[450] text-zinc-800 dark:text-zinc-200">
                  Yönlendirmeler
                </h1>
                <h2
                  onClick={() => router.push("/dashboard/redirects")}
                  className="text-md text-blue-500 hover:underline hover:cursor-pointer font-[450]"
                >
                  Tümünü gör {"->"}
                </h2>
              </div>
              <div className="flex neon-box-2 flex-col bg-light/20 dark:bg-[#292929] border dark:border-zinc-700 border-light-border rounded-2xl w-full h-full">
                <table className="min-w-full overflow-x-auto overflow-y-auto w-full">
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
                    {state.userRedirects
                      ?.slice(0, 5)
                      .map((redirect: Redirect, index: number) => (
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
                              <a className="bg-zinc-500/20 text-[14px] dark:text-yellow-200 text-yellow-800 rounded-full px-2.5 py-1.5">
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
                              onClick={() =>
                                router.push(
                                  `/dashboard/editRedirect/${redirect.redirectId}`
                                )
                              }
                              className="transition-all ease-linear duration-100 rounded-xl pr-1.5 hover:text-blue-600 text-blue-500 hover:cursor-pointer"
                            >
                              <SquarePen
                                stroke="currentColor"
                                width={22}
                                height={22}
                              />
                            </a>
                            <a
                              onClick={() =>
                                deleteRedirect(redirect.redirectId)
                              }
                              className="transition-all ease-linear duration-100 rounded-xl pl-1.5 hover:text-red-600 text-red-500 hover:cursor-pointer"
                            >
                              <Trash2
                                stroke="currentColor"
                                width={22}
                                height={22}
                              />
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          <div
            id="packages"
            className="flex flex-col items-start justify-start w-full h-full"
          >
            <h1 className="text-lg font-[450] text-zinc-800 dark:text-zinc-200 mb-2.5">
              Paket Satın Al
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5 w-full">
              {state.packages.map((pkg, index) => (
                <div
                  key={index}
                  className={cn(
                    "group p-5 neon-box-2 relative hover:scale-[1.01] dark:hover:bg-[#252525] hover:bg-zinc-200/30 dark:bg-[#222222] bg-light rounded-2xl border dark:border-dark-border border-light-border transition-all duration-150 ease-linear flex flex-col items-start text-start",
                    "hover:bg-gradient-to-tr from-[var(--from-color)] via-[var(--via-color)] to-[var(--to-color)]"
                  )}
                  style={
                    {
                      //@ts-expect-error
                      "--from-color": pkg.color?.from,
                      //@ts-expect-error
                      "--via-color": pkg.color?.via,
                      //@ts-expect-error
                      "--to-color": pkg.color?.to,
                    } as React.CSSProperties
                  }
                >
                  <div className="absolute rounded-2xl z-10 inset-0 h-full w-full bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:19.75px_19.75px]" />
                  <h2
                    className={`${
                      pkg.name.includes("Bronz")
                        ? "bronze-text"
                        : pkg.name.includes("Silver")
                        ? "silver-text"
                        : pkg.name.includes("Gold")
                        ? "gold-text"
                        : pkg.name.includes("Premium")
                        ? "premium-text"
                        : pkg.name.includes("Random") && "random-text"
                    } group-hover:!text-zinc-900 hover:text-clip hover:!text-zinc-900 tracking-[-0.012em] animated-text z-50 text-[19px] font-[550]`}
                  >
                    {pkg.name}
                  </h2>
                  <p className="text-[25px] z-50 font-[550] mt-2">
                    $
                    {parseFloat(pkg.price).toLocaleString("tr-TR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                  <p className="font-[450] z-50 text-[18px] text-zinc-800 dark:text-zinc-100">
                    {pkg.title}
                  </p>
                  <p className="text-base z-50 text-zinc-800 dark:text-zinc-100 mt-1.5 mb-[64px]">
                    {pkg.description?.split(",").map((detail: string) => (
                      <>
                        <span className="dot">•</span>&nbsp;
                        {detail}
                        <br />
                      </>
                    ))}
                  </p>
                  <div
                    onClick={() =>
                      toast.error("Ödeme sağlayıcısı ile bağlantı kurulamadı")
                    }
                    className="bg-white/90 z-50 backdrop-blur-lg space-x-[70px] absolute bottom-4 border dark:hover:bg-white border-light-border dark:border-dark-border p-2 hover:cursor-pointer rounded-full flex flex-row items-center justify-between w-auto"
                  >
                    <span className="px-2 font-medium text-zinc-900 text-base">
                      Satın al
                    </span>
                    <div className="bg-zinc-900 px-2.5 py-1 text-white rounded-full font-medium text-lg">
                      {"->"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>ne gösterecem bilmiyom bekle biraz belki yüklenir...</>
      )}
    </div>
  );
}
