import React, { useState, useEffect, useContext } from "react";
import {
  LogOut,
  Plus,
  Settings,
  LayoutDashboard,
  Package,
  ExternalLink,
  History,
  PackagePlus,
  Users,
  TicketPlus,
  Ticket,
  ChartArea,
  ExternalLinkIcon,
  PackageCheck,
  TicketCheck,
  HistoryIcon,
  Bell,
  DatabaseZap,
  HomeIcon,
} from "lucide-react";
import { Popover, Transition } from "@headlessui/react";
import { cn } from "../../lib/utils";
import { AppContext } from "../../app/(app)/context";
import { useLocation, useNavigate } from "react-router";
import { NotificationInterface } from "types";
import { timeAgo } from "../../lib/date";
import { formatContent } from "./dashboardHeader";

export default function Navbar() {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean | undefined>(() => {
    return typeof window !== "undefined"
      ? localStorage.getItem("sidebarCollapse") == "true"
      : undefined;
  });
  useEffect(() => {
    console.log(pathname);
    localStorage.setItem("sidebarCollapse", isDrawerOpen?.toString() || "true");
  }, [isDrawerOpen]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkMobile = () => setIsMobile(window.innerWidth <= 768);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);
  const menuItems: Array<{
    label: string;
    icon: React.ExoticComponent | any;
    path: string;
  }> =
    pathname.split("/")[1] === "admin"
      ? state.userData.permission === "admin"
        ? [
            { label: "Ana sayfa", icon: LayoutDashboard, path: "/admin" },
            {
              label: "İstatistikler",
              icon: ChartArea,
              path: "/admin/stats",
            },
            {
              label: "Aktivite Logları",
              icon: History,
              path: "/admin/activities",
            },
            {
              label: "Yönlendirmeler",
              icon: ExternalLinkIcon,
              path: "/admin/redirects",
            },
            {
              label: "Paketler",
              icon: Package,
              path: "/admin/packages",
            },
            {
              label: "Paket ekle",
              icon: PackagePlus,
              path: "/admin/newPackage",
            },
            {
              label: "Paket siparişleri",
              icon: PackageCheck,
              path: "/admin/packageOrders",
            },
            {
              label: "Abonelikler",
              icon: Ticket,
              path: "/admin/subscriptions",
            },
            {
              label: "Abonelik ekle",
              icon: TicketPlus,
              path: "/admin/newSubscription",
            },
            {
              label: "Abonelik Siparişleri",
              icon: TicketCheck,
              path: "/admin/subscriptionOrders",
            },
            {
              label: "Kullanıcılar",
              icon: Users,
              path: "/admin/users",
            },
          ]
        : [{ label: "Ana sayfa", icon: LayoutDashboard, path: "/dashboard" }]
      : state.userData.permission === "user" &&
        !state.userData.activeSubscription?.subscriptionId
      ? [
          { label: "Ana sayfa", icon: LayoutDashboard, path: "/dashboard" },
          {
            label: "Siparişlerim",
            icon: HistoryIcon,
            path: "/dashboard/orderhistory",
          },
          { label: "Ayarlar", icon: Settings, path: "/dashboard/settings" },
        ]
      : state.userData.activeSubscription?.subscriptionId ||
        state.userData.permission === "admin"
      ? [
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
          {
            label: "Siparişlerim",
            icon: HistoryIcon,
            path: "/dashboard/orderhistory",
          },
          { label: "Ayarlar", icon: Settings, path: "/dashboard/settings" },
        ]
      : [{ label: "Ana sayfa", icon: LayoutDashboard, path: "/dashboard" }];
  const renderMenu = (device: "mobile" | "desktop" = "desktop") => (
    <div className="flex flex-col w-full overflow-y-auto rounded-[22px] mt-2 space-y-1.5 md:space-y-[4px] items-center justify-start">
      {menuItems.map(({ label, icon: Icon, path }) => (
        <div
          key={path}
          onClick={() => {
            navigate(path);
            device === "mobile" && setIsDrawerOpen(false);
          }}
          className={cn(
            device === "mobile" ? "mt-5" : "mt-0",
            "flex flex-row items-center justify-start px-3.5 py-[12px] space-x-2.5 w-full rounded-full text-base transition-all duration-100 hover:cursor-pointer",
            pathname.split("/")[2] ===
              (path.split("/")[2] === "dashboard" ? "" : path.split("/")[2])
              ? `relative text-white font-medium
              before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full 
              before:bg-gradient-to-tr before:from-[#cb0af2] before:via-[#b205dd] before:to-[#5209d5]
              before:bg-[length:200%_200%] before:animate-rgb before:rounded-full before:z-[-1] 
              hover:text-white hover:before:opacity-100 transition-all duration-100 ease-linear`
              : "dark:hover:bg-zinc-900/30 hover:bg-zinc-200/50 dark:active:bg-zinc-900/50 font-[450] dark:text-zinc-200 dark:hover:text-zinc-100 text-zinc-800 hover:text-zinc-950"
          )}
        >
          <Icon
            className={isDrawerOpen && device === "desktop" ? "mx-auto" : ""}
            width={20}
            height={20}
            stroke="currentColor"
          />
          {device === "mobile" ? (
            <span className="text-[15px]">{label}</span>
          ) : (
            !isDrawerOpen && <span className="text-[15px]">{label}</span>
          )}
        </div>
      ))}
    </div>
  );
  if (isMobile) {
    return (
      <>
        <div className="fixed top-0 left-0 w-full z-[88888] backdrop-blur-lg bg-light/10 dark:bg-dark/10 border-b border-light-border dark:border-dark-border px-2 py-2 flex items-center justify-between">
          <div
            onClick={() => setIsDrawerOpen(true)}
            className="dark:text-zinc-100 dark:hover:text-white text-zinc-700 hover:text-zinc-800 px-2.5 py-2 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/80 rounded-2xl hover:cursor-pointer transition-all ease-linear duration-100"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              <path
                d="M8.85719 3H15.1428C16.2266 2.99999 17.1007 2.99998 17.8086 3.05782C18.5375 3.11737 19.1777 3.24318 19.77 3.54497C20.7108 4.02433 21.4757 4.78924 21.955 5.73005C22.2568 6.32234 22.3826 6.96253 22.4422 7.69138C22.5 8.39925 22.5 9.27339 22.5 10.3572V13.6428C22.5 14.7266 22.5 15.6008 22.4422 16.3086C22.3826 17.0375 22.2568 17.6777 21.955 18.27C21.4757 19.2108 20.7108 19.9757 19.77 20.455C19.1777 20.7568 18.5375 20.8826 17.8086 20.9422C17.1008 21 16.2266 21 15.1428 21H8.85717C7.77339 21 6.89925 21 6.19138 20.9422C5.46253 20.8826 4.82234 20.7568 4.23005 20.455C3.28924 19.9757 2.52433 19.2108 2.04497 18.27C1.74318 17.6777 1.61737 17.0375 1.55782 16.3086C1.49998 15.6007 1.49999 14.7266 1.5 13.6428V10.3572C1.49999 9.27341 1.49998 8.39926 1.55782 7.69138C1.61737 6.96253 1.74318 6.32234 2.04497 5.73005C2.52433 4.78924 3.28924 4.02433 4.23005 3.54497C4.82234 3.24318 5.46253 3.11737 6.19138 3.05782C6.89926 2.99998 7.77341 2.99999 8.85719 3ZM6.35424 5.05118C5.74907 5.10062 5.40138 5.19279 5.13803 5.32698C4.57354 5.6146 4.1146 6.07354 3.82698 6.63803C3.69279 6.90138 3.60062 7.24907 3.55118 7.85424C3.50078 8.47108 3.5 9.26339 3.5 10.4V13.6C3.5 14.7366 3.50078 15.5289 3.55118 16.1458C3.60062 16.7509 3.69279 17.0986 3.82698 17.362C4.1146 17.9265 4.57354 18.3854 5.13803 18.673C5.40138 18.8072 5.74907 18.8994 6.35424 18.9488C6.97108 18.9992 7.76339 19 8.9 19H9.5V5H8.9C7.76339 5 6.97108 5.00078 6.35424 5.05118ZM11.5 5V19H15.1C16.2366 19 17.0289 18.9992 17.6458 18.9488C18.2509 18.8994 18.5986 18.8072 18.862 18.673C19.4265 18.3854 19.8854 17.9265 20.173 17.362C20.3072 17.0986 20.3994 16.7509 20.4488 16.1458C20.4992 15.5289 20.5 14.7366 20.5 13.6V10.4C20.5 9.26339 20.4992 8.47108 20.4488 7.85424C20.3994 7.24907 20.3072 6.90138 20.173 6.63803C19.8854 6.07354 19.4265 5.6146 18.862 5.32698C18.5986 5.19279 18.2509 5.10062 17.6458 5.05118C17.0289 5.00078 16.2366 5 15.1 5H11.5ZM5 8.5C5 7.94772 5.44772 7.5 6 7.5H7C7.55229 7.5 8 7.94772 8 8.5C8 9.05229 7.55229 9.5 7 9.5H6C5.44772 9.5 5 9.05229 5 8.5ZM5 12C5 11.4477 5.44772 11 6 11H7C7.55229 11 8 11.4477 8 12C8 12.5523 7.55229 13 7 13H6C5.44772 13 5 12.5523 5 12Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <span
            onClick={() => navigate("/dashboard")}
            className="text-[16px] hover:cursor-pointer dark:text-zinc-50 text-zinc-800 font-medium"
          >
            Eksen Panel
          </span>
          <div className="flex flex-row items-center justify-center space-x-1">
            <div
              onClick={() => navigate("/admin/sitesettings")}
              className={`${
                pathname.split("/")[2] === "sitesettings"
                  ? "bg-zinc-200/60 dark:bg-zinc-800/60"
                  : "hover:bg-zinc-200/50 bg-zinc-200/10 dark:bg-zinc-800/10 dark:hover:bg-zinc-800/50"
              } dark:text-zinc-100 text-zinc-800 px-3 py-2 rounded-2xl hover:cursor-pointer transition-all ease-linear duration-100`}
            >
              <Settings stroke="currentColor" width={22} height={22} />
            </div>
            {state.userData.permission === "admin" &&
              (pathname.split("/")[1] === "admin" ? (
                <div
                  onClick={() => navigate("/dashboard")}
                  className={`${
                    pathname.split("/")[1] === "dashboard"
                      ? "bg-zinc-200/60 dark:bg-zinc-800/60"
                      : "hover:bg-zinc-200/50 bg-zinc-200/10 dark:bg-zinc-800/10 dark:hover:bg-zinc-800/50"
                  } dark:text-zinc-100 text-zinc-800 px-3 py-2 rounded-2xl hover:cursor-pointer transition-all ease-linear duration-100`}
                >
                  <HomeIcon stroke="currentColor" width={22} height={22} />
                </div>
              ) : (
                <div
                  onClick={() => navigate("/admin")}
                  className={`${
                    pathname.split("/")[1] === "admin"
                      ? "bg-zinc-200/60 dark:bg-zinc-800/60"
                      : "hover:bg-zinc-200/50 bg-zinc-200/10 dark:bg-zinc-800/10 dark:hover:bg-zinc-800/50"
                  } dark:text-zinc-100 text-zinc-800 px-3 py-2 rounded-2xl hover:cursor-pointer transition-all ease-linear duration-100`}
                >
                  <DatabaseZap stroke="currentColor" width={22} height={22} />
                </div>
              ))}
            <div
              onClick={() => navigate("/dashboard/notifications")}
              className="hover:bg-zinc-200/50 bg-zinc-200/10 dark:bg-zinc-800/10 dark:hover:bg-zinc-800/50 dark:text-zinc-100 text-zinc-800 px-3 py-2  rounded-2xl hover:cursor-pointer transition-all ease-linear duration-100"
            >
              <Bell stroke="currentColor" width={22} height={22} />
            </div>
          </div>
        </div>
        <div
          className={cn(
            "fixed z-[99999] inset-0 bg-dark/20 backdrop-blur-lg dark:bg-black/50 transition-all ease-linear duration-150",
            isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
          )}
          onClick={() => setIsDrawerOpen(false)}
        ></div>
        <div
          className={cn(
            "fixed top-0 shadow-xl shadow-black/20 dark:shadow-black/30 z-[99999] left-0 h-full bg-light dark:bg-dark border-r border-light-border dark:border-dark-border w-[280px] py-4 transition-transform duration-200",
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-row items-center justify-between pl-[22px] pr-[12px]">
            <div
              onClick={() => navigate("/dashboard")}
              className="sticky top-3 dark:text-zinc-200 dark:hover:text-zinc-50 text-zinc-800 hover:text-zinc-950 font-[450] flex flex-row items-center justify-start space-x-2.5 text-start transition-all ease-linear duration-100 hover:cursor-pointer w-full rounded-full text-base"
            >
              <span className="text-[17px] tracking-[-0.005em] font-medium">
                Eksen Panel
              </span>
            </div>
            <div
              onClick={() => setIsDrawerOpen(false)}
              className="dark:text-zinc-100 dark:hover:text-white text-zinc-700 hover:text-zinc-800 px-2.5 py-2 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/80 rounded-2xl hover:cursor-pointer transition-all ease-linear duration-100"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
                strokeLinejoin="round"
                strokeLinecap="round"
              >
                <path
                  d="M8.85719 3H15.1428C16.2266 2.99999 17.1007 2.99998 17.8086 3.05782C18.5375 3.11737 19.1777 3.24318 19.77 3.54497C20.7108 4.02433 21.4757 4.78924 21.955 5.73005C22.2568 6.32234 22.3826 6.96253 22.4422 7.69138C22.5 8.39925 22.5 9.27339 22.5 10.3572V13.6428C22.5 14.7266 22.5 15.6008 22.4422 16.3086C22.3826 17.0375 22.2568 17.6777 21.955 18.27C21.4757 19.2108 20.7108 19.9757 19.77 20.455C19.1777 20.7568 18.5375 20.8826 17.8086 20.9422C17.1008 21 16.2266 21 15.1428 21H8.85717C7.77339 21 6.89925 21 6.19138 20.9422C5.46253 20.8826 4.82234 20.7568 4.23005 20.455C3.28924 19.9757 2.52433 19.2108 2.04497 18.27C1.74318 17.6777 1.61737 17.0375 1.55782 16.3086C1.49998 15.6007 1.49999 14.7266 1.5 13.6428V10.3572C1.49999 9.27341 1.49998 8.39926 1.55782 7.69138C1.61737 6.96253 1.74318 6.32234 2.04497 5.73005C2.52433 4.78924 3.28924 4.02433 4.23005 3.54497C4.82234 3.24318 5.46253 3.11737 6.19138 3.05782C6.89926 2.99998 7.77341 2.99999 8.85719 3ZM6.35424 5.05118C5.74907 5.10062 5.40138 5.19279 5.13803 5.32698C4.57354 5.6146 4.1146 6.07354 3.82698 6.63803C3.69279 6.90138 3.60062 7.24907 3.55118 7.85424C3.50078 8.47108 3.5 9.26339 3.5 10.4V13.6C3.5 14.7366 3.50078 15.5289 3.55118 16.1458C3.60062 16.7509 3.69279 17.0986 3.82698 17.362C4.1146 17.9265 4.57354 18.3854 5.13803 18.673C5.40138 18.8072 5.74907 18.8994 6.35424 18.9488C6.97108 18.9992 7.76339 19 8.9 19H9.5V5H8.9C7.76339 5 6.97108 5.00078 6.35424 5.05118ZM11.5 5V19H15.1C16.2366 19 17.0289 18.9992 17.6458 18.9488C18.2509 18.8994 18.5986 18.8072 18.862 18.673C19.4265 18.3854 19.8854 17.9265 20.173 17.362C20.3072 17.0986 20.3994 16.7509 20.4488 16.1458C20.4992 15.5289 20.5 14.7366 20.5 13.6V10.4C20.5 9.26339 20.4992 8.47108 20.4488 7.85424C20.3994 7.24907 20.3072 6.90138 20.173 6.63803C19.8854 6.07354 19.4265 5.6146 18.862 5.32698C18.5986 5.19279 18.2509 5.10062 17.6458 5.05118C17.0289 5.00078 16.2366 5 15.1 5H11.5ZM5 8.5C5 7.94772 5.44772 7.5 6 7.5H7C7.55229 7.5 8 7.94772 8 8.5C8 9.05229 7.55229 9.5 7 9.5H6C5.44772 9.5 5 9.05229 5 8.5ZM5 12C5 11.4477 5.44772 11 6 11H7C7.55229 11 8 11.4477 8 12C8 12.5523 7.55229 13 7 13H6C5.44772 13 5 12.5523 5 12Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
          <div className="flex flex-col items-start justify-between max-w-[86%] w-full h-full mx-4">
            {renderMenu("mobile")}
            {pathname.split("/")[1] === "dashboard" && (
              <div
                onClick={() => navigate("/auth/logout")}
                className="border left-3 right-3 sticky bottom-3 dark:text-zinc-200 dark:hover:text-zinc-50 text-zinc-800 hover:text-zinc-950 dark:hover:bg-zinc-900/50 hover:bg-zinc-200/50 border-light-border/80 dark:border-dark-border/80 hover:border-light-border/95 dark:hover:border-dark-border/95 font-[450] flex flex-row items-center justify-start space-x-2.5 text-start px-3.5 transition-all ease-linear duration-100 hover:cursor-pointer w-full rounded-full py-[11px] text-base"
              >
                <LogOut width={20} height={20} stroke="currentColor" />
                <span className="text-[15px]">Çıkış yap</span>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <nav
        className={`${
          !isDrawerOpen ? "max-w-[17%]" : "max-w-[4.75%]" //hover:max-w-[15%]//
        } flex neon-box-2 transition-all ease-in-out duration-200 transform sticky top-0 w-full z-[66666] min-h-screen left-0 h-full justify-between border-r px-2.5 py-3 border-light-border bg-light/10 dark:bg-[#111111] dark:border-dark-border flex-col items-center`}
      >
        <div className="flex relative flex-row items-center justify-between w-full">
          {!isDrawerOpen && (
            <div
              onClick={() => navigate("/")}
              className="sticky flex top-3 dark:text-zinc-200 dark:hover:text-zinc-50 text-zinc-800 hover:text-zinc-950 font-[450] flex-row items-center justify-center space-x-2.5 text-center transition-all ease-linear duration-100 hover:cursor-pointer w-full rounded-full text-base"
            >
              <img
                draggable="false"
                className="top-0 mt-[-45px] ml-[-45px] absolute h-[130px] z-[77777]"
                src="https://eksenpanel.com/logo.png"
              />
              <div className="rgb left-[32px] top-[-22px] h-[64px] rounded-full w-[64px] z-[66666] absolute blur-xl">
                &nbsp;
              </div>
            </div>
          )}
          <div
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="dark:text-zinc-100 text-zinc-800 mx-auto px-2.5 py-2 hover:bg-zinc-200/50 dark:hover:bg-zinc-900/50 rounded-2xl hover:cursor-pointer transition-all ease-linear duration-100"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              <path
                d="M8.85719 3H15.1428C16.2266 2.99999 17.1007 2.99998 17.8086 3.05782C18.5375 3.11737 19.1777 3.24318 19.77 3.54497C20.7108 4.02433 21.4757 4.78924 21.955 5.73005C22.2568 6.32234 22.3826 6.96253 22.4422 7.69138C22.5 8.39925 22.5 9.27339 22.5 10.3572V13.6428C22.5 14.7266 22.5 15.6008 22.4422 16.3086C22.3826 17.0375 22.2568 17.6777 21.955 18.27C21.4757 19.2108 20.7108 19.9757 19.77 20.455C19.1777 20.7568 18.5375 20.8826 17.8086 20.9422C17.1008 21 16.2266 21 15.1428 21H8.85717C7.77339 21 6.89925 21 6.19138 20.9422C5.46253 20.8826 4.82234 20.7568 4.23005 20.455C3.28924 19.9757 2.52433 19.2108 2.04497 18.27C1.74318 17.6777 1.61737 17.0375 1.55782 16.3086C1.49998 15.6007 1.49999 14.7266 1.5 13.6428V10.3572C1.49999 9.27341 1.49998 8.39926 1.55782 7.69138C1.61737 6.96253 1.74318 6.32234 2.04497 5.73005C2.52433 4.78924 3.28924 4.02433 4.23005 3.54497C4.82234 3.24318 5.46253 3.11737 6.19138 3.05782C6.89926 2.99998 7.77341 2.99999 8.85719 3ZM6.35424 5.05118C5.74907 5.10062 5.40138 5.19279 5.13803 5.32698C4.57354 5.6146 4.1146 6.07354 3.82698 6.63803C3.69279 6.90138 3.60062 7.24907 3.55118 7.85424C3.50078 8.47108 3.5 9.26339 3.5 10.4V13.6C3.5 14.7366 3.50078 15.5289 3.55118 16.1458C3.60062 16.7509 3.69279 17.0986 3.82698 17.362C4.1146 17.9265 4.57354 18.3854 5.13803 18.673C5.40138 18.8072 5.74907 18.8994 6.35424 18.9488C6.97108 18.9992 7.76339 19 8.9 19H9.5V5H8.9C7.76339 5 6.97108 5.00078 6.35424 5.05118ZM11.5 5V19H15.1C16.2366 19 17.0289 18.9992 17.6458 18.9488C18.2509 18.8994 18.5986 18.8072 18.862 18.673C19.4265 18.3854 19.8854 17.9265 20.173 17.362C20.3072 17.0986 20.3994 16.7509 20.4488 16.1458C20.4992 15.5289 20.5 14.7366 20.5 13.6V10.4C20.5 9.26339 20.4992 8.47108 20.4488 7.85424C20.3994 7.24907 20.3072 6.90138 20.173 6.63803C19.8854 6.07354 19.4265 5.6146 18.862 5.32698C18.5986 5.19279 18.2509 5.10062 17.6458 5.05118C17.0289 5.00078 16.2366 5 15.1 5H11.5ZM5 8.5C5 7.94772 5.44772 7.5 6 7.5H7C7.55229 7.5 8 7.94772 8 8.5C8 9.05229 7.55229 9.5 7 9.5H6C5.44772 9.5 5 9.05229 5 8.5ZM5 12C5 11.4477 5.44772 11 6 11H7C7.55229 11 8 11.4477 8 12C8 12.5523 7.55229 13 7 13H6C5.44772 13 5 12.5523 5 12Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
        {renderMenu()}
        {pathname.split("/")[1] === "dashboard" && (
          <div
            onClick={() => navigate("/auth/logout")}
            className="border sticky bottom-3 dark:text-zinc-200 dark:hover:text-zinc-50 text-zinc-800 hover:text-zinc-950 dark:hover:bg-zinc-900/50 hover:bg-zinc-200/50 border-light-border/80 dark:border-dark-border/80 hover:border-light-border/95 dark:hover:border-dark-border/95 font-[450] flex flex-row items-center justify-start space-x-2.5 text-start px-3.5 transition-all ease-linear duration-100 hover:cursor-pointer w-full rounded-full py-[11px] text-base"
          >
            <LogOut
              width={20}
              height={20}
              stroke="currentColor"
              className={isDrawerOpen ? "mx-auto" : ""}
            />
            {!isDrawerOpen && <span className="text-[15px]">Çıkış yap</span>}
          </div>
        )}
      </nav>
    </>
  );
}
