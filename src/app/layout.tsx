'use client';

// app/layout.tsx
import "./globals.css";
import { ReactNode, useState } from "react";
import SideNav from "./components/SideNav";
import TopBar from "./components/TopBar";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-100">
        <SideNav open={sidebarOpen} />
        <div className="flex-1 flex flex-col">
          <TopBar toggleSidebar={() => setSidebarOpen((s) => !s)} />
          <main className="p-6 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
