"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/loader";
import toast from "react-hot-toast";

export default function LogOut() {
  const router = useRouter();
  useEffect(() => {
    toast.loading("Çıkış yapılıyor", { duration: 1300 });
    setTimeout(() => {
      window.localStorage.removeItem("user-token");
      toast.success("Çıkış yapıldı");
      router.replace("/");
    }, 1250);
  }, []);
  return (
    <>
      <main className="flex flex-row h-[100vh] items-center justify-center text-center w-full !overflow-hidden">
        <Loader />
      </main>
    </>
  );
}
