import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
