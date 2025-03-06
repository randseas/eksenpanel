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
export function passwordChecker(password: string): boolean {
  if (password.length < 8) return false;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)) {
    return false;
  }
  const weakPasswords = [
    "123456",
    "password",
    "qwerty",
    "abc123",
    "asdfgh",
    "asd123",
    "123qwe",
    "letmein",
    "welcome",
    "1234",
    "12345678",
    "abcdefghj",
  ];
  if (weakPasswords.includes(password.toLowerCase())) {
    return false;
  }
  return true;
}
