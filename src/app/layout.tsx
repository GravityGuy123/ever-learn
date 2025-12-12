import { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { AuthProvider } from "@/context/auth-context";
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from "@/components/ui/sonner";
import RightSidebar from "@/components/shared/RightSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EverLearn - Your Digital Learning Hub",
  description: "EverLearn is a comprehensive digital learning platform offering online courses, tutorials, and mentorship programs to help you acquire new skills anytime, anywhere.",
  
  // Standard meta tags
  keywords: [
    "E-Learning", "Online Courses", "Digital Learning", "Skill Development",
    "Mentorship", "EverLearn", "Tutorials", "Education Platform", "Learning Online"
  ],
  authors: [
    { name: "EverLearn Team", url: "https://everlearn.com" }
  ],
  creator: "EverLearn Team",
  publisher: "EverLearn Inc.",
  applicationName: "EverLearn",
  category: "Education",
  formatDetection: {
    email: true,
    address: true,
    telephone: true
  },

  // Verification tags
  verification: {
    google: "google-site-verification-code",
  },

  // Open Graph / Facebook
  openGraph: {
    title: "EverLearn - Your Digital Learning Hub",
    description: "Learn anytime, anywhere with online courses, tutorials, and mentorship programs from EverLearn.",
    url: "https://everlearn.com",
    siteName: "EverLearn",
    type: "website",
    images: [
      {
        url: "https://everlearn.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "EverLearn Platform Preview",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "EverLearn - Your Digital Learning Hub",
    description: "Learn anytime, anywhere with online courses, tutorials, and mentorship programs from EverLearn.",
    creator: "@EverLearn",
    images: ["https://everlearn.com/twitter-card.png"],
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Manifest
  manifest: "/site.webmanifest",

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Language
  alternates: {
    canonical: "https://everlearn.com",
    languages: {
      "en-US": "https://everlearn.com",
      "fr-FR": "https://everlearn.com/fr",
      "es-ES": "https://everlearn.com/es",
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900`}>
        <ThemeProvider attribute="class">
          <AuthProvider>
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
                      {/* Only render sidebar if user is logged in */}
                      <RightSidebar />
                    </div>

                    <footer className="w-full px-6">
                      <Footer />
                    </footer>
                </div>
              </div>
              {/* <Toaster /> */}
              <Toaster
                richColors
                toastOptions={{
                  duration: 3000,
                  className:
                    "px-4 py-3 rounded-xl shadow-lg border border-white/20 dark:border-gray-700 font-medium",

                  success: {
                    className:
                      "bg-gradient-to-r from-violet-600 to-indigo-600 text-white dark:from-violet-500 dark:to-indigo-500",
                  },

                  error: {
                    className:
                      "bg-red-600 dark:bg-red-500 text-white border-red-300/20 dark:border-red-400/20",
                  },

                  info: {
                    className:
                      "bg-blue-600 dark:bg-blue-500 text-white border-blue-300/20 dark:border-blue-400/20",
                  },

                  warning: {
                    className:
                      "bg-yellow-500 dark:bg-yellow-400 text-gray-900 dark:text-gray-900 border-yellow-300/20 dark:border-yellow-500/20",
                  },
                }}
              />
              <Analytics />
            </SidebarProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}