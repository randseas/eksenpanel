export default function checkLogin(): boolean {
  const usertoken =
    typeof window !== "undefined" && window.localStorage.getItem("user-token");
  return usertoken ? true : false;
}
