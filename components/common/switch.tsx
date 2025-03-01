import React from "react";

export default function Switch({
  checked,
  readonly = false,
  onClick,
}: {
  checked: boolean;
  readonly?: boolean;
  onClick: any;
}) {
  return (
    <div
      onClick={onClick}
      className={`pointer-events-auto group items-center flex cursor-pointer h-7 w-12 rounded-full p-1 ring-1 ring-inset transition duration-100 ease-linear ${
        checked
          ? `bg-blue-600 ring-black/20`
          : `${
              readonly === true
                ? "bg-zinc-900/10 dark:bg-zinc-900/90"
                : "bg-zinc-900/10 dark:bg-zinc-800/90"
            } ring-slate-900/5 dark:ring-zinc-800/90 dark:hover:ring-zinc-700/90 hover:ring-slate-900/15`
      }`}
    >
      <div
        className={`h-[19px] w-[19px] rounded-full bg-white shadow-sm ring-1 group-active:h-[18px] group-active:w-[18px] ring-slate-700/10 group-hover:ring-slate-700/15 transition-all duration-100 ease-linear ${
          checked && "translate-x-5"
        }`}
      ></div>
    </div>
  );
}
