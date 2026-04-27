import App from "../App";
import AllTasks from "../pages/AllTasks";
import Today from "../pages/Today";
import Complete from "../pages/Complete";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <AllTasks /> },
      { path: "today", element: <Today /> },
      { path: "complete", element: <Complete /> },
    ],
  },
]);
