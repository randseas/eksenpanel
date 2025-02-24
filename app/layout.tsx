"use client";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // NProgress stillerini eklemeyi unutma
import "./globals.min.css";

NProgress.configure({
  showSpinner: false,
  speed: 250,
  minimum: 0.1,
  trickleSpeed: 750,
});

const Font = Inter({ subsets: ["latin"], display: "auto" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [mount, setMount] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );
  useEffect(() => {
    const mediaQuery =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : null;
    setTheme(mediaQuery?.matches ? "dark" : "light");
    if (typeof window !== "undefined") {
      setMount(true);
    } else {
      setMount(false);
    }
  }, []);
  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => {
      NProgress.done();
    }, 600);
    return () => clearTimeout(timer);
  }, [pathname]);
  const styles = {
    toast: {
      backgroundColor: "white",
      color: "black",
      border: "1px solid #e5e7eb",
      borderRadius: "9999px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    },
    darkToast: {
      backgroundColor: "#090909",
      color: "#efefef",
      borderColor: "#171718",
    },
  };
  const isDarkMode = theme === "dark" ? true : false;
  return (
    <html className="!relative !p-0 !m-0 dark:bg-dark bg-light text-black dark:text-white">
      <head>
        <title>Tumblr Yönlendirme</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Tumblr Yönlendirme" />
        <meta name="keywords" content="tumblr, redirecting, redirect" />
        <meta property="og:title" content="Tumblr Yönlendirme" />
        <meta property="og:description" content="Tumblr Yönlendirme" />
        <meta property="og:image" content="" />
        <meta property="og:url" content="https://tumblryonlendirme.xyz" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tumblr Yönlendirme" />
        <meta property="og:locale" content="en_US" />
        <link rel="icon" type="image/png" href="/icons/favicon.ico" />
      </head>
      <body
        className={`${Font.className} !relative dark:bg-dark bg-light text-black dark:text-white`}
      >
        {mount && (
          <>
            <Toaster
              containerClassName="!z-[999999]"
              toastOptions={{
                style: {
                  ...styles.toast,
                  ...(isDarkMode ? styles.darkToast : {}),
                },
              }}
            />
            {children}
          </>
        )}
      </body>
    </html>
  );
}
