// src/components/layout/AdminLayout.tsx
import Header from "./Header";
import type { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-muted">
      <Header />
      <main className="px-6 py-10 max-w-screen-xl mx-auto">{children}</main>
    </div>
  );
}
