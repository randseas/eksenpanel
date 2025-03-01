"use client";
import React, { useEffect } from "react";
import Loader from "../../../components/common/loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function LogOut() {
  const navigate = useNavigate();
  useEffect(() => {
    toast.loading("Çıkış yapılıyor", { duration: 1300 });
    setTimeout(() => {
      window.localStorage.removeItem("user-token");
      toast.success("Çıkış yapıldı");
      navigate("/");
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
