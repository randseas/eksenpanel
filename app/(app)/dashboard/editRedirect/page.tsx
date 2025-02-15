"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../navbar";
import Switch from "@/components/common/switch";

export default function NewLink() {
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(true);
  return (
    <main>
      <div className="flex h-full min-h-[91.53vh] flex-row items-start w-full justify-start">
        <Navbar />
        <div className="flex md:ml-[17%] flex-col min-h-[91.53vh] items-start px-3.5 py-3 justify-start w-full h-full">
          <div className="border m-auto max-w-screen-lg shadow-inner shadow-zinc-900/10 w-full flex flex-col items-start justify-between border-light-border dark:border-dark-border bg-light/20 dark:bg-dark/20 rounded-2xl p-5">
            <h1 className="text-lg font-medium">Yönlendirme Düzenle</h1>
            <span className="dark:text-zinc-200 text-base font-[450]">
              Eklediğiniz yönlendirmeyi düzenleme.
            </span>
            <div className="w-full flex flex-col mt-3.5 items-center justify-center">
              <div className="flex flex-row gap-3.5 items-center justify-between w-full">
                <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
                  <label
                    htmlFor="link"
                    className="text-md font-[450] dark:text-zinc-200"
                  >
                    Ana URL
                  </label>
                  <input
                    id="link"
                    className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/30 border dark:border-dark-border"
                    placeholder="https://example.com"
                  />
                </div>
                <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
                  <label
                    htmlFor="link"
                    className="text-md font-[450] dark:text-zinc-200"
                  >
                    Hedef URL
                  </label>
                  <input
                    id="link"
                    className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/30 border dark:border-dark-border"
                    placeholder="https://example2.com"
                  />
                </div>
              </div>
              <div className="flex mt-3.5 flex-col w-full space-y-1 items-start justify-start text-start">
                <label
                  htmlFor="link"
                  className="text-md font-[450] dark:text-zinc-200"
                >
                  Yönlendirme Kodu
                </label>
                <input
                  id="link"
                  value={`<script async src="https://jısdad.vercel.app/js/usaudd.js"></script>`}
                  readOnly={true}
                  disabled={true}
                  className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/30 border dark:border-dark-border"
                  placeholder="Otomatik oluşturulacak"
                />
                <span className="dark:text-zinc-300 text-sm">
                  Yönlendirme kodu otomatik olarak oluşturulacaktır
                </span>
              </div>
              <div className="flex mt-3.5 flex-col w-full space-y-1 items-start justify-start text-start">
                <label
                  htmlFor="link"
                  className="text-md font-[450] dark:text-zinc-200"
                >
                  Yönlendirme Süresi (Saniye)
                </label>
                <input
                  id="link"
                  value="0"
                  className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/30 border dark:border-dark-border"
                  placeholder="Yönlendirme süresi"
                />
                <span className="dark:text-zinc-300 text-sm">
                  Yönlendirme için beklenecek süre (0 = anında yönlendirme)
                </span>
              </div>
              <div className="flex mt-3.5 flex-row w-full space-y-1 items-start justify-between text-start">
                <div className="flex flex-col text-start items-start justify-center">
                  <label
                    htmlFor="link"
                    className="text-md font-[450] dark:text-zinc-200"
                  >
                    Yönlendirme Durumu
                  </label>
                  <span className="dark:text-zinc-300 text-sm">
                    Yönlendirmenin aktifliğini belirleyin
                  </span>
                </div>
                <Switch
                  checked={checked}
                  onClick={() => setChecked(!checked)}
                />
              </div>
              <button className="w-full shadow-inner shadow-blue-400 mt-4 rounded-xl py-2.5 px-3 bg-blue-500 hover:bg-blue-600/95 active:bg-blue-600 transition-all ease-linear duration-100 hover:cursor-pointer">
                Ayarları Kaydet
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
