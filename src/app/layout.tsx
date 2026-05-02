import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoHindi = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-hindi",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: {
    default: "VoteBuddy - India Election Platform",
    template: "%s | VoteBuddy",
  },
  description:
    "Your comprehensive India Election Platform. Find your polling booth, explore state data, check ECI rules, view election results, and get AI-powered election assistance. Covering all 28 states, 8 UTs, 543 Lok Sabha seats.",
  keywords: [
    "India elections",
    "VoteBuddy",
    "Election Commission of India",
    "ECI",
    "Lok Sabha",
    "Vidhan Sabha",
    "voter registration",
    "polling booth finder",
    "election results",
    "Indian democracy",
  ],
  authors: [{ name: "VoteBuddy" }],
  creator: "VoteBuddy",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://votebuddy.in",
    siteName: "VoteBuddy",
    title: "VoteBuddy - India Election Platform",
    description:
      "Your comprehensive India Election Platform covering elections, states, booth finder, ECI rules, results & AI assistant.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VoteBuddy - India Election Platform",
    description: "Your comprehensive India Election Platform",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0e1a" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
};

import { LanguageProvider } from "@/components/providers/LanguageProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <html lang="en" className={`${inter.variable} ${notoHindi.variable}`}>
        <body className="font-sans antialiased min-h-screen flex flex-col transition-colors duration-300">
          <AuthProvider>
            <ThemeProvider>
              {/* Background decoration */}
              <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="bg-orb w-[500px] h-[500px] bg-saffron-500 -top-[10%] -left-[10%] opacity-[0.08] absolute animate-float" />
                <div className="bg-orb w-[400px] h-[400px] bg-india-green -bottom-[10%] -right-[10%] opacity-[0.06] absolute animate-float-delayed" />
                <div className="bg-orb w-[300px] h-[300px] bg-india-ashoka top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] absolute animate-float-slow" />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                  }}
                />
              </div>

              {/* App content */}
              <div className="relative z-10 flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <MobileNav />
              </div>
            </ThemeProvider>
          </AuthProvider>
        </body>
      </html>
    </LanguageProvider>
  );
}
