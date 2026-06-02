import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Influencer Finder",
  description: "키워드로 원하는 채널을 탐색해보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <header className="absolute top-0 right-4 p-6 flex gap-8 z-50">
        <Link
          href="/login"
          className="text-[#7F50A3] font-semibold hover:text-[#7F50A3] transition-colors"
        >
          로그인
        </Link>
        <Link
          href="/signup"
          className="text-[#7F50A3] font-semibold hover:text-[#7F50A3] transition-colors"
        >
          회원가입
        </Link>
      </header>
      {children}
    </body>
  </html>
  );
}
