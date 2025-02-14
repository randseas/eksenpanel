"use client";
import React from "react";
import { Tooltip as ReactTooltip } from "react-tailwind-tooltip";

export default function Tooltip({
  text,
  children,
  className,
}: {
  text: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`cursor-help ${className}`}>
      <ReactTooltip
        tooltipStyle="bg-zinc-800 text-white text-[12.25px]"
        arrowStyle="to-zinc-800"
        enterDelay={0}
        leaveDelay={50}
        title={text}
        placement="top"
        arrow
      >
        {children}
      </ReactTooltip>
    </div>
  );
}
