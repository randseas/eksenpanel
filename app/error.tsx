"use client";
import React, { useEffect } from "react";
import Header from "@/components/common/header";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <>
      <Header />
      <div className="mx-2.5 text-lg items-center text-center flex-col justify-center flex min-h-[85vh]">
        <h1 className="text-3xl font-medium">500</h1>
        <a className="font-medium">
          Uygulama hatası, bir istemci
          <br /> hata oluştu.
        </a>
        <button
          onClick={() => reset()}
          className="bg-blue-500 mt-2 rounded-[11px] hover:bg-blue-600 transition-all ease-linear duration-100 py-2 text-base px-4"
        >
          Yeniden dene
        </button>
      </div>
    </>
  );
}
