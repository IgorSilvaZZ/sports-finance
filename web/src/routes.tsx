import { createBrowserRouter } from "react-router-dom";

import { AuthLayout } from "./pages/layouts/auth";

import { Login } from "./pages/Login";
import Register from "./pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);
