"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/common/header";

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <Header />
      <div className="mx-2.5 text-lg items-center text-center flex-col justify-center flex min-h-[85vh]">
        <h1 className="text-3xl font-medium">404</h1>
        <a className="font-medium">Sayfa bulunamadı</a>
        <button
          onClick={() => router.back()}
          className="bg-blue-500 mt-2 rounded-[11px] hover:bg-blue-600 transition-all ease-linear duration-100 py-2 text-base px-4"
        >
          {"<-"}&nbsp;Geri
        </button>
      </div>
    </>
  );
}
