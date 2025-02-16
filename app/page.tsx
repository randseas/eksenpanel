"use client";
import React from "react";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="flex mt-[60px] flex-col items-start justify-start px-3.5 py-3">Ana sayfa</div>
      <Footer />
    </main>
  );
}
