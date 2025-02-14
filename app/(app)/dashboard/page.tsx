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

export default function Dashboard() {
  const router = useRouter();
  return (
    <main>
      <div className="flex w-full h-full min-h-[91.53vh] flex-row items-start justify-start">
        {/* Sidebar */}
        <Navbar />
        <div className="flex flex-col gap-2.5 min-h-[91.53vh] items-start px-3.5 py-3 justify-start w-full max-w-full md:max-w-[83%] h-full">
          <div className="w-full gap-2.5 min-h-[160px] grid grid-cols-1 grid-rows-4 md:grid-rows-2 md:grid-cols-2 lg:grid-cols-2 lg:grid-rows-2 xl:grid-cols-4 xl:grid-rows-1">
            <div className="border shadow-xl shadow-black/5 flex flex-row items-start justify-between border-light-border dark:border-dark-border bg-light/20 dark:bg-dark/20 rounded-2xl p-5">
              <div className="flex flex-col space-y-1 items-start justify-start">
                <p className="tracking-[-0.012em] text-[17px] font-[450]">
                  Toplam Link
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
                <span
                  onClick={() => router.push("/dashboard/newLink")}
                  className="bg-[#7c3aed]/10 hover:cursor-pointer active:scale-[0.99] transition-all ease-linear duration-100 hover:bg-[#7c3aed]/15 text-[#a071f0] rounded-[9px] p-2"
                >
                  <Plus
                    stroke="currentColor"
                    strokeWidth={2.5}
                    height={22}
                    width={22}
                  />
                </span>
              </div>
            </div>
            <div className="border shadow-xl shadow-black/5 flex flex-row items-start justify-between border-light-border dark:border-dark-border bg-light/20 dark:bg-dark/20 rounded-2xl p-5">
              <div className="flex flex-col space-y-1 items-start justify-start">
                <p className="tracking-[-0.012em] text-[17px] font-[450]">
                  Aktif Linkler
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
            <div className="border shadow-xl shadow-black/5 flex flex-row items-start justify-between border-light-border dark:border-dark-border bg-light/20 dark:bg-dark/20 rounded-2xl p-5">
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
            <div className="border shadow-xl shadow-black/5 flex flex-row items-start justify-between border-light-border dark:border-dark-border bg-light/20 dark:bg-dark/20 rounded-2xl p-5">
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
          <div className="flex flex-col bg-zinc-900/20 rounded-2xl w-full h-full">
            <div className="flex flex-row px-5 pt-4 pb-3 items-center justify-between w-full">
              <h2 className="text-base tracking-[-0.005em] font-[450]">
                Son Eklenen Linkler
              </h2>
              <h2
                onClick={() => router.push("/dashboard/links")}
                className="text-md text-blue-500 hover:underline hover:cursor-pointer font-[450]"
              >
                Tümünü gör {"->"}
              </h2>
            </div>
            <table className="min-w-full w-full">
              <thead className="border-y dark:border-dark-border/80 border-light-border/80 rounded-t-2xl w-full">
                <tr>
                  <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-5 py-1.5">
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
                  <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-5 py-1.5">
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
                  <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-5 py-1.5">
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
                  <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-5 py-1.5">
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
                <tr className="transition-all ease-linear duration-100">
                  <td className="text-[15px] px-5 py-3.5">
                    14 Şubat 2025 00:01
                  </td>
                  <td className="text-[15px] hover:underline hover:cursor-pointer px-5 py-3.5">
                    <a target="blank" href="http://localhost">
                      http://localhost
                    </a>
                  </td>
                  <td className="text-[15px] hover:underline hover:cursor-pointer px-5 py-3.5">
                    <a target="blank" href="https://bionluk.com/">
                      https://bionluk.com/
                    </a>
                  </td>
                  <td className="text-[15px] hover:underline hover:cursor-pointer px-5 py-3.5">
                    <a target="blank" href="http://localhost/js/as324uy.js">
                      http://localhost/js/as324uy.js
                    </a>
                  </td>
                </tr>
                <tr className="transition-all ease-linear duration-100">
                  <td className="text-[15px] px-5 py-3.5">
                    14 Şubat 2025 00:01
                  </td>
                  <td className="text-[15px] hover:underline hover:cursor-pointer px-5 py-3.5">
                    <a target="blank" href="http://localhost">
                      http://localhost
                    </a>
                  </td>
                  <td className="text-[15px] hover:underline hover:cursor-pointer px-5 py-3.5">
                    <a target="blank" href="https://bionluk.com/">
                      https://bionluk.com/
                    </a>
                  </td>
                  <td className="text-[15px] hover:underline hover:cursor-pointer px-5 py-3.5">
                    <a target="blank" href="http://localhost/js/as324uy.js">
                      http://localhost/js/as324uy.js
                    </a>
                  </td>
                </tr>
                <tr className="transition-all ease-linear duration-100">
                  <td className="text-[15px] px-5 py-3.5">
                    14 Şubat 2025 00:01
                  </td>
                  <td className="text-[15px] hover:underline hover:cursor-pointer px-5 py-3.5">
                    <a target="blank" href="http://localhost">
                      http://localhost
                    </a>
                  </td>
                  <td className="text-[15px] hover:underline hover:cursor-pointer px-5 py-3.5">
                    <a target="blank" href="https://bionluk.com/">
                      https://bionluk.com/
                    </a>
                  </td>
                  <td className="text-[15px] hover:underline hover:cursor-pointer px-5 py-3.5">
                    <a target="blank" href="http://localhost/js/as324uy.js">
                      http://localhost/js/as324uy.js
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
