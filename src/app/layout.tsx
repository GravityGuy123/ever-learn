import { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Header";
import StatisticsCard from "@/components/StatisticsCard";
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900`}
      >
        <ThemeProvider attribute="class">
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              {/* Left Sidebar */}
              <aside className="hidden md:block md:fixed md:top-0 md:left-0 md:h-screen md:w-[260px] bg-gray-100 dark:bg-gray-850 md:shadow-lg md:z-30 md:overflow-y-auto">
                <AppSidebar />
              </aside>

              {/* Main Content */}
              <div className="flex flex-col flex-1 w-full md:ml-[260px] min-w-0">
                <div className="bg-gray-50 dark:bg-gray-900 w-full sticky top-0 z-50 shadow px-6 mt-4">
                  <Header />
                </div>
                <div className="flex flex-col lg:flex-row flex-1 min-w-0">
                  <main className="flex-1 px-6 py-8 lg:pr-8">{children}</main>
                  <aside className="w-full lg:w-[320px] lg:flex-shrink-0 bg-transparent order-first lg:order-last">
                    <div className="px-6 py-8 lg:py-8 lg:px-0 lg:pl-6 lg:pr-6 lg:sticky lg:top-24">
                      <div className="mb-4">
                        <StatisticsCard />
                      </div>
                      <MentorList />
                    </div>
                  </aside>
                </div>

                <footer className="w-full px-6">
                  <Footer />
                </footer>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}