"use client";
import React from "react";
import ProvideContext from "./context";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <ProvideContext>
      <Outlet />
    </ProvideContext>
  );
}
