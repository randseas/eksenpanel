"use client";
import { Bell, DatabaseZap } from "lucide-react";
import React, { Fragment, useContext } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { AppContext } from "../../app/(app)/context";
import { NotificationInterface } from "@/types";
import { timeAgo } from "@/lib/date";

const formatContent = (content: string) => {
  return content.split(/(\*[^*]+\*)/g).map((part, index) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return <span className="font-[500] text-[15px]" key={index}>{part.slice(1, -1)}</span>;
    }
    return part;
  });
};

export default function DashboardHeader({ page }: { page: string }) {
  const { state } = useContext(AppContext);
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="hidden z-[99999] md:flex top-0 left-0 pb-0.5 right-0 bg-transparent dark:bg-transparent flex-row items-center w-full justify-between">
      <h1 className="text-lg font-[450] pb-1 text-zinc-900 dark:text-zinc-200">
        {page}
      </h1>
      <div className="flex flex-row items-center justify-center space-x-1">
        {state.userData.permission === "admin" && (
          <div
            onClick={() => router.push("/admin")}
            className={`${
              pathname.split("/")[1] === "admin"
                ? "bg-zinc-200/60 dark:bg-zinc-800/60"
                : "hover:bg-zinc-200/50 bg-zinc-200/10 dark:bg-zinc-800/10 dark:hover:bg-zinc-800/50"
            } dark:text-zinc-100 text-zinc-800 px-3 py-2 rounded-2xl hover:cursor-pointer transition-all ease-linear duration-100`}
          >
            <DatabaseZap stroke="currentColor" width={22} height={22} />
          </div>
        )}
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`${
                  open
                    ? "bg-zinc-200/60 dark:bg-zinc-800/60"
                    : "hover:bg-zinc-200/50 bg-zinc-200/10 dark:bg-zinc-800/10 dark:hover:bg-zinc-800/50"
                } dark:text-zinc-100 text-zinc-800 px-3 py-2  rounded-2xl hover:cursor-pointer transition-all ease-linear duration-100`}
              >
                <Bell stroke="currentColor" width={22} height={22} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute bg-zinc-50 rounded-2xl dark:bg-[#252525] border dark:border-[#333333] border-zinc-100 text-dark dark:text-white left-[-310px] z-[999999] mt-2 w-[360px]">
                  <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 p-[18px] min-h-[230px]">
                    <div className="font-[500] text-[16.5px] text-zinc-900 dark:text-white">
                      Bildirimler (
                      {state.userData?.notifications?.length?.toString() || "-"}
                      )
                    </div>
                    <div className="mt-3 flex flex-col items-center justify-center space-y-1.5">
                      {state.userData?.notifications?.length > 0 ? (
                        state.userData?.notifications
                          ?.sort(
                            (
                              a: NotificationInterface,
                              b: NotificationInterface
                            ) =>
                              new Date(b.timestamp).getTime() -
                              new Date(a.timestamp).getTime()
                          )
                          .map((notification: NotificationInterface) => (
                            <div className="bg-zinc-900/80 border border-zinc-900 max-w-[100%] w-full rounded-xl px-4 py-3">
                              <span className="text-[16px] tracking-[-0.005em] font-[500]">{notification.title}</span>
                              <p className="text-zinc-100 mt-1 text-[15px]">{formatContent(notification.content)}</p>
                              <span className="mt-1 text-[15px] font-[500]">{timeAgo(notification.timestamp)}</span>
                            </div>
                          ))
                      ) : (
                        <span className="dark:text-zinc-200 text-base text-zinc-700">
                          Hiç bildiriminiz yok.
                        </span>
                      )}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  );
}
