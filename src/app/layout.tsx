import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/redux-provider";
import RouteGuard from "@/components/route-guard";
import { ToastContainer } from "react-toastify";
import Header from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lista de Compras",
  description: "Gestiona los lugares donde compras productos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="flex flex-col min-h-screen bg-gray-100">
          <ReduxProvider>
            <ToastContainer position="bottom-center" stacked />
            <RouteGuard>
              <Header />
              {children}
            </RouteGuard>
          </ReduxProvider>
        </main>
      </body>
    </html >
  );
}
