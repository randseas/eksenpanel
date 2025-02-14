import React from "react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  return (
    <>
      <footer className="z-50"></footer>
    </>
  );
}
