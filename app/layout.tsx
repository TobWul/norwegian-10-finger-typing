import type { Metadata } from "next";
import { Space_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const mono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: "400",
});

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Type trainer",
  description: "Learn how to type with 10 fingers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mono.variable} ${sans.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
