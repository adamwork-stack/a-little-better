import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Chatbot from "@/components/Chatbot/Chatbot";
import DisableDevTools from "@/components/Protection/DisableDevTools";
import MouseGasEffect from "@/components/Effects/MouseGasEffect";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "arial"]
});

export const metadata: Metadata = {
  title: "A Little Better",
  description: "We create pleaseant experiences for your customers.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <DisableDevTools />
        <MouseGasEffect />
        <Navbar />
        {children}
        <Chatbot />
        <Analytics />
      </body>
    </html>
  );
}
