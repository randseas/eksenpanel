"use client";
import React, { createContext, useEffect, useState, useCallback } from "react";
import getLocalKey, { setLocalKey } from "@/helpers/localStorage";
import { Activity, Package, Redirect, User } from "@/types";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import dotenv from "dotenv";
dotenv.config();

export interface State {
  userData: User;
  userRedirects: Redirect[];
  packages: Package[];
  users: Partial<User>[];
  activities: Activity[];
  loading: boolean;
}
interface AppContextType {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}
const emptyUser: User = {
  userId: "",
  email: "",
  token: "",
  permission: "user",
  created: "0",
  purchasedPackages: [],
  telegramBot: {
    key: "",
    groupId: "",
  },
};
const initialState: State = {
  userData: emptyUser,
  userRedirects: [],
  packages: [],
  users: [],
  activities: [],
  loading: true,
};
export const AppContext = createContext<AppContextType>({
  state: initialState,
  setState: () => {},
});
export default function ProvideContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<State>(initialState);
  useEffect(() => {
    const userToken = getLocalKey("user-token");
    const socket = io(
      process.env.NODE_ENV === "production"
        ? "https://bionlukbackend.onrender.com"
        : "http://localhost:3000"
    );
    socket.emit("chat message", `live_user::${userToken}`);
    const handleLiveData = async (data: any) => {
      try {
        if (data.userData) {
          const updatedData = {
            ...data,
            userData: data.userData,
            userRedirects: data.userRedirects,
            packages: data.packages,
            users: data?.users || [],
            activities: data?.activities || [],
            loading: false,
          };
          setState((prev) => ({
            ...prev,
            ...updatedData,
            loading: false,
          }));
        } else {
          setState((prev) => ({
            ...prev,
            ...data,
            loading: false,
          }));
        }
      } catch (err) {
        toast.error("Data processing failed");
        console.error(err);
      }
    };
    socket.on("live_data", handleLiveData);
    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, []);
  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
}
