import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
const bahnschrift = localFont({
  src: "./fonts/bahnschrift.ttf",
  variable: "--font-bahnschrift",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Utopia Skill Tree Builder - Next.js",
  description: "Create your own skill trees for Utopia TTRPG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${bahnschrift.variable}`}>
        {children}
      </body>
    </html>
  );
}
