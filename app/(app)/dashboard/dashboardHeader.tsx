"use client";
import { Bell } from "lucide-react";
import React from "react";

export default function DashboardHeader({ page }: { page: string }) {
  return (
    <div className="hidden md:flex sticky top-0 left-0 pb-0.5 right-0 dark:bg-dark bg-light backdrop-blur-lg flex-row items-center w-full justify-between">
      <h1 className="text-lg font-[450] pb-1 text-zinc-200">{page}</h1>
      <div className="dark:text-zinc-100 px-3 py-2 hover:bg-zinc-900/50 rounded-2xl hover:cursor-pointer transition-all ease-linear duration-100">
        <Bell width={22} height={22} />
      </div>
    </div>
  );
}
