"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/loader";
import toast from "react-hot-toast";
import instance from "@/app/instance";
import getLocalKey from "@/helpers/localStorage";

export default function LogOut() {
  const router = useRouter();
  useEffect(() => {
    toast.loading("Logging out", { duration: 1300 });
    const localSession = getLocalKey("session-token");
    setTimeout(() => {
      instance
        .post("logout", { session: localSession })
        .then((res: any) => {
          window.localStorage.removeItem("session-token");
          window.localStorage.setItem("activeWallet", "0");
          toast.success("Logged out");
          router.replace("/");
        })
        .catch((err: any) => {
          toast.error("Logout error");
          router.refresh();
        });
    }, 1250);
  }, []);
  return (
    <>
      <main className="flex flex-row h-[80vh] items-center justify-center text-center w-full !overflow-hidden">
        <Loader />
      </main>
    </>
  );
}
