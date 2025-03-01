import React from "react";
import checkLogin from "../../helpers/authHelper";
import { useLocation, useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation().toString();
  const isLogin = checkLogin();
  return (
    <>
      <header className="dark:bg-dark/60 bg-white/80 h-[60px] px-2.5 md:px-4 grid grid-cols-3 grid-rows-1 w-full z-[9999] backdrop-blur-lg border-b border-light-border/80 dark:border-zinc-800 ease-linear fixed top-0 left-0 right-0 duration-100">
        <div
          onClick={() => navigate("/")}
          className="flex hover:cursor-pointer font-medium flex-row text-[16.5px] xl:text-lg ml-1 min-w-[550px] w-full h-full py-auto items-center justify-start"
        >
          Eksen Panel
        </div>
        <div></div>
        <div className="space-x-[5px] w-full flex-row mr-0.5 flex items-center justify-end">
          {isLogin ? (
            <a
              onClick={() => navigate(`/dashboard`)}
              className={`${
                location.split("/")[1] === "dashboard"
                  ? "dark:text-white bg-zinc-300/40 dark:bg-zinc-800/90 text-zinc-900"
                  : "dark:text-zinc-300/95 hover:bg-zinc-300/30 dark:hover:bg-zinc-800/70 text-zinc-800/95"
              } text-zinc-800 border dark:border-zinc-800 border-zinc-200 cursor-pointer font-[450] transition-all ease-linear duration-150 dark:text-zinc-50 rounded-xl flex items-center justify-center px-3 py-2 text-[16px] tracking-[-0.012em]`}
            >
              Dashboard
            </a>
          ) : (
            <a
              onClick={() => navigate(`/auth`)}
              className={`${
                location.split("/")[1] === "auth"
                  ? "dark:text-white bg-zinc-300/40 dark:bg-zinc-800/90 text-zinc-900"
                  : "dark:text-zinc-300/95 hover:bg-zinc-300/30 dark:hover:bg-zinc-800/70 text-zinc-800/95"
              } text-zinc-800 border dark:border-zinc-800 border-zinc-200 cursor-pointer font-[450] transition-all ease-linear duration-150 dark:text-zinc-50 rounded-xl flex items-center justify-center px-3 py-2 text-[16px] tracking-[-0.012em]`}
            >
              Oturum aç
            </a>
          )}
        </div>
      </header>
    </>
  );
}
