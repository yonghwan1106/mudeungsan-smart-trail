import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "스마트 탐방로 - 무등산국립공원",
  description: "AI 기반 탐방객 분산 유도 시스템으로 혼잡 없는 무등산을 만듭니다",
  keywords: ["무등산", "국립공원", "스마트 탐방로", "AI", "혼잡도", "탐방객"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-forest min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
