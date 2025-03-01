import React from "react";
import { CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <CircularProgress color="inherit" className="dark:text-white text-black" />
  );
}
