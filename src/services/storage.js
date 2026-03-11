const API = "http://localhost:5000/api";

const getToken = () => localStorage.getItem("tm_token");

export const request = async (endpoint, method = "GET", body = null) => {
  const headers = { "Content-Type": "application/json" };
  if (getToken()) headers["Authorization"] = `Bearer ${getToken()}`;
  const res = await fetch(`${API}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });
  return res.json();
};

export const saveToken = (token) => localStorage.setItem("tm_token", token);
export const clearToken = () => localStorage.removeItem("tm_token");
export const tokenExists = () => !!localStorage.getItem("tm_token");