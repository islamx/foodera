import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Beiruti } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const beiruti = Beiruti({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-beiruti",
});

export const metadata: Metadata = {
  title: "Foodera - Store Management System",
  description: "A modern, responsive web application for managing store types and categories with a beautiful Arabic RTL interface. Built with Next.js, React, and TypeScript.",
  keywords: ["store management", "food delivery", "restaurant management", "Arabic RTL", "Next.js", "React", "TypeScript"],
  authors: [{ name: "Islam Abdelzaer" }],
  creator: "Islam Abdelzaer",
  publisher: "Foodera",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://typika.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Foodera - Store Management System",
    description: "A modern, responsive web application for managing store types and categories with a beautiful Arabic RTL interface.",
    url: "https://typika.vercel.app",
    siteName: "Foodera",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Foodera Store Management System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Foodera - Store Management System",
    description: "A modern, responsive web application for managing store types and categories with a beautiful Arabic RTL interface.",
    images: ["/og-image.png"],
    creator: "@islamz",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${beiruti.variable} font-sans antialiased`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
