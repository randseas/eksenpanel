"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "./navbar";
import {
  Calendar,
  Code,
  ExternalLink,
  Link,
  Package,
  ShieldCheck,
  SquareArrowOutUpRight,
  TicketCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import DashboardHeader from "./dashboardHeader";

const packages = [
  {
    name: "Bronz Paket",
    accounts: "35 Hesap",
    color: {
      from: "#cd7f32",
      via: "#b87333",
      to: "#8c6239",
    },
    backgroundImage: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23cd7f32" fill-opacity="0.3" d="M0,160L80,144C160,128,320,96,480,117.3C640,139,800,213,960,224C1120,235,1280,181,1360,154.7L1440,128V320H0Z"></path></svg>`,
    details: [
      "Rastgele/Blog",
      "Takipçiler/Takipçi olmayanlar",
      "Eski tarihli",
      "E-posta adresi & şifre",
      "DA/PA %20",
      "Telafi yok",
    ],
    price: "$35.00",
  },
  {
    name: "Silver Paket",
    accounts: "45 Hesap",
    color: {
      from: "#c0c0c0",
      via: "#a8a8a8",
      to: "#808080",
    },
    details: [
      "İyi Blog Hesapları",
      "500/1k Takipçiler",
      "Eski tarihli",
      "E-posta adresi & şifre",
      "DA/PA %45",
      "Telafi var",
    ],
    price: "$79.00",
  },
  {
    name: "Gold Paket",
    accounts: "65 Hesap",
    color: {
      from: "#ffd700",
      via: "#ffb700",
      to: "#d4af37",
    },
    details: [
      "Yüksek Blog Hesapları",
      "1k/5k Takipçiler",
      "Eski tarihli",
      "E-posta adresi & şifre",
      "DA/PA %80",
      "Telafi var",
    ],
    price: "$175.00",
  },
  {
    name: "Premium Paket",
    accounts: "150 Hesap",
    color: {
      from: "#ff1493",
      via: "#c71585",
      to: "#800080",
    },
    details: [
      "Yüksek Blog Hesapları",
      "5k/10k Takipçiler",
      "Eski tarihli",
      "E-posta adresi & şifre",
      "DA/PA %99",
      "Telafi var",
    ],
    price: "$350.00",
  },
  {
    name: "Random Paket",
    accounts: "200 Hesap",
    color: {
      from: "#ff80b5",
      via: "#d36ee8",
      to: "#a855f7",
    },
    details: [
      "Boş Rastgele Hesaplar",
      "Takipçi yok",
      "Yeni/Eski tarihli",
      "E-posta adresi & şifre",
      "DA/PA %5",
      "Telafi var",
    ],
    price: "$150.00",
  },
];

export default function Dashboard() {
  const router = useRouter();
  return (
    <main className="relative top-[55px] md:top-0 flex flex-row h-full w-full overflow-x-hidden">
      <Navbar />
      <div className="flex space-y-2.5 flex-col items-start px-5 py-4 justify-start w-full h-full">
        <DashboardHeader page="Ana sayfa" />
        <div className="w-full gap-3 grid grid-cols-1 grid-rows-4 md:grid-rows-2 md:grid-cols-2 lg:grid-cols-2 lg:grid-rows-2 xl:grid-cols-4 xl:grid-rows-1">
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
              icon: Package,
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
          ].map((item, index) => (
            <div
              key={index}
              className={`relative shadow-[inset_6px_6px_12px_#0a0a0a,inset_-6px_-6px_12px_#1e1e1e] dark:shadow-[6px_6px_14px_#151515,-6px_-6px_12px_#101010] hover:cursor-pointer min-h-[140px] lg:min-h-[150px] rounded-3xl p-6 flex flex-row items-start justify-between transition-all ease-out duration-200 border border-transparent bg-gradient-to-br ${item.bg.from} ${item.bg.via} ${item.bg.to} backdrop-blur-md shadow-lg hover:shadow-xl`}
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
                <span className="text-2xl font-semibold text-white">0</span>
                <p className="tracking-[-0.012em] text-[17px] font-medium text-white/90">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <h1 className="text-lg font-[450] text-zinc-200">
            Son Eklenen Yönlendirmeler
          </h1>
          <h2
            onClick={() => router.push("/dashboard/redirects")}
            className="text-md text-blue-500 hover:underline hover:cursor-pointer font-[450]"
          >
            Tümünü gör {"->"}
          </h2>
        </div>
        <div className="flex shadow-[inset_6px_6px_12px_#0a0a0a,inset_-6px_-6px_12px_#1e1e1e] dark:shadow-[6px_6px_14px_#151515,-6px_-6px_12px_#101010] flex-col bg-light/20 dark:bg-dark/20 border dark:border-dark-border border-light-border rounded-2xl w-full h-full">
          <table className="min-w-full overflow-x-auto overflow-y-auto w-full">
            <thead className="border-b dark:border-dark-border/80 border-light-border/80 rounded-t-2xl w-full">
              <tr>
                <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-3 py-2">
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
                <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-3 py-2">
                  <div className="inline-flex items-center space-x-1.5">
                    <Link
                      className="text-blue-500"
                      height={17}
                      width={17}
                      stroke="currentColor"
                    />
                    <span className="mt-px">Link URL</span>
                  </div>
                </th>
                <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-3 py-2">
                  <div className="inline-flex items-center space-x-1.5">
                    <SquareArrowOutUpRight
                      className="text-blue-500"
                      height={17}
                      width={17}
                      stroke="currentColor"
                    />
                    <span className="mt-px">Yönlendirilecek URL</span>
                  </div>
                </th>
                <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-3 py-2">
                  <div className="inline-flex items-center space-x-1.5">
                    <Code
                      className="text-blue-500"
                      height={17}
                      width={17}
                      stroke="currentColor"
                    />
                    <span className="mt-px">JS URL</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-dark-border/80 divide-light-border/80">
              <tr className="transition-all hover:bg-zinc-900/20 ease-linear duration-100">
                <td className="text-[15px] px-3 py-4">14 Şubat 2025 00:01</td>
                <td className="text-[15px] hover:underline hover:cursor-pointer px-3 py-4">
                  <a target="blank" href="http://localhost">
                    http://localhost
                  </a>
                </td>
                <td className="text-[15px] hover:underline hover:cursor-pointer px-3 py-4">
                  <a target="blank" href="https://bionluk.com/">
                    https://bionluk.com/
                  </a>
                </td>
                <td className="text-[15px] hover:underline hover:cursor-pointer px-3 py-4">
                  <a target="blank" href="http://localhost/js/as324uy.js">
                    http://localhost/js/as324uy.js
                  </a>
                </td>
                <td className="text-[15px] space-x-1.5 text-end px-3 py-4">
                  <a className="py-2 transition-all ease-linear duration-100 rounded-xl px-3 hover:bg-blue-600 bg-blue-500 hover:cursor-pointer">
                    Düzenle
                  </a>
                  <a className="py-2 transition-all ease-linear duration-100 rounded-xl px-3 hover:bg-red-600 bg-red-500 hover:cursor-pointer">
                    Sil
                  </a>
                </td>
              </tr>
              <tr className="transition-all hover:bg-zinc-900/20 ease-linear duration-100">
                <td className="text-[15px] px-3 py-4">14 Şubat 2025 00:01</td>
                <td className="text-[15px] hover:underline hover:cursor-pointer px-3 py-4">
                  <a target="blank" href="http://localhost">
                    http://localhost
                  </a>
                </td>
                <td className="text-[15px] hover:underline hover:cursor-pointer px-3 py-4">
                  <a target="blank" href="https://bionluk.com/">
                    https://bionluk.com/
                  </a>
                </td>
                <td className="text-[15px] hover:underline hover:cursor-pointer px-3 py-4">
                  <a target="blank" href="http://localhost/js/as324uy.js">
                    http://localhost/js/as324uy.js
                  </a>
                </td>
                <td className="text-[15px] space-x-1.5 text-end px-3 py-4">
                  <a className="py-2 transition-all ease-linear duration-100 rounded-xl px-3 hover:bg-blue-600 bg-blue-500 hover:cursor-pointer">
                    Düzenle
                  </a>
                  <a className="py-2 transition-all ease-linear duration-100 rounded-xl px-3 hover:bg-red-600 bg-red-500 hover:cursor-pointer">
                    Sil
                  </a>
                </td>
              </tr>
              <tr className="transition-all hover:bg-zinc-900/20 ease-linear duration-100">
                <td className="text-[15px] px-3 py-4">14 Şubat 2025 00:01</td>
                <td className="text-[15px] hover:underline hover:cursor-pointer px-3 py-4">
                  <a target="blank" href="http://localhost">
                    http://localhost
                  </a>
                </td>
                <td className="text-[15px] hover:underline hover:cursor-pointer px-3 py-4">
                  <a target="blank" href="https://bionluk.com/">
                    https://bionluk.com/
                  </a>
                </td>
                <td className="text-[15px] hover:underline hover:cursor-pointer px-3 py-4">
                  <a target="blank" href="http://localhost/js/as324uy.js">
                    http://localhost/js/as324uy.js
                  </a>
                </td>
                <td className="text-[15px] space-x-1.5 text-end px-3 py-4">
                  <a className="py-2 transition-all ease-linear duration-100 rounded-xl px-3 hover:bg-blue-600 bg-blue-500 hover:cursor-pointer">
                    Düzenle
                  </a>
                  <a className="py-2 transition-all ease-linear duration-100 rounded-xl px-3 hover:bg-red-600 bg-red-500 hover:cursor-pointer">
                    Sil
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          id="packages"
          className="flex flex-col items-start justify-start w-full h-full"
        >
          <h1 className="text-lg font-[450] text-zinc-200 mb-2.5">
            Paket Satın Al
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5 w-full">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={cn(
                  "group p-5 relative shadow-[inset_6px_6px_12px_#0a0a0a,inset_-6px_-6px_12px_#1e1e1e] dark:shadow-[6px_6px_14px_#151515,-6px_-6px_12px_#101010] hover:scale-[1.01] dark:hover:bg-zinc-900/30 hover:bg-zinc-200/30 dark:bg-dark bg-light rounded-2xl border dark:border-dark-border border-light-border transition-all duration-150 ease-linear flex flex-col items-start text-start",
                  "hover:bg-gradient-to-tr from-[var(--from-color)] via-[var(--via-color)] to-[var(--to-color)]"
                )}
                style={
                  {
                    "--from-color": pkg.color.from,
                    "--via-color": pkg.color.via,
                    "--to-color": pkg.color.to,
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
                <p className="text-[25px] z-50 font-[550] mt-2">{pkg.price}</p>
                <p className="font-[450] z-50 text-[18px] text-zinc-100">
                  {pkg.accounts}
                </p>
                <p className="text-base z-50 text-zinc-100 mt-1.5 mb-[64px]">
                  {pkg.details?.map((detail: string) => (
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
      </div>
    </main>
  );
}
