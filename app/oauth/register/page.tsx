"use client";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import Header from "@/components/common/header";
import instance from "@/app/instance";
import toast from "react-hot-toast";
import { t } from "@/i18n/i18n";
import getLocalKey from "@/helpers/localStorage";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [googleRegisterLoading, setGoogleRegisterLoading] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordConfirmError, setPasswordConfirmError] = useState<
    string | null
  >(null);
  const [geeTest, setGeeTest] = useState<any>();

  const emailRef = useRef<string>("");
  const passwordRef = useRef<string>("");
  const passwordConfirmRef = useRef<string>("");

  useEffect(() => {
    if (typeof window.localStorage !== "undefined") {
      const token = window.localStorage.getItem("session");
      if (token) {
        router.prefetch("/app");
        setTimeout(() => router.push("/app"), 1);
      }
    }
  }, []);
  const handleRegister = useCallback(() => {
    setLoading(true);
    instance
      .post("register", {
        email: emailRef.current,
        password: passwordRef.current,
        passwordConfirm: passwordConfirmRef.current,
      })
      .then((res: any) => {
        console.log(res.data);
        if (res.data.message === "register_success") {
          if (typeof window.localStorage !== "undefined") {
            setLoading(false);
            toast.success(t("auth.messages.registerSuccess"));
            router.prefetch("/oauth/login");
            setTimeout(() => router.push("/oauth/login"), 750);
          } else {
            setLoading(false);
            toast.error(t("auth.messages.invalidCredentials"));
          }
        } else if (res.data.message === "user_already_exists") {
          setLoading(false);
          toast.error(t("auth.messages.userAlreadyExists"));
        } else {
          setLoading(false);
          toast.error(t("auth.messages.internalServerError"));
        }
      })
      .catch((err: any) => {
        setLoading(false);
        console.log(err);
        toast.error(t("auth.messages.internalServerError"));
      });
  }, []);
  const googleRegisterHandler = useGoogleLogin({
    redirect_uri:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/auth/callback"
        : "https://waultdex.vercel.app/auth/callback",
    onSuccess: (res: any) => {
      setTimeout(() => setGoogleRegisterLoading(false), 1);
      router.push(`/auth/callback?token=${res.access_token}&type=register`);
    },
    onError: (error: any) => {
      setTimeout(() => setGoogleRegisterLoading(false), 1);
      toast.error("Bir hata oluştu");
    },
    onNonOAuthError: () => {
      setTimeout(() => setGoogleRegisterLoading(false), 1);
    },
  });
  function handleGoogleRegister() {
    setGoogleRegisterLoading(true);
    googleRegisterHandler();
  }
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/static/geetest/gt.js";
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
        if (typeof window.initGeetest !== "undefined") {
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
                  handleRegister();
                })
                .onError(function () {
                  toast.error("Captcha unsuccessful");
                });
            }
          );
        }
      }
    };
    xhr.send();
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  function geetestRegisterHandler() {
    emailRef.current = email;
    passwordRef.current = password;
    passwordConfirmRef.current = passwordConfirm;
    if (geeTest) {
      if (email.length <= 0 && password.length <= 8 && password.length >= 32) {
        const emailinput = document.getElementById("email-input");
        emailinput?.focus();
        setPasswordError("Password has to be between 8-32 characters");
        setEmailError("Enter a valid email");
      } else {
        if (email.length > 0) {
          if (password.length >= 8 && password.length <= 32) {
            if (passwordConfirm.length >= 8 && passwordConfirm.length <= 32) {
              if (password === passwordConfirm) {
                setShowPassword(false);
                geeTest?.verify();
              } else {
                const input = document.getElementById("passwordConfirm-input");
                input?.focus();
                setPasswordConfirmError("Passwords didnt match");
              }
            } else {
              const input = document.getElementById("passwordConfirm-input");
              input?.focus();
              setPasswordConfirmError(
                "Password has to be between 8-32 characters"
              );
            }
          } else {
            const input = document.getElementById("password-input");
            input?.focus();
            setPasswordError("Password has to be between 8-32 characters");
          }
        } else {
          const input = document.getElementById("email-input");
          input?.focus();
          setEmailError("Enter a valid email");
        }
      }
    }
  }
  return (
    <>
      <main className="flex-1 flex-col dark:bg-dark dark:text-light text-dark bg-light min-h-screen h-full">
        <Header />
        <section className="flex px-4 w-full lg:px-[96px] flex-col pt-[60px] min-h-[92.2vh] items-center justify-center">
          <div className="flex flex-col text-center items-center justify-between space-y-2">
            <div className="text-start mb-1 items-start justify-center flex flex-col w-full">
              <h3 className="font-[550] tracking-[-0.015em] text-[26px] mb-0.5">
                {t("auth.register")}
              </h3>
              <p className="max-w-[300px] tracking-[-0.01em] text-[15px]">
                {t("auth.registerDesc")}
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
                  autoFocus={true}
                  disabled={loading}
                  required={true}
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
            <div className="w-full min-w-[320px] lg:min-w-[350px]">
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
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setPasswordError(null);
                    setPassword(e.target.value);
                  }}
                  disabled={loading}
                  required={true}
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
            <div className="w-full min-w-[320px] lg:min-w-[350px]">
              <div
                className={`${
                  passwordConfirmError
                    ? "focus:hover:border-red-500 focus:hover:ring-red-500 focus-within:border-red-500 focus:border-red-500 focus:ring-red-500 hover:focus-within:ring-red-500 focus-within:ring-red-500 dark:border-red-600 border-red-500"
                    : "focus:hover:border-blue-500 focus:hover:ring-blue-500 focus-within:border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:focus-within:ring-blue-500 focus-within:ring-blue-500 dark:border-dark-border border-light-border"
                } relative bg-transparent border rounded-[9px] px-3 py-[8px] transition-all duration-150 ease-linear outline-none peer-hover:ring-[1px] focus-within:ring-[1px] shadow-sm`}
              >
                <input
                  className="peer pt-[15px] w-full bg-transparent dark:text-light text-dark text-[15px] outline-none peer-valid:focus peer-focus:focus"
                  id="passwordConfirm-input"
                  type={showPasswordConfirm ? "text" : "password"}
                  value={passwordConfirm}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setPasswordConfirmError(null);
                    setPasswordConfirm(e.target.value);
                  }}
                  disabled={loading}
                  required={true}
                />
                <label
                  htmlFor="passwordConfirm-input"
                  className="absolute pointer-events-none cursor-text ease-in-out duration-150 bg-transparent px-1 left-2.5 top-[15px] text-zinc-700 dark:text-zinc-300 text-[14.75px] transition-all transform origin-left peer-disabled:top-[4.25px] peer-focus:top-[4.25px] font-[450] peer-disabled:left-[8.25px] peer-focus:left-[8.25px] peer-disabled:text-[13px] peer-focus:text-[13px] peer-focus:dark:text-light peer-disabled:scale-90 peer-focus:scale-90 peer-valid:top-[4.25px] peer-valid:left-[8.25px] peer-valid:text-[13px] peer-valid:scale-90"
                >
                  {t("auth.passwordConfirm")}
                </label>
                <button
                  type="button"
                  className={`${
                    passwordConfirm.length > 0 ? "opacity-100" : "opacity-0"
                  } absolute outline-none right-4 top-[50%] transform -translate-y-1/2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-all ease-linear duration-100`}
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
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
                        showPasswordConfirm ? "opacity-100" : "opacity-0"
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
                        showPasswordConfirm ? "opacity-0" : "opacity-100"
                      } transition-all ease-linear duration-75`}
                    >
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                </button>
              </div>
              {passwordConfirmError && (
                <div className="text-start w-full mt-1 flex flex-row items-center justify-start">
                  <span className="text-red-500 text-xs font-[450]">
                    {passwordConfirmError}
                  </span>
                </div>
              )}
            </div>
            <div className="block w-full space-y-2.5 pt-0.5">
              <button
                onClick={geetestRegisterHandler}
                disabled={loading || googleRegisterLoading}
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
                    <span>{t("auth.signingOn")}</span>
                  </div>
                ) : (
                  <>
                    <span>{t("auth.register")}</span>
                  </>
                )}
              </button>
              <div className="relative text-center py-1.5">
                <hr className="border-t border-zinc-300/60 dark:border-zinc-700/60" />
                <span className="absolute top-[-4px] text-[13px] dark:text-zinc-200 text-zinc-700 left-1/2 dark:bg-dark bg-white transform -translate-x-1/2 bg-transparent px-2">
                  {t("auth.or")}
                </span>
              </div>
              <button
                onClick={handleGoogleRegister}
                disabled={googleRegisterLoading}
                className={`block relative text-light dark:text-light flex-1 disabled:opacity-90 cursor-pointer disabled:cursor-default transition-all disabled:bg-blue-500 font-[450] text-[15.5px] ease-linear duration-100 py-[10px] text-center items-center justify-center w-full bg-blue-500 rounded-lg disabled:hover:bg-blue-500 hover:bg-blue-500/90`}
              >
                {googleRegisterLoading ? (
                  <div className="flex flex-row items-center space-x-[6.25px] justify-center">
                    <CircularProgress
                      size={20}
                      thickness={5}
                      color="inherit"
                      className="text-light"
                    />
                    <span>{t("auth.processing")}</span>
                  </div>
                ) : (
                  <div className="flex flex-row items-center space-x-[6.25px] justify-center">
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
                    <span>{t("auth.continueWithGoogle")}</span>
                  </div>
                )}
              </button>
              <div className="text-start mt-2 items-start justify-start text-[15px] font-normal">
                {t("auth.haveAccount")}&nbsp;
                <a
                  onClick={() => router.push("/oauth/login")}
                  className="font-medium text-blue-500 cursor-pointer hover:underline"
                >
                  {t("auth.login")}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
