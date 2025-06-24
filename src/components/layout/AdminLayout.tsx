import Header from "./Header";
import Footer from "./Footer";
import type { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <Header />
      <main className="flex-1 px-6 py-10 max-w-screen-xl mx-auto w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
