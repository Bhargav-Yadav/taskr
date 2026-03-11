import { request, saveToken, clearToken } from "./storage";

export async function registerUser(name, email, password) {
  const res = await request("/auth/register", "POST", { name, email, password });
  if (res.token) saveToken(res.token);
  return res;
}

export async function loginUser(email, password) {
  const res = await request("/auth/login", "POST", { email, password });
  if (res.token) saveToken(res.token);
  return res;
}

export function logoutUser() {
  clearToken();
}

export function getSessionUser() {
  return null; // handled by AuthContext now
}