"use client";
import React from "react";
import Header from "@/components/common/header";
import { useRouter } from "next/navigation";
import Navbar from "../navbar";

export default function NewLink() {
  const router = useRouter();
  return (
    <main>
      <Header />
      <div className="flex h-full min-h-[91.53vh] flex-row items-start w-full justify-start">
        {/* Sidebar */}
        <Navbar />
        <div className="flex flex-col min-h-[91.53vh] items-start px-3.5 py-3 justify-start max-w-[83%] w-full h-full">
          <div className="border shadow-xl shadow-black/5 max-w-[1000px] w-full flex flex-col items-start justify-between border-light-border dark:border-dark-border bg-light/20 dark:bg-dark/20 rounded-2xl p-5">
            <h1 className="text-lg font-medium">Yeni Link Ekle</h1>
            <span className="dark:text-zinc-200 text-base font-[450]">
              Yeni bir yönlendirme linki ekleyin.
            </span>
            <div className="w-full flex flex-col mt-3.5 items-center justify-center">
              <div className="flex flex-row gap-3.5 items-center justify-between w-full">
                <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
                  <label
                    htmlFor="link"
                    className="text-md font-[450] dark:text-zinc-200"
                  >
                    Link URL
                  </label>
                  <input
                    id="link"
                    className="px-3.5 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/30 border dark:border-dark-border"
                    placeholder="https://example.com"
                  />
                </div>
                <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
                  <label
                    htmlFor="link"
                    className="text-md font-[450] dark:text-zinc-200"
                  >
                    Yönlenecek URL
                  </label>
                  <input
                    id="link"
                    className="px-3.5 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/30 border dark:border-dark-border"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              <div className="flex mt-3.5 flex-col w-full space-y-1 items-start justify-start text-start">
                <label
                  htmlFor="link"
                  className="text-md font-[450] dark:text-zinc-200"
                >
                  JS URL
                </label>
                <input
                  id="link"
                  className="px-3.5 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/30 border dark:border-dark-border"
                  placeholder="Otomatik oluşturulacak"
                />
                <span className="dark:text-zinc-200">Yönlendirme JS dosyası otomatik olarak oluşturulacaktır</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
