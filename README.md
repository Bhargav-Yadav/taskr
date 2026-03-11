# ◈ TASKR — Task Management App

A clean, full-featured task management web app built with React.

## Features
- 🔐 User registration & login (with password hashing + token sessions)
- ✅ Full task CRUD — create, read, update, delete
- 🎯 Priority levels — High / Medium / Low
- 📅 Deadline tracking — overdue, due today, upcoming
- 🏷️ Task categories
- 🔍 Search & filter tasks
- 📊 Dashboard with pie chart & progress bar

## Folder Structure

```
src/
├── App.js                  # Root component
├── index.js                # Entry point
│
├── context/
│   └── AuthContext.js      # Auth state (user, login, logout)
│
├── hooks/
│   ├── useTasks.js         # Task CRUD logic
│   └── useDeadline.js      # Deadline status helpers
│
├── services/
│   ├── auth.js             # Register/login/logout functions
│   └── storage.js          # localStorage abstraction layer
│
├── components/
│   ├── styles.js           # Shared styles & constants
│   ├── Header.js           # Top navigation bar
│   ├── Dashboard.js        # Stats cards + pie chart
│   ├── TaskCard.js         # Individual task row
│   ├── TaskModal.js        # Create/edit task form
│   └── TaskControls.js     # Search, filter, sort bar
│
└── pages/
    ├── AuthPage.js         # Login & register page
    └── DashboardPage.js    # Main app page
```

## Getting Started

```bash
npm install
npm start
```

## Upgrading to Full-Stack

The `src/services/storage.js` file is the only thing you need to replace.
Swap the `localStorage` calls with `fetch()` calls to your Express API:

```js
// Before (localStorage)
getTasks: () => JSON.parse(localStorage.getItem("tm_tasks") || "[]")

// After (real API)
getTasks: async () => {
  const res = await fetch("/api/tasks", { headers: { Authorization: `Bearer ${token}` } });
  return res.json();
}
```

## Deploy

| Layer    | Platform       |
|----------|----------------|
| Frontend | Vercel/Netlify |
| Backend  | Render         |
| Database | MongoDB Atlas  |
