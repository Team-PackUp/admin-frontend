// src/router/router.tsx
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
      // 여기에 추가 페이지들 확장 가능
      // { path: "/users", element: <UsersPage /> }
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
