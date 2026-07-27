import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";
const SESSION_SECRET = process.env.ADMIN_SECRET || "admin-secret-key-2026";

export async function createSession(): Promise<string> {
  const token = btoa(`${Date.now()}:${SESSION_SECRET}`);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
  return token;
}

export async function getSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  try {
    const decoded = atob(token);
    const [, secret] = decoded.split(":");
    return secret === SESSION_SECRET;
  } catch {
    return false;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export function validateCredentials(username: string, password: string): boolean {
  const adminUser = process.env.ADMIN_USERNAME || "admin";
  const adminPass = process.env.ADMIN_PASSWORD || "admin123";
  return username === adminUser && password === adminPass;
}
