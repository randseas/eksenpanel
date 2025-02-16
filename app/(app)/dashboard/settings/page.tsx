"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "../navbar";
import DashboardHeader from "../dashboardHeader";

export default function Settings() {
  const router = useRouter();
  return (
    <main className="relative top-[55px] md:top-0 flex flex-row h-full w-full overflow-x-hidden">
      <Navbar />
      <div className="flex space-y-2.5 flex-col min-h-[100vh] items-start px-5 py-4 justify-start w-full h-full">
        <div className="flex flex-row items-center justify-between w-full">
          <DashboardHeader page="Ayarlar" />
        </div>
      </div>
    </main>
  );
}
