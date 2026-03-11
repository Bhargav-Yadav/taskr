import { DB } from "./storage";

function hashPassword(pw) {
  let h = 0;
  for (let i = 0; i < pw.length; i++) {
    h = (h << 5) - h + pw.charCodeAt(i);
    h |= 0;
  }
  return h.toString(16);
}

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function generateToken(email) {
  return btoa(email + ":" + Date.now());
}

export function registerUser(name, email, password) {
  const users = DB.getUsers();
  if (users.find((u) => u.email === email)) {
    return { error: "Email already registered" };
  }
  const newUser = {
    id: generateId(),
    name,
    email,
    password: hashPassword(password),
    token: generateToken(email),
    createdAt: new Date().toISOString(),
  };
  DB.saveUsers([...users, newUser]);
  DB.saveSession(newUser.token);
  return { user: newUser };
}

export function loginUser(email, password) {
  const users = DB.getUsers();
  const found = users.find(
    (u) => u.email === email && u.password === hashPassword(password)
  );
  if (!found) return { error: "Invalid email or password" };
  DB.saveSession(found.token);
  return { user: found };
}

export function getSessionUser() {
  const token = DB.getSession();
  if (!token) return null;
  const users = DB.getUsers();
  return users.find((u) => u.token === token) || null;
}

export function logoutUser() {
  DB.clearSession();
}
