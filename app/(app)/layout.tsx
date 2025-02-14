"use client";
import React from "react";
import ProvideContext from "./context";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProvideContext>{children}</ProvideContext>;
}
