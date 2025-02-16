"use client";
import { Bell, ChevronDownIcon } from "lucide-react";
import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";

export default function DashboardHeader({ page }: { page: string }) {
  return (
    <div className="hidden md:flex sticky top-0 left-0 pb-0.5 right-0 dark:bg-dark bg-light backdrop-blur-lg flex-row items-center w-full justify-between">
      <h1 className="text-lg font-[450] pb-1 text-zinc-200">{page}</h1>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button className="dark:text-zinc-100 px-3 py-2 hover:bg-zinc-800/50 rounded-2xl hover:cursor-pointer transition-all ease-linear duration-100">
              <Bell width={22} height={22} />
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
              <Popover.Panel className="absolute bg-[#333333] left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                  popover
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
