/**
 * Returns a formatted date.
 *
 * @param timestamp - 31231232135
 * @returns 2024-07-01 13:00:01
 */
export default function formatDate(i: number): string {
  const timestamp: number = i;
  const milliseconds = timestamp * 1000;
  const date = new Date(milliseconds);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )} ${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}
export function timeAgo(timestamp: string | number): string {
  const date = new Date(timestamp); // ISO formatını destekler
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diffInSeconds < 60) return `${diffInSeconds}sn önce`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}dk önce`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}sa önce`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} gün önce`;
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks} hafta önce`;
  const diffInMonths =
    now.getMonth() -
    date.getMonth() +
    (now.getFullYear() - date.getFullYear()) * 12;
  if (diffInMonths < 12) return `${diffInMonths} ay önce`;
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} yıl önce`;
}
export function timeRemaining(timestamp: string | number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);
  if (diffInSeconds <= 0) return "Süre doldu";
  if (diffInSeconds < 60) return `${diffInSeconds}sn kaldı`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    const remainingSeconds = diffInSeconds % 60;
    return remainingSeconds > 0
      ? `${diffInMinutes}dk ${remainingSeconds}sn kaldı`
      : `${diffInMinutes}dk kaldı`;
  }
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    const remainingMinutes = diffInMinutes % 60;
    return remainingMinutes > 0
      ? `${diffInHours}sa ${remainingMinutes}dk kaldı`
      : `${diffInHours}sa kaldı`;
  }
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    const remainingHours = diffInHours % 24;
    return remainingHours > 0
      ? `${diffInDays} gün ${remainingHours}sa kaldı`
      : `${diffInDays} gün kaldı`;
  }
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    const remainingDays = diffInDays % 7;
    return remainingDays > 0
      ? `${diffInWeeks} hafta ${remainingDays} gün kaldı`
      : `${diffInWeeks} hafta kaldı`;
  }
  const diffInMonths =
    date.getMonth() -
    now.getMonth() +
    (date.getFullYear() - now.getFullYear()) * 12;
  if (diffInMonths < 12) {
    const remainingWeeks = Math.floor((diffInDays % 30) / 7);
    return remainingWeeks > 0
      ? `${diffInMonths} ay ${remainingWeeks} hafta kaldı`
      : `${diffInMonths} ay kaldı`;
  }
  const diffInYears = Math.floor(diffInMonths / 12);
  const remainingMonths = diffInMonths % 12;
  return remainingMonths > 0
    ? `${diffInYears} yıl ${remainingMonths} ay kaldı`
    : `${diffInYears} yıl kaldı`;
}
