export interface Permission {
  permission: string;
  title: string;
  type: "string" | "boolean" | "number";
  value: string | boolean | number;
}
export interface UserSubscriptionInterface {
  subscriptionId: string;
  startDate: string;
  endDate?: string;
}
export interface SubscriptionInterface {
  subscriptionId: string;
  title: string;
  description: string;
  price: string;
  permissions: Array<Permission>;
  creationDate: string;
}
export interface User {
  userId: string;
  email: string;
  token?: string;
  password?: string;
  permission: string;
  purchasedPackages: PurchasedPackage[];
  orderedPackages: OrderedPackage[];
  telegramBot: TelegramBotDetails;
  notifications: NotificationInterface[];
  activeSubscription?: UserSubscriptionInterface | null;
  orderedSubscription: OrderedSubscription | null;
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
  username: string;
  email: string;
  password: string;
}
export interface OrderedSubscription {
  subscriptionId: string;
  orderId: string;
  status: "pending" | "success" | "cancelled";
  subscriptionPlan: "monthly" | "yearly";
  orderDate: string;
}
export interface NotificationInterface {
  title: string;
  content: string;
  read: boolean;
  timestamp: string;
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
export interface OrderedPackage {
  packageId: string;
  status: string;
  orderDate: string;
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
