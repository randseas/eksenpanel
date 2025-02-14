"use client";
import React from "react";
import Header from "@/components/common/header";
import { useRouter } from "next/navigation";
import Navbar from "../navbar";

export default function Settings() {
  const router = useRouter();
  return (
    <main>
      <div className="flex h-full min-h-[91.53vh] flex-row items-start w-full justify-start">
        {/* Sidebar */}
        <Navbar />
        <div className="flex flex-col min-h-[91.53vh] items-start px-3.5 py-3 justify-start max-w-[83%] w-full h-full">
          Settings
        </div>
      </div>
    </main>
  );
}
