import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const googleSans = localFont({
  src: "../fonts/GoogleSans.ttf", 
  display: "swap",
  variable: "--font-google-sans", 
});

export const metadata: Metadata = {
  title: "TSL Translatate",
  description: "A translation app built with Next.js, Tailwind CSS, and OpenAI's GPT-3.5 Turbo model. It supports text and speech translation between Thai and English.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${googleSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
