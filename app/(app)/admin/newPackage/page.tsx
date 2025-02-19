"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "../../../../components/common/dashboardHeader";
import { AppContext } from "../../context";
import instance from "@/app/instance";
import toast from "react-hot-toast";

interface Package {
  packageId: string;
  title: string;
  name: string;
  description: string;
  price: string;
  accounts: string;
  accAmount: string;
  creationDate: string;
}

export default function NewPackage() {
  const router = useRouter();
  const { state } = useContext(AppContext);
  const [pkg, setPackage] = useState<Partial<Package>>({
    title: "",
    name: "",
    description: "",
    price: "",
    accounts: "",
    accAmount: "",
  });
  function handleNewPackage() {
    instance
      .post("newPackage", {
        token: state.userData.token,
        pkg,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          toast.success("Paket oluşturuldu");
          router.push("/admin/packages");
        } else if (res.data.message === "missing_fields") {
          toast.error("Lütfen tüm alanları doldurun");
        } else if (res.data.message === "package_already_exists") {
          toast.error("Bu ad ile zaten bir paket mevcut");
        } else if (res.data.message === "forbidden") {
          toast.error("Erişim engellendi");
        } else if (res.data.message === "db_error") {
          toast.error("Sunucu hatası");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      });
  }
  return (
    <div className="flex flex-col min-h-[100vh] items-start px-4 md:px-5 py-4 w-full h-full">
      <DashboardHeader page="Paket Ekle" />
      <div className="border mx-auto neon-box md:max-w-screen-md shadow-lg shadow-zinc-900/10 w-full flex flex-col items-start justify-between border-light-border dark:border-zinc-700 bg-light/20 dark:bg-[#333333] rounded-2xl p-5">
        <h1 className="text-lg font-medium">Yeni Paket Ekle</h1>
        <span className="dark:text-zinc-200 text-base font-[450]">
          Yeni bir paket ekleyin.
        </span>
        <div className="w-full flex flex-col mt-3.5 items-center justify-center">
          <div className="flex mt-3.5 flex-col md:flex-row gap-3.5 items-center justify-between w-full">
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="pkgName"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Paket Adı
              </label>
              <input
                id="pkgName"
                value={pkg.name}
                onChange={(e: any) =>
                  setPackage((prevPackage) => ({
                    ...prevPackage,
                    name: e.target.value,
                  }))
                }
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="Örn. Premium Paket"
              />
            </div>
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="pkgDescription"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Açıklama
              </label>
              <input
                id="pkgDescription"
                value={pkg.description}
                onChange={(e: any) =>
                  setPackage((prevPackage) => ({
                    ...prevPackage,
                    description: e.target.value,
                  }))
                }
                spellCheck="false"
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="Örn. 500k takipçili"
              />
            </div>
          </div>
          <div className="flex mt-3.5 flex-col md:flex-row gap-3.5 items-center justify-between w-full">
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="pkgName"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Paket İçeriği
              </label>
              <input
                id="pkgName"
                value={pkg.title}
                onChange={(e: any) =>
                  setPackage((prevPackage) => ({
                    ...prevPackage,
                    title: e.target.value,
                  }))
                }
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="Örn. 35 Hesap"
              />
            </div>
            <div className="flex flex-col w-full space-y-1 items-start justify-start text-start">
              <label
                htmlFor="pkgPrice"
                className="text-md font-[450] dark:text-zinc-200"
              >
                Paket Fiyatı (USD)
              </label>
              <input
                id="pkgPrice"
                type="number"
                value={pkg.price}
                min={0}
                step={0.01}
                onChange={(e: any) =>
                  setPackage((prevPackage) => ({
                    ...prevPackage,
                    price: e.target.value.replace(/\s+/g, ""),
                  }))
                }
                className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
                placeholder="0,00"
              />
            </div>
          </div>
          <div className="flex mt-3.5 flex-col w-full space-y-1 items-start justify-start text-start">
            <label
              htmlFor="accAmount"
              className="text-md font-[450] dark:text-zinc-200"
            >
              Paket başına teslim edilecek hesap sayısı
            </label>
            <input
              id="accAmount"
              value={pkg.accAmount}
              onChange={(e: any) => {
                setPackage((prevPackage) => ({
                  ...prevPackage,
                  accAmount: e.target.value,
                }));
              }}
              type="number"
              min={0}
              step={1}
              spellCheck="false"
              className="px-3.5 focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
              placeholder="0"
            />
            <span className="dark:text-zinc-300 text-sm">
              Örnek: 5 girerseniz, girdiğiniz hesaplardan 5 adet seçilip
              müşteriye gönderilir ve bu hesaplar paketin stoklarından
              kaldırılır, müşteriye eklenir.
            </span>
          </div>
          <div className="flex mt-2 flex-col w-full space-y-1 items-start justify-start text-start">
            <label
              htmlFor="accounts"
              className="text-md font-[450] dark:text-zinc-200"
            >
              Hesaplar
            </label>
            <textarea
              id="accounts"
              value={pkg.accounts}
              onChange={(e: any) => {
                setPackage((prevPackage) => ({
                  ...prevPackage,
                  accounts: e.target.value,
                }));
              }}
              spellCheck="false"
              className="px-3.5 font-mono focus:ring-[0.95px] focus:ring-blue-500/90 focus:border-blue-500 focus:hover:border-blue-500 w-full transition-all ease-linear duration-100 min-h-[100px] rounded-[11px] py-2.5 dark:bg-dark/10 border dark:border-zinc-500"
              placeholder="Kullanıcı Adı:example | E-POSTA:example@holder.com | ŞİFRE:1234"
            />
            <span className="dark:text-zinc-300 text-sm">
              <span className="font-mono">
                Kullanıcı Adı:example | E-POSTA:example@holder.com | ŞİFRE:1234
              </span>
              &nbsp; formatında giriş yapınız.
            </span>
          </div>
          <button
            onClick={handleNewPackage}
            className="w-full text-white dark:text-white shadow-inner shadow-blue-400 mt-4 rounded-xl py-2.5 px-3 bg-blue-500 hover:bg-blue-600/95 active:bg-blue-600 transition-all ease-linear duration-100 hover:cursor-pointer"
          >
            Paketi Ekle
          </button>
        </div>
      </div>
    </div>
  );
}
