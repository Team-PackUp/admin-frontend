import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { lazy } from "react";
import RequireAuth from "@/components/auth/RequireAuth";
import AdminLayout from "@/components/layout/AdminLayout";
import SystemSettingsPage from "@/pages/settings/SystemSettingsPage";
import UserManagementPage from "@/pages/users/UserManagermentPage";
import GuideManagementPage from "@/pages/guides/GuideManagementPage";

const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));
const NotFoundPage = () => <div>404 - 페이지를 찾을 수 없습니다</div>;

const ProtectedAdminLayout = () => (
  <RequireAuth>
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  </RequireAuth>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedAdminLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/settings",
        element: <SystemSettingsPage />,
      },
      {
        path: "/users",
        element: <UserManagementPage />,
      },
      {
        path: "/guides",
        element: <GuideManagementPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
