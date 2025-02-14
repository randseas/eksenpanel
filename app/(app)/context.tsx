"use client";
import React, { createContext, useEffect, useState, useCallback } from "react";
import getLocalKey, { setLocalKey } from "@/helpers/localStorage";
import { User, SpotMarket, FuturesMarket, Wallet, Network } from "@/types";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { t as translate } from "@/i18n/i18n";
import instance from "@/app/instance";
import { useRouter } from "next/navigation";
import dotenv from "dotenv";
dotenv.config();

export interface State {
  userData: User;
  spotMarkets: SpotMarket[];
  futuresMarkets: FuturesMarket[];
  networks: Network[];
  loading: boolean;
  route: string;
  showBalances: boolean | null;
}
interface AppContextType {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}
const emptyUser: User = {
  userId: "",
  username: "",
  permission: "user",
  email: "",
  password: "",
  created: "",
  wallets: [],
  sessions: [],
};
const initialState: State = {
  userData: emptyUser,
  spotMarkets: [],
  futuresMarkets: [],
  networks: [],
  loading: true,
  route: "-",
  showBalances: null,
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
  const handleWalletSetup = useCallback(
    async (wallets: Wallet[], spotMarkets: SpotMarket[]) => {
      return Promise.all(
        wallets.map(async (wallet, index) => {
          const updatedBalances = await Promise.all(
            wallet.balances.map(async (balance) => {
              const market = spotMarkets.find(
                (spotMarket: SpotMarket) => spotMarket.id === balance.id
              );
              const usdValue =
                parseFloat(market?.price || "0") *
                parseFloat(balance.balance || "0");
              return {
                ...balance,
                valueInUSD: usdValue,
              };
            })
          );
          const totalBalanceInUSD = updatedBalances.reduce(
            (sum, balance) => sum + balance.valueInUSD,
            0
          );
          return {
            ...wallet,
            balances: updatedBalances,
            totalBalanceInUSD,
            name: wallet.name || `${translate("wallet.wallet")} ${index + 1}`,
          };
        })
      );
    },
    []
  );
  useEffect(() => {
    const storedValue = getLocalKey("showBalances");
    setState((prev) => ({
      ...prev,
      showBalances:
        storedValue === "true" ? true : storedValue === "false" ? false : true,
    }));
  }, []);
  useEffect(() => {
    if (state.showBalances !== null) {
      setLocalKey("showBalances", state.showBalances.toString());
    }
  }, [state.showBalances]);
  useEffect(() => {
    const initializeData = async () => {
      try {
        await instance.post("mempools").then((res: any) => {
          if (res.data.status === "ok") {
            setState((prev) => ({
              ...prev,
              ...res.data,
              loading: false,
            }));
            setLocalKey("state-data", "");
          }
        });
      } catch (err) {
        toast.error("Sync failed");
        console.error(err);
      }
    };
    const sessionToken = getLocalKey("session-token");

    const socket = io(
      process.env.NODE_ENV === "production"
        ? "https://waultdex-server.onrender.com"
        : "http://localhost:9443"
    );
    socket.emit("chat message", `live_data::${sessionToken}`);
    const handleLiveData = async (data: any) => {
      try {
        if (
          typeof data.userData === "string" &&
          data.userData === "session_not_found"
        ) {
          toast.error("Session terminated");
          router.push("/oauth/logout");
        } else if (data.userData) {
          const updatedWallets = await handleWalletSetup(
            data.userData.wallets,
            data.spotMarkets
          );
          const updatedData = {
            ...data,
            userData: {
              ...data.userData,
              wallets: updatedWallets,
            },
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
  }, [handleWalletSetup]);
  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
}
