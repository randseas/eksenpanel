"use client";
import { House, Link, LogOut, Plus, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <nav className="flex h-full min-h-[91.53vh] w-[17%] justify-between border-r px-2.5 py-3 border-light-border bg-light/10 dark:bg-dark/10 dark:border-dark-border flex-col items-center">
      <div className="flex flex-col w-full space-y-[4px] items-center justify-start h-full">
        <div
          onClick={() => router.push("/dashboard/")}
          className={`${
            !pathname.split("/")[2]
              ? "dark:bg-zinc-900/60 font-medium"
              : "dark:hover:bg-zinc-900/30 dark:active:bg-zinc-900/50 font-[450]"
          } flex flex-row dark:text-zinc-200 dark:hover:text-zinc-50 text-zinc-800 hover:text-zinc-950 items-center justify-start space-x-2.5 text-start px-3.5 transition-all ease-linear duration-100 hover:cursor-pointer w-full rounded-xl py-[11px] text-base`}
        >
          <House width={20} height={20} stroke="currentColor" />
          <span className="text-[15px]">Ana sayfa</span>
        </div>
        <div
          onClick={() => router.push("/dashboard/newLink")}
          className={`${
            pathname.split("/")[2] === "newLink"
              ? "dark:bg-zinc-900/60 font-medium"
              : "dark:hover:bg-zinc-900/30 dark:active:bg-zinc-900/50 font-[450]"
          } flex flex-row dark:text-zinc-200 dark:hover:text-zinc-50 text-zinc-800 hover:text-zinc-950 items-center justify-start space-x-2.5 text-start px-3.5 transition-all ease-linear duration-100 hover:cursor-pointer w-full rounded-xl py-[11px] text-base`}
        >
          <Plus width={20} height={20} stroke="currentColor" />
          <span className="text-[15px]">Yeni Link Ekle</span>
        </div>
        <div
          onClick={() => router.push("/dashboard/links")}
          className={`${
            pathname.split("/")[2] === "links"
              ? "dark:bg-zinc-900/60 font-medium"
              : "dark:hover:bg-zinc-900/30 dark:active:bg-zinc-900/50 font-[450]"
          } flex flex-row dark:text-zinc-200 dark:hover:text-zinc-50 text-zinc-800 hover:text-zinc-950 items-center justify-start space-x-2.5 text-start px-3.5 transition-all ease-linear duration-100 hover:cursor-pointer w-full rounded-xl py-[11px] text-base`}
        >
          <Link width={20} height={20} stroke="currentColor" />
          <span className="text-[15px]">Linkler</span>
        </div>
        <div
          onClick={() => router.push("/dashboard/settings")}
          className={`${
            pathname.split("/")[2] === "settings"
              ? "dark:bg-zinc-900/60 font-medium"
              : "dark:hover:bg-zinc-900/30 dark:active:bg-zinc-900/50 font-[450]"
          } flex flex-row dark:text-zinc-200 dark:hover:text-zinc-50 text-zinc-800 hover:text-zinc-950 items-center justify-start space-x-2.5 text-start px-3.5 transition-all ease-linear duration-100 hover:cursor-pointer w-full rounded-xl py-[11px] text-base`}
        >
          <Settings width={20} height={20} stroke="currentColor" />
          <span className="text-[15px]">Ayarlar</span>
        </div>
      </div>
      <div
        onClick={() => router.push("/oauth/logout")}
        className="border dark:text-zinc-200 dark:hover:text-zinc-50 text-zinc-800 hover:text-zinc-950 dark:hover:bg-zinc-900/50 hover:bg-zinc-200/50 border-light-border/80 dark:border-dark-border/80 hover:border-light-border/95 dark:hover:border-dark-border/95 font-[450] flex flex-row items-center justify-start space-x-2.5 text-start px-3.5 transition-all ease-linear duration-100 hover:cursor-pointer w-full rounded-xl py-[11px] text-base"
      >
        <LogOut width={20} height={20} stroke="currentColor" />
        <span className="text-[15px]">Çıkış yap</span>
      </div>
    </nav>
  );
}
