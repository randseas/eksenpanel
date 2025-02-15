"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "../navbar";

export default function Links() {
  const router = useRouter();
  return (
    <main>
      <div className="flex h-full min-h-[91.53vh] flex-row items-start w-full justify-start">
        <Navbar />
        <div className="flex md:ml-[17%] flex-col min-h-[91.53vh] items-start px-3.5 py-3 justify-start w-full h-full">
          Redirects
        </div>
      </div>
    </main>
  );
}
