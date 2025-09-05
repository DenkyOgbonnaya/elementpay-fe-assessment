import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import RootProviders from "./Provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ElementPay Assessment - Dennis Ogbonnaya",
  description:
    "A simple app that allows users create orders using their crypto wallet",
  keywords: ["ElementPay", "Crypot Payment"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} antialiased`}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
