import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RecruitAI — AI-Powered Recruitment Platform",
  description:
    "Stop drowning in CVs. Let AI surface your top candidates instantly.",
  keywords: "recruitment software, AI hiring, CV screening, applicant tracking",
  openGraph: {
    title: "RecruitAI — AI-Powered Recruitment Platform",
    description:
      "Stop drowning in CVs. Let AI surface your top candidates instantly.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${manrope.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
