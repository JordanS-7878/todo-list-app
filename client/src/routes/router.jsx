import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AllTasks from "../pages/AllTasks";
import Authentication from "../pages/Authentication";
import Completed from "../pages/Completed";
import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Today from "../pages/Today";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          { index: true, element: <AllTasks /> },
          { path: "today", element: <Today /> },
          { path: "completed", element: <Completed /> },
          { path: "profile", element: <Profile /> },
        ],
      },
    ],
  },
  {
    path: "/authentication",
    element: <Authentication />,
    children: [
      { path: "sign-up", element: <SignUp /> },
      { path: "sign-in", element: <SignIn /> },
    ],
  },
]);
