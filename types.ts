export interface User {
  userId: string;
  email: string;
  token?: string;
  password?: string;
  permission: string;
  purchasedPackages: PurchasedPackage[];
  telegramBot: TelegramBotDetails;
  created: string;
}
export interface Redirect {
  userId: string;
  redirectId: string;
  title: string;
  description: string;
  mainUrl: string;
  destinationUrl: string;
  jsUrl: string;
  status: "active" | "passive";
  check: "success" | "pending" | "failed";
  lastCheckDate: string;
  creationDate: string;
}
export interface Account {
  email: string;
  password: string;
}
export interface Package {
  packageId: string;
  title: string;
  name: string;
  description: string;
  price: string;
  accounts: Account[];
  accAmount: string;
  creationDate: string;
}
export interface PurchasedPackage {
  packageId: string;
  accounts: Account[];
  purchaseDate: string;
}
export interface TelegramBotDetails {
  key: string;
  groupId: string;
}
export interface Activity {
  activityId: string;
  userId: string;
  type: string;
  date: string;
  status: string;
}
