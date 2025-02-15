"use client";
import {
  House,
  Link,
  LogOut,
  Plus,
  Settings,
  Menu,
  X,
  Store,
  User,
  LayoutDashboard,
  Package,
  ExternalLink,
  Bell,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mount, setMount] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkMobile = () => setIsMobile(window.innerWidth <= 768);
      checkMobile();
      setTimeout(() => setMount(true), 50);
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);
  const menuItems = [
    { label: "Ana sayfa", icon: LayoutDashboard, path: "/dashboard" },
    {
      label: "Yeni Yönlendirme Ekle",
      icon: Plus,
      path: "/dashboard/newRedirect",
    },
    {
      label: "Yönlendirmeler",
      icon: ExternalLink,
      path: "/dashboard/redirects",
    },
    { label: "Paketlerim", icon: Package, path: "/dashboard/packages" },
    { label: "Ayarlar", icon: Settings, path: "/dashboard/settings" },
  ];
  const renderMenu = (device: "mobile" | "desktop" = "desktop") => (
    <div className="flex flex-col w-full space-y-[4px] items-center justify-start h-full max-h-[70vh]">
      {menuItems.map(({ label, icon: Icon, path }) => (
        <div
          key={path}
          onClick={() => {
            router.push(path);
            setIsDrawerOpen(false);
          }}
          className={cn(
            device === "mobile" ? "mt-8" : "",
            "flex flex-row items-center justify-start space-x-2.5 px-3.5 py-[11px] w-full rounded-full text-base transition-all duration-100 hover:cursor-pointer",
            pathname.split("/")[2] ===
              (path.split("/")[2] === "dashboard" ? "" : path.split("/")[2])
              ? "bg-gradient-to-br from-[#7e25d5] to-[#5108d4] text-blue-50 font-medium"
              : "dark:hover:bg-zinc-900/30 dark:active:bg-zinc-900/50 font-[450] dark:text-zinc-200 dark:hover:text-zinc-100 text-zinc-800 hover:text-zinc-950"
          )}
        >
          <Icon width={20} height={20} stroke="currentColor" />
          <span className="text-[15px]">{label}</span>
        </div>
      ))}
    </div>
  );
  if (isMobile) {
    return (
      <>
        <div className="fixed top-0 left-0 w-full z-[88888] backdrop-blur-lg bg-light/10 dark:bg-dark/10 border-b border-light-border dark:border-dark-border p-4 flex items-center justify-between">
          <button onClick={() => setIsDrawerOpen(true)}>
            <Menu width={24} height={24} />
          </button>
          <span className="text-lg font-medium">Tumblr Yönlendirme</span>
          <div></div>
        </div>
        <div
          className={cn(
            "fixed inset-0 bg-light/50 dark:bg-black/50 z-40 transition-opacity duration-300",
            isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
          )}
          onClick={() => setIsDrawerOpen(false)}
        ></div>
        <div
          className={cn(
            "fixed top-0 z-[99999] left-0 h-full bg-light dark:bg-dark border-r border-light-border dark:border-dark-border w-[280px] p-4 transition-transform duration-200",
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsDrawerOpen(false)}
          >
            <X width={24} height={24} />
          </button>
          {renderMenu("mobile")}
        </div>
      </>
    );
  }
  return (
    <>
      <header className="dark:bg-dark/60 bg-white/80 h-[60px] px-2.5 md:px-4 grid grid-cols-3 grid-rows-1 w-full z-[88888] backdrop-blur-lg border-b border-light-border/80 dark:border-dark-border/80 ease-linear fixed top-0 left-0 right-0 duration-100">
        <div
          onClick={() => router.push("/")}
          className="flex hover:cursor-pointer font-medium flex-row text-[16.5px] xl:text-lg ml-1 min-w-[550px] w-full h-full py-auto items-center justify-start"
        >
          Tumblr Yönlendirme
        </div>
        <div></div>
        <div className="space-x-[5px] flex-row mr-0.5 flex items-center justify-end">
          <a
            className={`${
              false
                ? "dark:text-white bg-zinc-300/40 dark:bg-zinc-900/90 text-zinc-900"
                : "dark:text-zinc-300/95 hover:bg-zinc-300/30 bg-zinc-300/10 dark:hover:bg-zinc-900/70 dark:bg-zinc-900/30 text-zinc-800/95"
            } text-zinc-800 cursor-pointer font-[450] transition-all ease-linear duration-150 dark:text-zinc-50 rounded-xl flex items-center justify-center px-3 py-2.5 text-[16px] tracking-[-0.012em]`}
          >
            <Bell stroke="#ffffff" strokeWidth={2.25} height={20} width={20} />
          </a>
        </div>
      </header>
      <nav className="flex fixed top-[60px] z-[66666] left-0 h-full min-h-[91.53vh] w-[17%] justify-between border-r px-2.5 py-3 border-light-border bg-light/10 dark:bg-dark/10 dark:border-dark-border flex-col items-center">
        {renderMenu()}
        <div
          onClick={() => router.push("/logout")}
          className="border sticky bottom-3 dark:text-zinc-200 dark:hover:text-zinc-50 text-zinc-800 hover:text-zinc-950 dark:hover:bg-zinc-900/50 hover:bg-zinc-200/50 border-light-border/80 dark:border-dark-border/80 hover:border-light-border/95 dark:hover:border-dark-border/95 font-[450] flex flex-row items-center justify-start space-x-2.5 text-start px-3.5 transition-all ease-linear duration-100 hover:cursor-pointer w-full rounded-full py-[11px] text-base"
        >
          <LogOut width={20} height={20} stroke="currentColor" />
          <span className="text-[15px]">Çıkış yap</span>
        </div>
      </nav>
    </>
  );
}
