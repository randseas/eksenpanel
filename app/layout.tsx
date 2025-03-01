import { Routes, Route, useLocation } from "react-router";
import Home from "./page.tsx";
import NProgress from "nprogress";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import NotFound from "./notfound.tsx";
import AppLayout from "./(app)/layout.tsx";
/* Auth: Layout */
import AuthHome from "./auth/page.tsx";
import Login from "./auth/login/page.tsx";
import Register from "./auth/register/page.tsx";
import PasswordReset from "./auth/password-reset/page.tsx";
import LogOut from "./auth/logout/page.tsx";
/* Dashboard: User Layout */
import DashboardHome from "./(app)/dashboard/page.tsx";
import DashboardLayout from "./(app)/dashboard/layout.tsx";
import EditRedirect from "./(app)/dashboard/editRedirect/page.tsx";
import NewRedirect from "./(app)/dashboard/newRedirect/page.tsx";
import OrderHistory from "./(app)/dashboard/orderhistory/page.tsx";
import Packages from "./(app)/admin/packages/page.tsx";
/* Dashboard: Admin Layout */
import AdminHome from "./(app)/admin/page.tsx";
import Activities from "./(app)/admin/activities/page.tsx";
import AdminLayout from "./(app)/admin/layout.tsx";
import EditSubscription from "./(app)/admin/editSubscription/page.tsx";
import EditPackage from "./(app)/admin/editPackage/page.tsx";
import NewPackage from "./(app)/admin/newPackage/page.tsx";
import NewSubscription from "./(app)/admin/newSubscription/page.tsx";
import PackageOrders from "./(app)/admin/packageOrders/page.tsx";
import Redirects from "./(app)/dashboard/redirects/page.tsx";
import Settings from "./(app)/dashboard/settings/page.tsx";
import AdminStats from "./(app)/admin/stats/page.tsx";
import SubscriptionOrders from "./(app)/admin/subscriptionOrders/page.tsx";
import Subscriptions from "./(app)/admin/subscriptions/page.tsx";
import Users from "./(app)/admin/users/page.tsx";

NProgress.configure({
  showSpinner: false,
  speed: 250,
  minimum: 0.1,
  trickleSpeed: 750,
});

export default function Layout() {
  const location = useLocation();
  const [theme, setTheme] = useState<string>(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );
  useEffect(() => {
    const mediaQuery =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : null;
    setTheme(mediaQuery?.matches ? "dark" : "light");
  }, []);
  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => {
      NProgress.done();
    }, 600);
    return () => clearTimeout(timer);
  }, [location]);
  const styles = {
    toast: {
      backgroundColor: "white",
      color: "black",
      border: "1px solid #e5e7eb",
      borderRadius: "9999px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    },
    darkToast: {
      backgroundColor: "#090909",
      color: "#efefef",
      borderColor: "#171718",
    },
  };
  const isDarkMode = theme === "dark" ? true : false;
  return (
    <>
      <Toaster
        containerClassName="!z-[999999]"
        toastOptions={{
          style: {
            ...styles.toast,
            ...(isDarkMode ? styles.darkToast : {}),
          },
        }}
      />
      <Routes>
        {/* Home */}
        <Route index element={<Home />} />
        {/* Authentication */}
        <Route path="/auth">
          <Route index element={<AuthHome />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="passwordReset" element={<PasswordReset />} />
          <Route path="logout" element={<LogOut />} />
        </Route>
        {/* App: Main Layout */}
        <Route element={<AppLayout />}>
          {/* App: User Layout */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="editRedirect/:redirectId" element={<EditRedirect />} />
            <Route path="newRedirect" element={<NewRedirect />} />
            <Route path="orderhistory" element={<OrderHistory />} />
            <Route path="packages" element={<Packages />} />
            <Route path="redirects" element={<Register />} />
            <Route path="settings" element={<PasswordReset />} />
            <Route path="subscription" element={<LogOut />} />
          </Route>
          {/* App: Admin Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="activities" element={<Activities />} />
            <Route path="editPackage/:packageId" element={<EditPackage />} />
            <Route
              path="editSubscription/:subscriptionId"
              element={<EditSubscription />}
            />
            <Route path="newPackage" element={<NewPackage />} />
            <Route path="newSubscription" element={<NewSubscription />} />
            <Route path="packageOrders" element={<PackageOrders />} />
            <Route path="packages" element={<Packages />} />
            <Route path="redirects" element={<Redirects />} />
            <Route path="settings" element={<Settings />} />
            <Route path="stats" element={<AdminStats />} />
            <Route path="subscriptionOrders" element={<SubscriptionOrders />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Route>
        {/* Not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
