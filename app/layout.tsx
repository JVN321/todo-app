import type { Metadata } from "next";
import { UserProvider } from "./context/UserContext";
import { EditingProvider } from "./context/EditingContext";
import localFont from "next/font/local";
import "../app/globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Basic Todo List app with mongodb databasea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <EditingProvider>
          <UserProvider>{children}</UserProvider>
        </EditingProvider>
      </body>
    </html>
  );
}
