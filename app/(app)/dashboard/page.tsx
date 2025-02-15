"use client";
import React from "react";
import Header from "@/components/common/header";
import { useRouter } from "next/navigation";
import Navbar from "./navbar";
import {
  Calendar,
  Code,
  Link,
  Monitor,
  Plus,
  Smartphone,
  SquareArrowOutUpRight,
  ToggleRight,
} from "lucide-react";
import toast from "react-hot-toast";

const packages = [
  {
    name: "Bronz Paket",
    accounts: "35 Hesap",
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
    <main className="relative dark:bg-dark bg-light dark:text-light text-dark">
      <div className="flex relative w-full h-full min-h-[91.53vh] flex-row items-start justify-start">
        <Navbar />
        <div className="flex md:ml-[17%] space-y-2.5 flex-col min-h-[91.53vh] items-start px-3.5 py-3 justify-start w-full h-full">
          <h1 className="text-lg font-[450] text-zinc-200">Ana sayfa</h1>
          <div className="w-full gap-2.5 grid grid-cols-1 grid-rows-4 md:grid-rows-2 md:grid-cols-2 lg:grid-cols-2 lg:grid-rows-2 xl:grid-cols-4 xl:grid-rows-1">
            <div
              onClick={() => router.push("/dashboard/redirects")}
              className="border shadow-inner shadow-zinc-900/10 min-h-[120px] lg:min-h-[160px] hover:scale-[1.012] transition-all ease-linear duration-100 dark:hover:bg-zinc-900/30 hover:bg-zinc-200/30 flex flex-row items-start justify-between border-light-border dark:border-dark-border bg-light/20 dark:bg-dark/20 rounded-2xl p-5"
            >
              <div className="flex flex-col space-y-1 items-start justify-start">
                <p className="tracking-[-0.012em] text-[17px] font-[450]">
                  Toplam Yönlendirmeler
                </p>
                <span className="text-2xl font-medium">0</span>
              </div>
              <div className="flex flex-col items-end justify-start space-y-3.5 h-full w-auto">
                <div className="p-[14px] text-[#a071f0] rounded-xl bg-[#7c3aed]/10">
                  <span>
                    <Link
                      stroke="currentColor"
                      strokeWidth={2.5}
                      height={22}
                      width={22}
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className="border shadow-inner shadow-zinc-900/10 min-h-[120px] lg:min-h-[160px] hover:scale-[1.012] transition-all ease-linear duration-100 dark:hover:bg-zinc-900/30 hover:bg-zinc-200/30 flex flex-row items-start justify-between border-light-border dark:border-dark-border bg-light/20 dark:bg-dark/20 rounded-2xl p-5">
              <div className="flex flex-col space-y-1 items-start justify-start">
                <p className="tracking-[-0.012em] text-[17px] font-[450]">
                  Aktif Yönlendirmeler
                </p>
                <span className="text-2xl font-medium">0</span>
              </div>
              <div className="flex flex-col items-end justify-start space-y-3.5 h-full w-auto">
                <div className="p-[14px] text-[#68cf90] rounded-xl bg-[#1aae53]/10">
                  <span>
                    <ToggleRight
                      stroke="currentColor"
                      strokeWidth={2.5}
                      height={22}
                      width={22}
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className="border shadow-inner shadow-zinc-900/10 min-h-[120px] lg:min-h-[160px] hover:scale-[1.012] transition-all ease-linear duration-100 dark:hover:bg-zinc-900/30 hover:bg-zinc-200/30 flex flex-row items-start justify-between border-light-border dark:border-dark-border bg-light/20 dark:bg-dark/20 rounded-2xl p-5">
              <div className="flex flex-col space-y-1 items-start justify-start">
                <p className="tracking-[-0.012em] text-[17px] font-[450]">
                  Sadece Mobilde Aktif
                </p>
                <span className="text-2xl font-medium">0</span>
              </div>
              <div className="flex flex-col items-end justify-start space-y-3.5 h-full w-auto">
                <div className="p-[14px] text-[#7298eb] rounded-xl bg-[#2058d1]/10">
                  <span>
                    <Smartphone
                      stroke="currentColor"
                      strokeWidth={2.5}
                      height={22}
                      width={22}
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className="border shadow-inner shadow-zinc-900/10 min-h-[120px] lg:min-h-[160px] hover:scale-[1.012] transition-all ease-linear duration-100 dark:hover:bg-zinc-900/30 hover:bg-zinc-200/30 flex flex-row items-start justify-between border-light-border dark:border-dark-border bg-light/20 dark:bg-dark/20 rounded-2xl p-5">
              <div className="flex flex-col space-y-1 items-start justify-start">
                <p className="tracking-[-0.012em] text-[17px] font-[450]">
                  Sadece Masaüstünde Aktif
                </p>
                <span className="text-2xl font-medium">0</span>
              </div>
              <div className="flex flex-col items-end justify-start space-y-3.5 h-full w-auto">
                <div className="p-[14px] text-[#e6af71] rounded-xl bg-[#dd7c10]/10">
                  <span>
                    <Monitor
                      stroke="currentColor"
                      strokeWidth={2.5}
                      height={22}
                      width={22}
                    />
                  </span>
                </div>
              </div>
            </div>
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
          <div className="flex shadow-inner shadow-zinc-900/10 flex-col bg-light/20 dark:bg-dark/20 border dark:border-dark-border border-light-border rounded-2xl w-full h-full">
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
          <div className="flex flex-col items-start justify-start w-full h-full">
            <h1 className="text-lg font-[450] text-zinc-200 mb-2.5">
              Paket Satın Al
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5 w-full">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className="p-5 relative shadow-inner shadow-zinc-900/10 hover:shadow-zinc-800/20 hover:shadow-inner hover:scale-[1.01] dark:hover:bg-zinc-900/30 hover:bg-zinc-200/30 dark:bg-dark bg-light rounded-2xl border dark:border-dark-border border-light-border transition-all duration-100 ease-linear flex flex-col items-start text-start"
                >
                  <h2 className="tracking-[-0.012em] text-[19px] font-[450]">
                    {pkg.name}
                  </h2>
                  <p className="text-[25px] font-[550] mt-2">{pkg.price}</p>
                  <p className="font-[450] text-[18px] text-zinc-100">
                    {pkg.accounts}
                  </p>
                  <p className="text-base text-zinc-100 mt-1.5 mb-[64px]">
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
                    className="bg-zinc-900/60 space-x-[70px] absolute bottom-4 border dark:hover:bg-zinc-900/70 border-light-border dark:border-dark-border p-2 hover:cursor-pointer rounded-full flex flex-row items-center justify-between w-auto"
                  >
                    <span className="px-2 font-medium text-base">Satın al</span>
                    <div className="bg-white px-2.5 py-1 text-black rounded-full font-medium text-lg">
                      {"->"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
