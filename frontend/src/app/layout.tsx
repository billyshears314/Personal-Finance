import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Personal Finance",
  description: "A personal finance application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={publicSans.variable}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        ></meta>
      </head>
      {/* <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > */}
      <body className="antialiased">
        <div className="flex pb-[50px] lg:pb-0">
          <Sidebar />
          <div className="w-full p-4 lg:p-8 lg:ml-64">{children}</div>
        </div>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
