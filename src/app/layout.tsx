import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SnackbarContainer } from "@/components/snackbars/SnackbarContainer";

const googleSans = localFont({
  src: "../fonts/GoogleSans.ttf", 
  display: "swap",
  variable: "--font-google-sans", 
});

export const metadata: Metadata = {
  title: "TSL Translatate",
  description: "A translation app built with Next.js, Tailwind CSS, mT5 and Gemini 2.5 Pro model. It supports text and speech translation between Thai and English.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${googleSans.className} antialiased select-none`}
      >
        {children}
        <SnackbarContainer />
      </body>
    </html>
  );
}
