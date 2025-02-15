"use client";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/common/header";
import { CircularProgress } from "@mui/material";
import instance from "@/app/instance";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoginLoading, setGoogleLoginLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (typeof window.localStorage !== "undefined") {
      const token = window.localStorage.getItem("user-token");
      if (token) {
        router.prefetch("/dashboard");
        setTimeout(() => router.push("/dashboard"), 1);
      }
    }
  }, []);
  const handleLogin = useCallback(() => {
    setLoading(true);
    /*instance
      .post("login", {
        email: email,
        password: password,
      })
      .then((res: any) => {
        console.log(res.data);
        if (res.data.message === "login_success") {
          if (typeof window.localStorage !== "undefined") {
            setLoading(false);
            localStorage.setItem("user-token", res.data.token);
            router.prefetch("/dashboard");
            setTimeout(() => router.push("/dashboard"), 750);
          } else {
            setLoading(false);
            toast.error("Hatalı şifre");
          }
        } else if (res.data.message === "user_not_found") {
          setLoading(false);
          toast.error("Hesap bulunamadı");
        }
      })
      .catch((err: any) => {
        setLoading(false);
        console.log(err);
        toast.error("Sunucu hatası");
      });*/
    setLoading(false);
    localStorage.setItem("user-token", "aaaaaaaaaaaaaaaaaaaaaaaa");
    router.prefetch("/dashboard");
    setTimeout(() => router.push("/dashboard"), 750);
  }, []);
  return (
    <>
      <main className="flex-1 flex-col dark:bg-dark dark:text-light text-dark bg-light min-h-[70vh] h-full">
        <Header />
        <section className="flex px-4 w-full lg:px-[96px] flex-col pt-[50px] lg:pt-[60px] min-h-[90vh] items-center justify-center">
          <div className="flex flex-col text-center items-center justify-between space-y-2">
            <div className="text-start mb-1 items-start justify-center flex flex-col w-full">
              <h3 className="font-[550] tracking-[-0.015em] text-[26px] mb-0.5">
                Giriş yap
              </h3>
              <p className="max-w-[340px] tracking-[-0.01em] text-[15px]">
                Platformumuza e-posta adresinizle giriş yapın.
              </p>
            </div>
            <div className="w-full lg:min-w-[350px]">
              <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
                <label
                  htmlFor="email"
                  className="text-md font-[450] dark:text-zinc-200"
                >
                  E-posta adresi
                </label>
                <input
                  id="email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.currentTarget.value)
                  }
                  className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-3 dark:bg-dark/30 border dark:border-dark-border"
                  placeholder="holder@example.com"
                />
              </div>
            </div>
            <div className="w-full lg:max-w-[350px]">
              <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
                <label
                  htmlFor="password"
                  className="text-md font-[450] dark:text-zinc-200"
                >
                  Şifre
                </label>
                <input
                  id="password"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.currentTarget.value)
                  }
                  className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-3 dark:bg-dark/30 border dark:border-dark-border"
                  placeholder="Şifre girin"
                />
              </div>
              <button
                type="button"
                className={`${
                  password.length > 0 ? "opacity-100" : "opacity-0"
                } absolute outline-none right-4 top-[50%] transform -translate-y-1/2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-all ease-linear duration-100`}
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                <div className="relative w-5 h-5 outline-none transition-all ease-linear duration-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`absolute inset-0 ${
                      showPassword ? "opacity-100" : "opacity-0"
                    } transition-all ease-linear duration-75`}
                  >
                    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                    <path d="m2 2 20 20" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`absolute inset-0 ${
                      showPassword ? "opacity-0" : "opacity-100"
                    } transition-all ease-linear duration-75`}
                  >
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
              </button>
            </div>
            <div className="block w-full space-y-2.5 pt-0.5">
              <button
                onClick={handleLogin}
                disabled={loading || googleLoginLoading}
                className={`block relative flex-1 text-light dark:text-light disabled:opacity-90 cursor-pointer disabled:cursor-default transition-all disabled:bg-blue-500 font-[450] text-[15.5px] ease-linear duration-100 py-[10px] text-center items-center justify-center w-full bg-blue-500 rounded-lg disabled:hover:bg-blue-500 hover:bg-blue-500/90`}
              >
                {loading ? (
                  <div className="flex flex-row items-center space-x-[6.25px] justify-center">
                    <CircularProgress
                      size={20}
                      thickness={5}
                      color="inherit"
                      className="text-light"
                    />
                    <span>Giriş yapılıyor...</span>
                  </div>
                ) : (
                  <>
                    <span>Giriş yap</span>
                  </>
                )}
              </button>
              <div className="text-start mt-2 items-start justify-start text-[15px] font-normal">
                Hesabınız yok mu?&nbsp;
                <a
                  onClick={() => router.push("/register")}
                  className="font-medium text-blue-500 cursor-pointer hover:underline"
                >
                  Kayıt ol
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
