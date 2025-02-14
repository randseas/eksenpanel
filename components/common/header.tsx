"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <header className="dark:bg-dark/60 bg-white/80 h-[60px] px-2.5 md:px-4 grid grid-cols-3 grid-rows-1 w-full z-[9999] backdrop-blur-lg border-b border-light-border/80 dark:border-dark-border/80 ease-linear fixed top-0 left-0 right-0 duration-100">
        <div
          onClick={() => router.push("/")}
          className="flex hover:cursor-pointer font-medium flex-row text-lg ml-1 min-w-[550px] w-full h-full py-auto items-center justify-start"
        >
          Tumblr Yönlendirme
        </div>
        <div></div>
        <div className="hidden space-x-[5px] flex-row mr-0.5 md:flex items-center justify-end">
          <a
            onClick={() => router.push(`/dashboard`)}
            className={`${
              pathname.split("/")[1] === "dashboard"
                ? "dark:text-white bg-zinc-300/40 dark:bg-zinc-900/90 text-zinc-900"
                : "dark:text-zinc-300/95 hover:bg-zinc-300/30 dark:hover:bg-zinc-900/70 text-zinc-800/95"
            } text-zinc-800 cursor-pointer font-[450] transition-all ease-linear duration-150 dark:text-zinc-50 rounded-xl flex items-center justify-center px-3 py-2 text-[16px] tracking-[-0.012em]`}
          >
            Dashboard
          </a>
        </div>
      </header>
    </>
  );
}
