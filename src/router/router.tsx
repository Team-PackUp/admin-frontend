import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
