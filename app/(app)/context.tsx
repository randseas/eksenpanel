"use client";
import React, { createContext, useEffect, useState, useCallback } from "react";
import getLocalKey, { setLocalKey } from "@/helpers/localStorage";
import { User } from "@/types";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import dotenv from "dotenv";
dotenv.config();

export interface State {
  userData: User;
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
  created: "",
};
const initialState: State = {
  userData: emptyUser,
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
  const router = useRouter();
  const [state, setState] = useState<State>(initialState);
  useEffect(() => {
    const userToken = getLocalKey("session-token");
    const socket = io(
      process.env.NODE_ENV === "production"
        ? "https://waultdex-server.onrender.com"
        : "http://localhost:3000"
    );
    socket.emit("chat message", `user::${userToken}`);
    const handleLiveData = async (data: any) => {
      try {
        if (data.userData) {
          const updatedData = {
            ...data,
            userData: data.userData,
            loading: false,
          };
          setState((prev) => ({
            ...prev,
            ...updatedData,
            loading: false,
          }));
          setLocalKey("state-data", JSON.stringify(updatedData));
        } else {
          setState((prev) => ({
            ...prev,
            ...data,
            loading: false,
          }));
          setLocalKey("state-data", JSON.stringify(data));
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
