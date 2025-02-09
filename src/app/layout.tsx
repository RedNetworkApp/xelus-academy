import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LearningTips from '@/components/tips/LearningTips';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xelus Academy",
  description: "Learn anything, master everything",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-gray-50">
      <body className={`${inter.className} text-gray-900`}>
        <Header />
        <main className="min-h-screen pt-16 bg-gray-50">
          {children}
        </main>
        <LearningTips />
        <Footer />
      </body>
    </html>
  );
}
