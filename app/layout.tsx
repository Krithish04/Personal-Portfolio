import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import NetworkBackground from "@/components/NetworkBackground";
import CursorGlow from "@/components/CursorGlow";

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jbmono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Krithish Suvarna — Full-Stack Developer & Automation Specialist",
  description:
    "Portfolio of Krithish Ravindra Suvarna — Full-Stack Developer & Automation Specialist. MERN stack, DevOps, CI/CD, and API-driven automation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jbmono.variable} ${inter.variable}`}>
      <body className="font-sans overflow-x-hidden">
        <NetworkBackground />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
