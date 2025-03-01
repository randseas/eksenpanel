"use client";
import React from "react";
import Header from "../components/common/header";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="mx-2.5 text-lg items-center text-center flex-col justify-center flex min-h-[100vh]">
        <h1 className="text-3xl font-medium">404</h1>
        <a className="font-medium">Sayfa bulunamadı</a>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 mt-2 rounded-[11px] hover:bg-blue-600 transition-all ease-linear duration-100 py-[9px] text-base px-3"
        >
          {"<-"}&nbsp;Ana sayfa
        </button>
      </div>
    </>
  );
}
