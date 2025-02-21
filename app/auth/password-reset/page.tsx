"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import instance from "@/app/instance";
import toast from "react-hot-toast";
import config from "@/config";

export default function PasswordReset() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  useEffect(() => {
    if (typeof window.localStorage !== "undefined") {
      const token = window.localStorage.getItem("user-token");
      if (token) {
        router.prefetch("/dashboard");
        setTimeout(() => router.push("/dashboard"), 1);
      }
    }
  }, []);
  function handlePasswordReset(e: any) {
    e.preventDefault();
    instance
      .post("password-reset", {
        email: email,
      })
      .then((res: any) => {
        console.log(res.data);
        if (res.data.status === "ok") {
          toast.success("Şifre sıfırlama linki e-posta adresinize gönderildi.");
          router.push("/auth/login");
        } else if (res.data.message === "user_not_found") {
          toast.error("Hesap bulunamadı");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err: any) => {
        console.log(err);
        toast.error("Sunucu hatası");
      });
  }
  return (
    <main className="relative flex flex-col items-center justify-center w-full h-full min-h-[99vh]">
      <div className="logo">EKSEN MEDYA TUMBLR PANELİ v1.1</div>
      <div id="passwordResetForm" className="form-container">
        <h2>Şifrenizi Sıfırlayın</h2>
        <form onSubmit={handlePasswordReset}>
          <div className="input-group">
            <label htmlFor="resetEmail">E-posta</label>
            <input
              type="email"
              id="resetEmail"
              name="resetEmail"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              placeholder="E-posta adresinizi girin"
              required
            />
          </div>
          <div className="input-group">
            <button type="submit" className="btn-register">
              Şifreyi Sıfırla
            </button>
          </div>
          <button
            type="button"
            className="mini-back-btn"
            onClick={() => router.push("/auth/login")}
          >
            Geri
          </button>
        </form>
      </div>
      <a
        href={config.WHATSAPP_LINK}
        target="_blank"
        className="anchor whatsapp-btn hover:scale-[1.025] transition-all ease-linear duration-100 active:scale-[1.01]"
      >
        <svg
          width={32}
          height={32}
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </a>
      <a
        href={config.TELEGRAM_LINK}
        target="_blank"
        className="anchor telegram-btn hover:scale-[1.025] transition-all ease-linear duration-100 active:scale-[1.01]"
      >
        <svg
          width={32}
          height={32}
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 512"
        >
          <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
        </svg>
      </a>
    </main>
  );
}
