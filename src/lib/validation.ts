export function validatePassword(password: string): string | null {
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must have an uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must have a lowercase letter";
  }
  return null;
}
