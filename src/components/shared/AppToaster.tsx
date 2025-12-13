"use client";
import { toast, Toaster } from "sonner";
import { useTheme } from "next-themes";

export default function AppToaster() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const successToast = (message: string) => {
    toast(message, {
      className:
        "text-white px-4 py-3 rounded-xl shadow-lg border border-white/20 font-medium",
      style: {
        backgroundColor: isDark ? "#8b5cf6" : "#7c3aed",
      },
    });
  };

  const errorToast = (message: string) => {
    toast(message, {
      className:
        "text-white px-4 py-3 rounded-xl shadow-lg border border-white/20 font-medium",
      style: {
        backgroundColor: isDark ? "#ef4444" : "#f87171",
      },
    });
  };

  const warningToast = (message: string) => {
    toast(message, {
      className: "text-white px-4 py-3 rounded-xl shadow-lg border border-white/20 font-medium",
      style: {
        backgroundColor: isDark ? "#facc15" : "#eab308",
      }
    });
  };

  const infoToast = (message: string) => {
    toast(message, {
      className: "text-white px-4 py-3 rounded-xl shadow-lg border border-white/20 font-medium",
      style: {
        backgroundColor: isDark ? "#3b82f6" : "#2563eb",}
    });
  };

  return <Toaster toastOptions={{ duration: 3000 }} />;
}
