"use client";
import React, { useContext, useEffect } from "react";
import Navbar from "../../../components/common/navbar";
import { AppContext } from "../context";
import toast from "react-hot-toast";

export default function layout({ children }: { children: React.ReactNode }) {
  const { state } = useContext(AppContext);
  useEffect(() => {
    if (!state.loading) {
      if (state.userData.permission !== "admin") {
        toast.error("Bu sayfaya erişmek için yönetici olmanız gerekmektedir");
        return;
      }
    }
  }, [state.loading]);
  return (
    <main className="!relative mt-[55px] md:mt-0 flex flex-row h-full w-full overflow-visible">
      <Navbar />
      {children}
    </main>
  );
}
