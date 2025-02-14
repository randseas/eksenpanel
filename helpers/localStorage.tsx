export default function getLocalKey(key: string): string {
  var e = typeof window !== "undefined" && window?.localStorage?.getItem(key);
  return e || "";
}
export function setLocalKey(key: string, value: string): void {
  typeof window !== "undefined" && window?.localStorage?.setItem(key, value);
}
