import { createBrowserRouter } from "react-router-dom";

import { AuthLayout } from "./pages/layouts/auth";

import { Login } from "./pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [{ path: "/login", element: <Login /> }],
  },
]);
