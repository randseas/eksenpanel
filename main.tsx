import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import Layout from "./app/layout.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);
