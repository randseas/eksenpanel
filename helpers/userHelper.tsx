export function deformatUserInfo(
  users: { username: string; email: string; password: string }[]
): string {
  return users
    .map(
      (user) =>
        `Kullanıcı Adı: ${user.username || "-"} | E-POSTA: ${
          user.email
        } | ŞİFRE: ${user.password}`
    )
    .join("\n");
}
