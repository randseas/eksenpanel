"use client";
import React, { useContext } from "react";
import {
  Calendar,
  DollarSign,
  DotSquare,
  Hash,
  Package as PkgIcon,
  PackageOpen,
  PackageSearch,
  Users,
  PackageX,
  SquarePen,
  Trash2,
} from "lucide-react";
import { timeAgo } from "../../../../lib/date";
import { AppContext } from "../../context";
import { Package } from "../../../../types";
import DashboardHeader from "../../../../components/common/dashboardHeader";
import instance from "../../../../app/instance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function AdminPackages() {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);

  function deletePackage(packageId: string) {
    const isConfirmed = window.confirm(
      "Paketi silmek istediğinize emin misiniz?"
    );
    if (!isConfirmed) return;
    const loadingtoast = toast.loading("Paket siliniyor");
    instance
      .post("deletePackage", {
        token: state.userData.token,
        packageId,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          toast.success("Paket başarıyla silindi");
        } else {
          toast.error("Paket silinemedi, tekrar deneyin.");
        }
      })
      .catch((err: any) => {
        console.error(err);
        toast.error(err.message || "Bir hata oluştu!");
      })
      .finally(() => {
        toast.dismiss(loadingtoast);
      });
  }
  return (
    <div className="flex space-y-4 flex-col min-h-[100vh] items-start px-5 py-[18px] justify-start w-full h-full">
      <DashboardHeader page="Paketler" />
      <div className="flex neon-box-2 overflow-x-auto overflow-y-auto flex-col bg-light/20 dark:bg-[#292929] border dark:border-zinc-700 border-light-border rounded-2xl w-full h-full">
        <table className="min-w-full w-full">
          <thead className="border-b dark:border-zinc-700 border-light-border/80 rounded-t-2xl w-full">
            <tr>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <Hash
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Paket ID</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <PkgIcon
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Paket Adı</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <PackageOpen
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Paket İçeriği</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <PackageSearch
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Paket Açıklaması</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <Calendar
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Oluşturulma Tarihi</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <Users
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Hesap Sayısı</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <PackageX
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Stok</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <DollarSign
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Fiyat (USD)</span>
                </div>
              </th>
              <th className="text-end dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-3 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <DotSquare
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Aksiyon</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-zinc-700 divide-light-border/80">
            {state.packages?.map((pkg: Package, index: number) => (
              <tr
                key={index}
                className="transition-all hover:bg-zinc-900/20 ease-linear duration-100"
              >
                <td className="text-[15px] px-2 py-4">
                  {pkg.packageId.split("-")[0]}
                </td>
                <td className="text-[15px] px-2 py-4">{pkg.name}</td>
                <td className="text-[15px] px-2 py-4">{pkg.title}</td>
                <td className="text-[15px] px-2 py-4">
                  {pkg.description.length >= 20
                    ? pkg.description.slice(0, 20) + "..."
                    : pkg.description}
                </td>
                <td className="text-[15px] px-2 py-4">
                  {timeAgo(pkg.creationDate)}
                </td>
                <td className="text-[15px] px-2 py-4">{pkg.accAmount}</td>
                <td className="text-[15px] px-2 py-4">
                  {pkg.accAmount !== "0"
                    ? Math.floor(
                        parseInt(pkg.accounts.length.toString()) /
                          parseInt(pkg.accAmount)
                      )
                    : "0"}
                </td>
                <td className="text-[15px] px-2 py-4">${pkg.price}</td>
                <td className="text-[15px] flex flex-row items-center justify-end space-x-1.5 text-end px-3 py-4">
                  <a
                    onClick={() =>
                      navigate(`/admin/editPackage/${pkg.packageId}`)
                    }
                    className="transition-all ease-linear duration-100 rounded-xl pr-1.5 hover:text-blue-600 text-blue-500 hover:cursor-pointer"
                  >
                    <SquarePen stroke="currentColor" width={22} height={22} />
                  </a>
                  <a
                    onClick={() => deletePackage(pkg.packageId)}
                    className="transition-all ease-linear duration-100 rounded-xl pl-1.5 hover:text-red-600 text-red-500 hover:cursor-pointer"
                  >
                    <Trash2 stroke="currentColor" width={22} height={22} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
