export interface User {
  userId: string;
  email: string;
  token?: string;
  password?: string;
  permission: string;
  created: string;
}