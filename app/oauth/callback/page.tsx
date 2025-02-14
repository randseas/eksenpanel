"use client";
import instance from "@/app/instance";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function AuthCallback() {
  const router = useRouter();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeFromUrl = params.get("token");
    const typeFromUrl = params.get("type");
    instance
      .post("google_callback", { type: typeFromUrl, code: codeFromUrl })
      .then((res: any) => {
        if (res.data.message === "success_callback") {
          //process successful
          window.localStorage.setItem("session", res.data.session);
          router.prefetch("/app");
          setTimeout(() => router.push("/app"), 250);
        } else if (res.data.message === "error_callback") {
          toast.error("Sunucu hatası");
          router.push(`/auth/${typeFromUrl}`);
        } else {
          toast.error("Bilinmeyen hata");
          router.push(`/auth/${typeFromUrl}`);
        }
      })
      .catch((err: any) => {
        console.log(err);
        toast.error("Sunucu hatası");
        router.push(`/auth/${typeFromUrl}`);
      });
  }, []);
  return (
    <>
      <main>
        <div className="h-full flex flex-row min-h-[100vh] items-center justify-center text-center w-full !overflow-hidden">
          <CircularProgress
            sx={{ borderRadius: 999 }}
            color="inherit"
            thickness={4}
            size={40}
          />
        </div>
      </main>
    </>
  );
}
