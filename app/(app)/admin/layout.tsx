"use client";
import React, { useContext, useEffect } from "react";
import Navbar from "../../../components/common/navbar";
import { AppContext } from "../context";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import { Outlet, useNavigate } from "react-router";

export default function AdminLayout() {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.loading) {
      if (state.userData.permission !== "admin") {
        toast.error("Bu sayfaya erişmek için yönetici olmanız gerekmektedir");
        navigate("/dashboard");
        return;
      }
    }
  }, [state.loading]);

  return !state.loading ? (
    <main className="!relative mt-[55px] md:mt-0 flex flex-row h-full w-full overflow-visible">
      <Navbar />
      <Outlet />
    </main>
  ) : (
    <main className="!relative flex flex-col space-y-4 h-full min-h-[100vh] w-full justify-center items-center">
      <CircularProgress color="inherit" />
      <span>Admin paneli yükleniyor...</span>
    </main>
  );
}
