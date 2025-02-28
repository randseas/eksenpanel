"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { Calendar, DotSquare, Globe, PackageIcon, User } from "lucide-react";
import { timeAgo } from "@/lib/date";
import { AppContext } from "../../context";
import { Package, PurchasedPackage } from "@/types";
import { deformatUserInfo } from "@/helpers/userHelper";

export default function Packages() {
  const router = useRouter();
  const { state } = useContext(AppContext);

  function downloadAccounts(packageId: string) {
    const pkg = state.userData.purchasedPackages?.find(
      (purchasedPkg: PurchasedPackage) => purchasedPkg.packageId === packageId
    );
    if (!pkg) return;
    const text = deformatUserInfo(pkg.accounts);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `paket-${pkg.packageId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  return (
    <div className="flex space-y-4 flex-col min-h-[100vh] items-start px-5 py-[18px] justify-start w-full h-full">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-lg font-[450] text-zinc-800 dark:text-zinc-200">
          Paketlerim
        </h1>
        <h2
          onClick={() => router.push("/dashboard#packages")}
          className="text-md text-blue-500 hover:underline hover:cursor-pointer font-[450]"
        >
          Satın al {"->"}
        </h2>
      </div>
      <div className="flex neon-box-2 flex-col bg-light/20 dark:bg-[#292929] border dark:border-zinc-700 border-light-border rounded-2xl w-full h-full">
        <table className="min-w-full overflow-x-auto overflow-y-auto w-full">
          <thead className="border-b dark:border-zinc-700 border-light-border/80 rounded-t-2xl w-full">
            <tr>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-3 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <Globe
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
                  <PackageIcon
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
                  <Calendar
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Satın Alınma Tarihi</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <User
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Hesap Sayısı</span>
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
            {state.userData.purchasedPackages?.map(
              (purchasedPkg: PurchasedPackage, index: number) => {
                const dbPackage: Package | undefined = state.packages.find(
                  (pkg: Package) => pkg.packageId === purchasedPkg.packageId
                );
                return (
                  <tr
                    key={index}
                    className="transition-all hover:bg-zinc-900/20 ease-linear duration-100"
                  >
                    <td className="text-[15px] px-2 py-4">
                      {dbPackage?.packageId}
                    </td>
                    <td className="text-[15px] px-2 py-4">{dbPackage?.name}</td>
                    <td className="text-[15px] px-2 py-4">
                      {timeAgo(purchasedPkg.purchaseDate)}
                    </td>
                    <td className="text-[15px] px-2 py-4">
                      {dbPackage?.accAmount}
                    </td>
                    <td className="text-[15px] flex flex-row items-center justify-end space-x-1.5 text-end px-3 py-4">
                      <a
                        onClick={() =>
                          downloadAccounts(dbPackage?.packageId || "")
                        }
                        className="transition-all ease-linear hover:underline duration-100 rounded-xl pr-2 hover:text-blue-600 text-blue-500 hover:cursor-pointer"
                      >
                        Hesapları İndir (.txt)
                      </a>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
