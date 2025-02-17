import React from "react";
import Navbar from "./navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="!relative mt-[55px] md:mt-0 flex flex-row h-full w-full overflow-visible">
      <Navbar />
      {children}
    </main>
  );
}
