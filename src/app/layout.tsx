import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RecruitAI — AI-Powered Recruitment Platform",
  description:
    "Hire smarter, faster. RecruitAI uses advanced AI to score CVs, surface hidden talent, and streamline your entire recruitment pipeline.",
  keywords: "recruitment software, AI hiring, CV screening, applicant tracking",
  openGraph: {
    title: "RecruitAI — AI-Powered Recruitment Platform",
    description:
      "Hire smarter, faster. RecruitAI uses advanced AI to score CVs, surface hidden talent, and streamline your entire recruitment pipeline.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geist.variable} antialiased`}>{children}</body>
    </html>
  );
}
