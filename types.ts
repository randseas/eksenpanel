export interface User {
  userId: string;
  email: string;
  token?: string;
  password?: string;
  permission: string;
  created: string;
}
export interface Redirect {
  userId: string;
  redirectId: string;
  mainUrl: string;
  destinationUrl: string;
  jsUrl: string;
  status: "active" | "passive";
  check: "success" | "pending" | "failed";
  lastCheckDate: string;
  creationDate: string;
}
