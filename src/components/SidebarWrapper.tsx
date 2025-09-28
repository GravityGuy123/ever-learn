"use client";

import { useState, createContext, useContext } from "react";
import { AppSidebar } from "./app-sidebar";

const SidebarContext = createContext({
  open: false,
  toggle: () => {},
  close: () => {},
});

export function useSidebar() {
  return useContext(SidebarContext);
}

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);
  const close = () => setOpen(false);

  return (
    <SidebarContext.Provider value={{ open, toggle, close }}>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block md:fixed md:top-0 md:left-0 md:h-screen md:w-[260px] md:bg-[#F8F9FC] md:dark:bg-[#1E1E2D] md:shadow-lg md:z-30 md:overflow-y-auto">
        <AppSidebar isOpen={false} onClose={() => {}} />
      </aside>

      {/* Mobile Sidebar Drawer */}
      <AppSidebar isOpen={open} onClose={close} />

      {children}
    </SidebarContext.Provider>
  );
}