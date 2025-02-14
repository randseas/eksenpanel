"use client";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/common/header";
import { CircularProgress } from "@mui/material";
import instance from "@/app/instance";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { t } from "@/i18n/i18n";
import getLocalKey from "@/helpers/localStorage";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

declare global {
  interface Window {
    initGeetest: any;
  }
}

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoginLoading, setGoogleLoginLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [geeTest, setGeeTest] = useState<any>();
  const [geeTestVerified, setGeeTestVerified] = useState<boolean>(false);
  const emailRef = useRef<string>("");
  const passwordRef = useRef<string>("");
  const otpCodeRef = useRef<string>("");
  const [modal, setModal] = useState({ open: false });
  const [otpCode, setOTPCode] = useState<string>("");
  const [otpCodeError, setOTPCodeError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window.localStorage !== "undefined") {
      const token = window.localStorage.getItem("user-token");
      if (token) {
        router.prefetch("/app");
        setTimeout(() => router.push("/app"), 1);
      }
    }
  }, []);
  const handleLogin = useCallback(() => {
    setLoading(true);
    console.log("otpcode", otpCodeRef.current);
    instance
      .post("login", {
        email: emailRef.current,
        password: passwordRef.current,
        ...(otpCodeRef.current.length > 0 && { otp: otpCodeRef.current }),
      })
      .then((res: any) => {
        console.log(res.data);
        if (res.data.message === "login_success") {
          if (typeof window.localStorage !== "undefined") {
            setLoading(false);
            localStorage.setItem("session-token", res.data.session);
            router.prefetch("/");
            setTimeout(() => router.push("/"), 750);
          } else {
            setLoading(false);
            toast.error(t("auth.messages.invalidCredentials"));
          }
        } else if (res.data.message === "email_otp_sent") {
          setLoading(false);
          toggleModal();
          setTimeout(() => {
            const otpcodeinput = document.getElementById("otpcode-input");
            otpcodeinput?.focus();
          }, 250);
        } else if (res.data.message === "invalid_otp") {
          setLoading(false);
          const otpcodeinput = document.getElementById("otpcode-input");
          otpcodeinput?.focus();
          setOTPCodeError("Invalid code");
        } else if (res.data.message === "otp_time_invalid") {
          setLoading(false);
          setOTPCodeError("Code time expired");
          toggleModal();
          setOTPCode("");
          setGeeTestVerified(false);
          otpCodeRef.current = "";
        } else if (res.data.message === "user_not_found") {
          setLoading(false);
          toast.error(t("auth.messages.accountNotExist"));
        } else {
          setLoading(false);
          toast.error(t("auth.messages.invalidCredentials"));
        }
      })
      .catch((err: any) => {
        setLoading(false);
        console.log(err);
        toast.error(t("auth.messages.internalServerError"));
      });
  }, []);
  useEffect(() => {
    otpCodeRef.current = otpCode;
  }, [otpCode]);
  const googleLoginHandler = useGoogleLogin({
    redirect_uri:
      process.env.NODE_ENV === "development"
        ? "http://localhost/auth/callback"
        : "https://waultdex.vercel.app/auth/callback",
    onSuccess: (res: any) => {
      setTimeout(() => setGoogleLoginLoading(false), 1);
      router.push(`/auth/callback?token=${res.access_token}&type=login`);
    },
    onError: (error: any) => {
      setTimeout(() => setGoogleLoginLoading(false), 1);
      toast.error(t("auth.messages.errorOccured"));
    },
    onNonOAuthError: () => {
      setTimeout(() => setGoogleLoginLoading(false), 1);
    },
  });
  function handleGoogleLogin() {
    setGoogleLoginLoading(true);
    googleLoginHandler();
  }
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      process.env.NODE_ENV === "development"
        ? "http://localhost/static/geetest/gt.js"
        : "https://waultdex.vercel.app/static/geetest/gt.js";
    script.async = true;
    document.body.appendChild(script);
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      process.env.NODE_ENV === "development"
        ? "http://localhost:9443/api/v1/geetest"
        : "https://waultdex-server.onrender.com/api/v1/geetest",
      true
    );
    xhr.responseType = "json";
    xhr.onload = function () {
      if (xhr.status === 200) {
        const data = xhr.response;
        window.initGeetest(
          {
            gt: data.gt,
            challenge: data.challenge,
            new_captcha: data.new_captcha,
            offline: false,
            product: "bind",
            lang: getLocalKey("lang") === "tr" ? "tr" : "en",
            width: "100%",
          },
          function (captchaObj: any) {
            captchaObj
              .onReady(function () {
                setGeeTest(captchaObj);
              })
              .onSuccess(function () {
                setGeeTestVerified(true);
                handleLogin();
              });
          }
        );
      }
    };
    xhr.send();
  }, []);
  function toggleModal() {
    if (modal.open) {
      setOTPCode("");
      toast.error("Login process interrupted");
    }
    setModal((prevModal) => ({ ...prevModal, open: !prevModal.open }));
  }
  function geetestLoginHandler() {
    emailRef.current = email;
    passwordRef.current = password;
    if (geeTest) {
      if (email.length <= 0 && password.length <= 8 && password.length >= 32) {
        const emailinput = document.getElementById("email-input");
        emailinput?.focus();
        setPasswordError("Password has to be between 8-32 characters");
        setEmailError("Enter a valid email");
      } else {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email.length === 0 || !regex.test(email)) {
          const input = document.getElementById("email-input");
          input?.focus();
          setEmailError("Enter a valid email");
        } else if (password.length < 8 || password.length > 32) {
          const input = document.getElementById("password-input");
          input?.focus();
          setPasswordError("Password has to be between 8-32 characters");
        } else {
          setShowPassword(false);
          geeTest?.verify();
        }
      }
    }
  }
  return (
    <>
      <main className="flex-1 flex-col dark:bg-dark dark:text-light text-dark bg-light min-h-[70vh] h-full">
        <Header />
        <Transition appear show={modal.open} as={React.Fragment}>
          <Dialog
            as="div"
            className="overflow-hidden z-[99999]"
            onClose={() => null}
          >
            <TransitionChild
              as={React.Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 z-[9999] bg-black/25" />
            </TransitionChild>
            <div className="fixed inset-0 z-[9999] overflow-hidden">
              <div className="flex h-[100vh] !overflow-hidden w-[100vw] items-center justify-center text-center">
                <TransitionChild
                  as={React.Fragment}
                  enter="ease-out duration-200"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-150"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <DialogPanel className="w-[380px] transition-all h-auto transform overflow-hidden rounded-[28px] bg-light dark:bg-dark border border-light-border/80 dark:border-dark-border/80 p-4 text-start align-middle shadow-lg">
                    <div className="grid grid-cols-3 grid-rows-1 w-full">
                      <div className="flex flex-row items-center justify-start"></div>
                      <div className="font-[450] w-full flex flex-row items-center text-center justify-center text-base tracking-[-0.015em]">
                        OTP Verify
                      </div>
                      <div className="flex flex-row items-center justify-end">
                        <div
                          className="cursor-pointer flex items-center justify-center text-center flex-row rounded-full hover:bg-zinc-200/60 dark:hover:bg-zinc-900/70 transition-all ease-linear duration-100 w-[30px] h-[30px]"
                          onClick={toggleModal}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-4 items-center justify-center text-center w-full">
                      <div className="mb-3 text-center flex h-[64px] w-[64px] items-center justify-center rounded-full bg-zinc-200/40 dark:bg-zinc-900/50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-zinc-700 dark:text-zinc-300"
                        >
                          <rect
                            width="20"
                            height="16"
                            x="2"
                            y="4"
                            rx="2"
                          ></rect>
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </svg>
                      </div>
                      <span className="text-md font-[450] tracking-[-0.0025em]">
                        Please enter the code sent to your registered email
                        address.
                      </span>
                    </div>
                    <div className="transition-height mt-4 duration-[400] ease-in-out">
                      <div
                        className={`${
                          otpCodeError
                            ? "focus:hover:border-red-500 focus:hover:ring-red-500 focus-within:border-red-500 focus:border-red-500 focus:ring-red-500 hover:focus-within:ring-red-500 focus-within:ring-red-500 dark:border-red-600 border-red-500"
                            : "focus:hover:border-blue-500 focus:hover:ring-blue-500 focus-within:border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:focus-within:ring-blue-500 focus-within:ring-blue-500 dark:border-dark-border border-light-border"
                        } mt-2 relative w-full bg-transparent border rounded-[9px] px-3 py-[8px] transition-all duration-150 ease-linear outline-none peer-hover:ring-[1px] focus-within:ring-[1px] shadow-sm`}
                      >
                        <input
                          className="peer pt-[15px] w-full bg-transparent dark:text-light text-dark text-[15px] outline-none peer-valid:focus peer-focus:focus"
                          id="otpcode-input"
                          type="text"
                          value={otpCode}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setOTPCodeError(null);
                            setOTPCode(e.currentTarget.value);
                          }}
                          autoComplete="false"
                          autoFocus={true}
                          required
                        />
                        <label
                          htmlFor="otpcode-input"
                          className="absolute pointer-events-none cursor-text ease-in-out duration-150 bg-transparent px-1 left-2.5 top-[15px] text-zinc-700 dark:text-zinc-300 text-[14.75px] transition-all transform origin-left peer-disabled:top-[4.25px] peer-focus:top-[4.25px] font-[450] peer-disabled:left-[8.25px] peer-focus:left-[8.25px] peer-disabled:text-[13px] peer-focus:text-[13px] peer-focus:dark:text-light peer-disabled:scale-90 peer-focus:scale-90 peer-valid:top-[4.25px] peer-valid:left-[8.25px] peer-valid:text-[13px] peer-valid:scale-90"
                        >
                          Enter code
                        </label>
                      </div>
                      {otpCodeError && (
                        <div className="text-start w-full mt-1 flex flex-row items-center justify-start">
                          <span className="text-red-500 text-xs font-[450]">
                            {otpCodeError}
                          </span>
                        </div>
                      )}
                      <button
                        onClick={() => handleLogin()}
                        className="block mt-3 relative flex-1 text-light dark:text-light disabled:opacity-90 cursor-pointer disabled:cursor-default transition-all disabled:bg-blue-500 font-[450] text-[15.5px] ease-linear duration-100 py-[10px] text-center items-center justify-center w-full bg-blue-500 rounded-lg disabled:hover:bg-blue-500 hover:bg-blue-500/90"
                      >
                        Confirm
                      </button>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
        <section className="flex px-4 w-full lg:px-[96px] flex-col pt-[60px] min-h-[92.2vh] items-center justify-center">
          <div className="flex flex-col text-center items-center justify-between space-y-2">
            <div className="text-start mb-1 items-start justify-center flex flex-col w-full">
              <h3 className="font-[550] tracking-[-0.015em] text-[26px] mb-0.5">
                {t("auth.login")}
              </h3>
              <p className="max-w-[340px] tracking-[-0.01em] text-[15px]">
                {t("auth.loginDesc")}
              </p>
            </div>
            <div className="w-full min-w-[320px] lg:min-w-[350px]">
              <div
                className={`${
                  emailError
                    ? "focus:hover:border-red-500 focus:hover:ring-red-500 focus-within:border-red-500 focus:border-red-500 focus:ring-red-500 hover:focus-within:ring-red-500 focus-within:ring-red-500 dark:border-red-600 border-red-500"
                    : "focus:hover:border-blue-500 focus:hover:ring-blue-500 focus-within:border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:focus-within:ring-blue-500 focus-within:ring-blue-500 dark:border-dark-border border-light-border"
                } relative bg-transparent border rounded-[9px] px-3 py-[8px] transition-all duration-150 ease-linear outline-none peer-hover:ring-[1px] focus-within:ring-[1px] shadow-sm`}
              >
                <input
                  className="peer pt-[15px] w-full bg-transparent dark:text-light text-dark text-[15px] outline-none peer-valid:focus peer-focus:focus"
                  id="email-input"
                  type="text"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmailError(null);
                    setEmail(e.target.value);
                  }}
                  autoComplete="false"
                  autoFocus={true}
                  disabled={loading}
                  required
                />
                <label
                  htmlFor="email-input"
                  className="absolute pointer-events-none cursor-text ease-in-out duration-150 bg-transparent px-1 left-2.5 top-[15px] text-zinc-700 dark:text-zinc-300 text-[14.75px] transition-all transform origin-left peer-disabled:top-[4.25px] peer-focus:top-[4.25px] font-[450] peer-disabled:left-[8.25px] peer-focus:left-[8.25px] peer-disabled:text-[13px] peer-focus:text-[13px] peer-focus:dark:text-light peer-disabled:scale-90 peer-focus:scale-90 peer-valid:top-[4.25px] peer-valid:left-[8.25px] peer-valid:text-[13px] peer-valid:scale-90"
                >
                  {t("auth.emailOrUsername")}
                </label>
              </div>
              {emailError && (
                <div className="text-start w-full mt-1 flex flex-row items-center justify-start">
                  <span className="text-red-500 text-xs font-[450]">
                    {emailError}
                  </span>
                </div>
              )}
            </div>
            <div className="w-full max-w-[300px] lg:max-w-[350px]">
              <div
                className={`${
                  passwordError
                    ? "focus:hover:border-red-500 focus:hover:ring-red-500 focus-within:border-red-500 focus:border-red-500 focus:ring-red-500 hover:focus-within:ring-red-500 focus-within:ring-red-500 dark:border-red-600 border-red-500"
                    : "focus:hover:border-blue-500 focus:hover:ring-blue-500 focus-within:border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:focus-within:ring-blue-500 focus-within:ring-blue-500 dark:border-dark-border border-light-border"
                } relative bg-transparent border rounded-[9px] px-3 py-[8px] transition-all duration-150 ease-linear outline-none peer-hover:ring-[1px] focus-within:ring-[1px] shadow-sm`}
              >
                <input
                  className="peer pt-[15px] w-full bg-transparent dark:text-light text-dark text-[15px] outline-none peer-valid:focus peer-focus:focus"
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="false"
                  disabled={loading}
                  required
                />
                <label
                  htmlFor="password-input"
                  className="absolute pointer-events-none cursor-text ease-in-out duration-150 bg-transparent px-1 left-2.5 top-[15px] text-zinc-700 dark:text-zinc-300 text-[14.75px] transition-all transform origin-left peer-disabled:top-[4.25px] peer-focus:top-[4.25px] font-[450] peer-disabled:left-[8.25px] peer-focus:left-[8.25px] peer-disabled:text-[13px] peer-focus:text-[13px] peer-focus:dark:text-light peer-disabled:scale-90 peer-focus:scale-90 peer-valid:top-[4.25px] peer-valid:left-[8.25px] peer-valid:text-[13px] peer-valid:scale-90"
                >
                  {t("auth.password")}
                </label>
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
              {passwordError && (
                <div className="text-start w-full mt-1 flex flex-row items-center justify-start">
                  <span className="text-red-500 text-xs font-[450]">
                    {passwordError}
                  </span>
                </div>
              )}
            </div>
            <div className="block w-full space-y-2.5 pt-0.5">
              <button
                onClick={geetestLoginHandler}
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
                    <span>{t("auth.loggingIn")}</span>
                  </div>
                ) : (
                  <>
                    <span>{t("auth.login")}</span>
                  </>
                )}
              </button>
              <div className="relative text-center py-1.5">
                <hr className="border-t border-zinc-300/60 dark:border-zinc-700/60" />
                <span className="absolute top-[-4px] text-[13px] dark:text-zinc-200 text-zinc-700 left-1/2 dark:bg-dark bg-white transform -translate-x-1/2 bg-transparent px-2">
                  {t("auth.or")}
                </span>
              </div>
              <div className="flex flex-row items-center space-x-1.5">
                <button
                  onClick={handleGoogleLogin}
                  disabled={googleLoginLoading}
                  className={`block relative text-light dark:text-light flex-1 disabled:opacity-90 cursor-pointer disabled:cursor-default transition-all disabled:bg-blue-500 font-[450] text-[15.5px] ease-linear duration-100 py-[10px] text-center items-center justify-center w-full bg-blue-500 rounded-lg disabled:hover:bg-blue-500 hover:bg-blue-500/90`}
                >
                  {googleLoginLoading ? (
                    <div className="flex flex-row items-center space-x-[6.5px] justify-center">
                      <CircularProgress
                        size={20}
                        thickness={5}
                        color="inherit"
                        className="text-light"
                      />
                      <span>{t("auth.processing")}</span>
                    </div>
                  ) : (
                    <div className="flex flex-row items-center space-x-[6.5px] justify-center">
                      <svg
                        width="16px"
                        height="16px"
                        viewBox="-0.5 0 48 48"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <g transform="translate(-401.000000, -860.000000)">
                            <g transform="translate(401.000000, 860.000000)">
                              <path
                                d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                fill="#ffffff"
                              ></path>
                              <path
                                d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                fill="#ffffff"
                              ></path>
                              <path
                                d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                fill="#ffffff"
                              ></path>
                              <path
                                d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                fill="#ffffff"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <span>Google</span>
                    </div>
                  )}
                </button>
                <button
                  onClick={handleGoogleLogin}
                  disabled={googleLoginLoading}
                  className={`block relative text-light dark:text-light flex-1 disabled:opacity-90 cursor-pointer disabled:cursor-default transition-all disabled:bg-blue-500 font-[450] text-[15.5px] ease-linear duration-100 py-[10px] text-center items-center justify-center w-full bg-blue-500 rounded-lg disabled:hover:bg-blue-500 hover:bg-blue-500/90`}
                >
                  {googleLoginLoading ? (
                    <div className="flex flex-row items-center space-x-[6.5px] justify-center">
                      <CircularProgress
                        size={20}
                        thickness={5}
                        color="inherit"
                        className="text-light"
                      />
                      <span>{t("auth.processing")}</span>
                    </div>
                  ) : (
                    <div className="flex flex-row items-center space-x-[6.5px] justify-center">
                      <svg
                        width="16px"
                        height="16px"
                        viewBox="-0.5 0 48 48"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <g transform="translate(-401.000000, -860.000000)">
                            <g transform="translate(401.000000, 860.000000)">
                              <path
                                d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                fill="#ffffff"
                              ></path>
                              <path
                                d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                fill="#ffffff"
                              ></path>
                              <path
                                d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                fill="#ffffff"
                              ></path>
                              <path
                                d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                fill="#ffffff"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <span>Discord</span>
                    </div>
                  )}
                </button>
              </div>
              <div className="text-start mt-2 items-start justify-start text-[15px] font-normal">
                {t("auth.dontHaveAccount")}&nbsp;
                <a
                  onClick={() => router.push("/oauth/register")}
                  className="font-medium text-blue-500 cursor-pointer hover:underline"
                >
                  {t("auth.register")}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
