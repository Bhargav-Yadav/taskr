import React, { createContext, useContext, useState, useEffect } from "react";
import { registerUser, loginUser, logoutUser } from "../services/auth";
import { request, tokenExists } from "../services/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (tokenExists()) {
        const res = await request("/auth/me");
        if (res._id) setUser(res);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const register = async (name, email, password) => {
    const res = await registerUser(name, email, password);
    if (res._id) setUser(res);
    return res;
  };

  const login = async (email, password) => {
    const res = await loginUser(email, password);
    if (res._id) setUser(res);
    return res;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  if (loading) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "monospace", fontSize: 14 }}>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}