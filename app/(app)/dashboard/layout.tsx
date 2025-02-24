"use client";
import React, { useContext, useEffect } from "react";
import Navbar from "../../../components/common/navbar";
import { AppContext } from "../context";
import { CircularProgress } from "@mui/material";

export default function layout({ children }: { children: React.ReactNode }) {
  const { state } = useContext(AppContext);
  return !state.loading ? (
    <main className="!relative mt-[55px] md:mt-0 flex flex-row h-full w-full overflow-visible">
      <Navbar />
      {children}
    </main>
  ) : (
    <main className="!relative flex flex-row h-full min-h-[100vh] w-full justify-center items-center">
      <CircularProgress color="inherit" />
    </main>
  );
}
