// Abstraction layer over localStorage.
// Swap these functions out for real fetch() API calls
// when you add a backend.

export const DB = {
  getUsers: () => JSON.parse(localStorage.getItem("tm_users") || "[]"),
  saveUsers: (users) => localStorage.setItem("tm_users", JSON.stringify(users)),

  getTasks: () => JSON.parse(localStorage.getItem("tm_tasks") || "[]"),
  saveTasks: (tasks) => localStorage.setItem("tm_tasks", JSON.stringify(tasks)),

  getSession: () => localStorage.getItem("tm_session"),
  saveSession: (token) => localStorage.setItem("tm_session", token),
  clearSession: () => localStorage.removeItem("tm_session"),
};
