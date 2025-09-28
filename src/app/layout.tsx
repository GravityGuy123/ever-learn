import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Header";
import StatisticCard from "@/components/StatisticCard";
import MentorList from "@/components/MentorList";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EverLearn",
  description: "A digital learning platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F8F9FC] dark:bg-[#1B1C30]`}
      >
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            {/* Sidebar (desktop) */}
            <aside className="hidden md:block md:fixed md:top-0 md:left-0 md:h-screen md:w-[260px] md:bg-[#F8F9FC] md:dark:bg-[#1E1E2D] md:shadow-lg md:z-30 md:overflow-y-auto">
              <AppSidebar />
            </aside>

            {/* Main Content */}
            <div className="flex flex-col flex-1 w-full md:ml-[260px] min-w-0">
              <div className="w-full px-6 mt-4">
                <Header />
              </div>

              <div className="flex flex-1 min-w-0">
                <main className="flex-1 overflow-y-auto px-6 py-8">{children}</main>

                {/* Right sidebar desktop */}
                <aside className="hidden lg:block w-full max-w-sm overflow-y-auto px-6 py-8 bg-transparent">
                  <StatisticCard />
                  <MentorList />
                </aside>
              </div>

              <footer className="w-full px-6">
                <Footer />
              </footer>
            </div>
          </div>

          {/* Right sidebar on mobile (below main) */}
          <div className="lg:hidden px-6 py-8">
            <StatisticCard />
            <MentorList />
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
