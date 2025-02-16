"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "../navbar";
import { Calendar, Code, Link, SquareArrowOutUpRight } from "lucide-react";

export default function Links() {
  const router = useRouter();
  return (
    <main className="relative top-[55px] md:top-0 flex flex-row h-full w-full overflow-x-hidden">
      <Navbar />
      <div className="flex space-y-2.5 flex-col min-h-[100vh] items-start px-5 py-4 justify-start w-full h-full">
        <div className="flex flex-row items-center justify-between w-full">
          <h1 className="text-lg font-[450] text-zinc-200">Paketlerim</h1>
          <h2
            onClick={() => router.push("/dashboard#packages")}
            className="text-md text-blue-500 hover:underline hover:cursor-pointer font-[450]"
          >
            Satın al {"->"}
          </h2>
        </div>
        <div className="flex shadow-inner shadow-zinc-900/10 flex-col bg-light/20 dark:bg-dark/20 border dark:border-dark-border border-light-border rounded-2xl w-full h-full">
          <table className="min-w-full overflow-x-auto overflow-y-auto w-full">
            <thead className="border-b inset-0 dark:border-dark-border/80 border-light-border/80 rounded-t-2xl w-full">
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
                  <a
                    onClick={() => router.push("/dashboard/editRedirect")}
                    className="py-2 transition-all ease-linear duration-100 rounded-xl px-3 hover:bg-blue-600 bg-blue-500 hover:cursor-pointer"
                  >
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
                  <a
                    onClick={() => router.push("/dashboard/editRedirect")}
                    className="py-2 transition-all ease-linear duration-100 rounded-xl px-3 hover:bg-blue-600 bg-blue-500 hover:cursor-pointer"
                  >
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
                  <a
                    onClick={() => router.push("/dashboard/editRedirect")}
                    className="py-2 transition-all ease-linear duration-100 rounded-xl px-3 hover:bg-blue-600 bg-blue-500 hover:cursor-pointer"
                  >
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
      </div>
    </main>
  );
}
