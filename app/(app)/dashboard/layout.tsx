import React, { useContext } from "react";
import { Outlet } from "react-router";
import Navbar from "../../../components/common/navbar";
import { AppContext } from "../context";
import { CircularProgress } from "@mui/material";

export default function DashboardLayout() {
  const { state } = useContext(AppContext);
  return !state.loading ? (
    <main className="!relative mt-[55px] md:mt-0 flex flex-row h-full w-full overflow-visible">
      <Navbar />
      <Outlet />
    </main>
  ) : (
    <main className="!relative flex flex-col space-y-4 h-full min-h-[100vh] w-full justify-center items-center">
      <CircularProgress color="inherit" />
      <span>Yükleniyor...</span>
    </main>
  );
}
