import { createBrowserRouter } from "react-router-dom";

import { AuthLayout } from "../pages/layouts/auth";

import Register from "../pages/Register";
import Events from "../pages/Events";
import Login from "../pages/Login";
import Main from "../pages/layouts/main";
import Dashboard from "../pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/events", element: <Events /> },
      { path: "/event/:eventId", element: <Dashboard /> },
    ],
  },
]);
