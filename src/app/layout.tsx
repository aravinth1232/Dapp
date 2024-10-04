import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast'; 
// import Toaster from "../app/components/Toaster"

export const metadata: Metadata = {
  title: "Dapp",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster 
        position="top-right"
        />
        {children}
      </body>
    </html>
  );
}
