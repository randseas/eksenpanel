"use client";
import React, { useContext, useState } from "react";
import Switch from "../../../../components/common/switch";
import DashboardHeader from "../../../../components/common/dashboardHeader";
import instance from "../../../../app/instance";
import toast from "react-hot-toast";
import { AppContext } from "../../context";
import { Redirect } from "../../../../types";
import CodeBlock from "../../../../components/common/codeBlock";
import { useNavigate, useParams } from "react-router";

export default function EditRedirect() {
  const navigate = useNavigate();
  const { redirectId } = useParams();
  const { state } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [existingRedirect, setExistingRedirect] = useState<
    Redirect | undefined
  >(
    state.userRedirects.find(
      (redirect: Redirect) => redirect.redirectId === JSON.stringify(redirectId)
    )
  );
  const [isRedirectActive, setIsRedirectActive] = useState<
    "active" | "passive" | any
  >(existingRedirect?.status);
  const [destinationUrl, setDestinationURL] = useState<string>(
    existingRedirect?.destinationUrl || ""
  );
  const [title, setTitle] = useState<string>(existingRedirect?.title || "");
  const [description, setDescription] = useState<string>(
    existingRedirect?.description || ""
  );
  const [redirectCode, setRedirectCode] = useState<string>(
    existingRedirect?.jsUrl || ""
  );
  function handleEditRedirect() {
    if (!loading) {
      if (existingRedirect?.mainUrl === destinationUrl) {
        toast.error("Ana URL Hedef URL ile aynı olamaz!");
        return;
      }
      setLoading(true);
      const loadingtoast = toast.loading("Yönlendirme düzenleniyor...");
      instance
        .post("editRedirect", {
          token: state.userData.token,
          redirectId: existingRedirect?.redirectId,
          destinationUrl: destinationUrl,
          status: isRedirectActive,
          title,
          description,
        })
        .then((res) => {
          if (res.data.status === "ok") {
            toast.success("Yönlendirme düzenleme başarılı");
            setDestinationURL("");
            setRedirectCode("");
            navigate("/dashboard/redirects");
          } else if (res.data.message === "missing_fields") {
            toast.error("Lütfen tüm alanları doldurun");
          } else if (res.data.message === "redirect_not_exists") {
            toast.error("Bu yönlendirme mevcut değil");
          } else if (res.data.message === "db_error") {
            toast.error("Sunucu hatası");
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.message);
        })
        .finally(() => {
          toast.dismiss(loadingtoast);
          setLoading(false);
        });
    }
  }
  return (
    <div className="flex flex-col min-h-[100vh] items-start px-4 md:px-5 py-4 w-full h-full">
      <DashboardHeader page="Yönlendirme Düzenleme" />
      <div className="border mx-auto neon-box mt-2 md:mt-5 md:max-w-screen-md shadow-lg shadow-zinc-900/10 w-full flex flex-col items-start justify-between border-light-border dark:border-zinc-700 bg-light/20 dark:bg-[#333333] rounded-2xl p-5">
        <h1 className="text-lg font-medium">Yönlendirme Düzenleme</h1>
        <span className="dark:text-zinc-200 text-base font-[450]">
          Yönlendirmeyi düzenleme.
        </span>
        <div className="w-full flex flex-col mt-3.5 items-center justify-center">
          <div className="flex flex-col md:flex-row gap-3.5 items-center justify-between w-full">
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="link"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Yönlendirme ID
              </label>
              <input
                id="link"
                value={existingRedirect?.redirectId}
                readOnly
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="https://example.com"
              />
            </div>
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="link"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Hedef URL
              </label>
              <input
                id="link"
                value={destinationUrl}
                onChange={(e: any) => setDestinationURL(e.target.value)}
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="https://example2.com"
              />
            </div>
          </div>
          <div className="flex mt-3.5 flex-col md:flex-row gap-3.5 items-center justify-between w-full">
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="title"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Başlık
              </label>
              <input
                id="title"
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="Örnek başlık"
              />
            </div>
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="description"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Açıklama
              </label>
              <input
                id="description"
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="Örnek site açıklaması"
              />
            </div>
          </div>
          <div className="flex mt-3.5 flex-col w-full space-y-1 items-start justify-start text-start">
            <label
              htmlFor="link"
              className="text-md font-[450] dark:text-zinc-200"
            >
              Yönlendirme Kodu
            </label>
            <CodeBlock
              customStyle={{
                maxWidth: "725px",
                overflow: "auto",
                borderRadius: "11px",
                fontSize: "15px",
              }}
              code={redirectCode}
            />
          </div>
          <div className="flex flex-row items-center justify-between w-full py-1">
            <span>Yönlendirme Durumu</span>
            <Switch
              checked={isRedirectActive === "active" ? true : false}
              onClick={() =>
                setIsRedirectActive(
                  isRedirectActive === "active" ? "passive" : "active"
                )
              }
            />
          </div>
          <button
            onClick={handleEditRedirect}
            className="w-full text-white dark:text-white shadow-inner shadow-blue-400 mt-4 rounded-xl py-2.5 px-3 bg-blue-500 hover:bg-blue-600/95 active:bg-blue-600 transition-all ease-linear duration-100 hover:cursor-pointer"
          >
            Yönlendirmeyi Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}
