import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TasksProvider } from "./context/TasksContext";
import { router } from "./routes/router";

import "./index.css";

/*
  Layer 1: main.jsx
  → app-wide brain (auth, data, cache)
*/

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <TasksProvider>
        {/* Router Provider decides which page to show */}
        <RouterProvider router={router} />
      </TasksProvider>
    </AuthProvider>
  </StrictMode>,
);
