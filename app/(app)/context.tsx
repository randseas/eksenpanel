"use client";
import React, { createContext, Component } from "react";
import getLocalKey from "@/helpers/localStorage";
import {
  Activity,
  NotificationInterface,
  Package,
  Redirect,
  SubscriptionInterface,
  User,
} from "@/types";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import dotenv from "dotenv";
import nProgress from "nprogress";
dotenv.config();

export interface State {
  userData: User;
  userRedirects: Redirect[];
  packages: Package[];
  redirects: Redirect[];
  users: Partial<User>[];
  activities: Activity[];
  subscriptions: SubscriptionInterface[];
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
  activeSubscription: null,
  orderedSubscriptions: [],
  orderedPackages: [],
  purchasedPackages: [],
  notifications: [],
  telegramBot: { key: "", groupId: "" },
};
const initialState: State = {
  userData: emptyUser,
  userRedirects: [],
  packages: [],
  redirects: [],
  users: [],
  activities: [],
  subscriptions: [],
  loading: true,
};
export const AppContext = createContext<AppContextType>({
  state: initialState,
  setState: () => {},
});

export default class ProvideContext extends Component<
  { children: React.ReactNode },
  State
> {
  socket: any;
  reconnectInterval: NodeJS.Timeout | null = null;
  pingInterval: NodeJS.Timeout | null = null;
  toastLoadingId: string | null = null;
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = initialState;
    this.socket = io(
      process.env.NODE_ENV === "production"
        ? "https://bionlukbackend.onrender.com"
        : "http://localhost:3000",
      { autoConnect: false }
    );
  }
  componentDidMount() {
    nProgress.start();
    const userToken = getLocalKey("user-token");
    this.socket.emit("chat message", `live_user::${userToken}`);
    this.socket.on("live_data", this.handleLiveData);
    this.socket.on("notification", this.handleNotification);
    this.socket.on("disconnect", this.handleDisconnect);
    this.socket.on("connect", this.handleConnect);
    this.socket.connect();
  }
  componentWillUnmount() {
    nProgress.done();
    this.socket.off("live_data", this.handleLiveData);
    this.socket.off("notification", this.handleNotification);
    this.socket.off("disconnect", this.handleDisconnect);
    this.socket.off("connect", this.handleConnect);
    this.socket.disconnect();
    if (this.reconnectInterval) {
      clearInterval(this.reconnectInterval);
    }
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
    }
    if (this.toastLoadingId) {
      toast.dismiss(this.toastLoadingId);
    }
    console.log("Socket disconnected");
  }
  handleLiveData = async (data: any) => {
    try {
      if (data.userData) {
        const updatedData = {
          ...data,
          userData: data.userData,
          userRedirects: data.userRedirects,
          packages: data.packages,
          redirects: data?.redirects || [],
          users: data?.users || [],
          activities: data?.activities || [],
          subscriptions: data?.subscriptions || [],
          loading: false,
        };
        this.setState((prev) => ({ ...prev, ...updatedData, loading: false }));
      } else {
        this.setState((prev) => ({ ...prev, ...data, loading: false }));
      }
      console.log("Live data received", data);
      nProgress.done();
    } catch (err) {
      toast.error("Data processing failed");
      console.error(err);
    }
  };
  handleNotification = (notification: NotificationInterface) => {
    const audio = new Audio("/sounds/notify.mp3");
    audio.volume = 1;
    audio.play();
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter scale-[1]" : "animate-leave scale-[0]"
          } max-w-md transition-all ease-linear duration-100 origin-top w-full border dark:border-[#333333] border-zinc-200 dark:bg-[#242424] bg-light dark:text-light text-dark shadow-lg shadow-black/40 rounded-2xl pointer-events-auto flex`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <div className="flex rounded-full flex-col items-center justify-center p-2.5 bg-red-500/15 text-red-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                  </svg>
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-[15px] font-medium dark:text-zinc-50 text-zinc-900">
                  {notification.title}
                </p>
                <p className="mt-1 text-sm dark:text-zinc-200 text-zinc-400">
                  {notification.content.replaceAll("*", "")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l dark:border-zinc-700 border-zinc-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border transition-all ease-linear duration-100 border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-500 hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Kapat
            </button>
          </div>
        </div>
      ),
      { position: "top-center", duration: 5000, style: { borderRadius: 12 } }
    );
  };
  handleDisconnect = () => {
    console.log("Socket disconnected. Attempting to reconnect...");
    if (!this.toastLoadingId) {
      this.toastLoadingId = toast.loading(
        "Soket bağlantısı kesildi. Yeniden bağlanılıyor..."
      );
    }
    this.setState({ loading: true });
    this.reconnectInterval = setInterval(() => {
      if (!this.socket.connected) {
        this.socket.connect();
      }
    }, 30000);
  };
  handleConnect = () => {
    console.log("Socket connected.");
    if (this.reconnectInterval) {
      clearInterval(this.reconnectInterval);
      this.reconnectInterval = null;
    }
    if (this.toastLoadingId) {
      toast.success("Soket bağlantısı başarılı");
      toast.dismiss(this.toastLoadingId);
      const userToken = getLocalKey("user-token");
      this.socket.emit("chat message", `live_user::${userToken}`);
      this.toastLoadingId = null;
    }
    this.pingInterval = setInterval(() => {
      this.socket.emit("chat message", "ping");
    }, 60000);
  };
  render() {
    return (
      <AppContext.Provider
        value={{ state: this.state, setState: this.setState.bind(this) }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
