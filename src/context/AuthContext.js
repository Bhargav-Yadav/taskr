import React, { createContext, useContext, useState, useEffect } from "react";
import {
  registerUser,
  loginUser,
  logoutUser,
  getSessionUser,
} from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const existing = getSessionUser();
    if (existing) setUser(existing);
  }, []);

  const register = (name, email, password) => {
    const res = registerUser(name, email, password);
    if (res.user) setUser(res.user);
    return res;
  };

  const login = (email, password) => {
    const res = loginUser(email, password);
    if (res.user) setUser(res.user);
    return res;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
