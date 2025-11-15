import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/providers/ThemeProvider";
import { PackageManagerProvider } from "@/contexts/PackageManagerContext";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleProvider from "@/components/GoogleProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "fine-tune.app",
  description: "",
  keywords: [
    "fine-tune.app",
  ],
  metadataBase: new URL("https://fine-tune.app"),
  alternates: {
    canonical: "https://fine-tune.app",
  },
  openGraph: {
    title: "fine-tune.app",
    description: "",
    url: "https://fine-tune.app",
    siteName: "fine-tune.app",
    type: "website",
    images: [
      {
        url: "https://fine-tune.app/api/og",
        width: 1200,
        height: 630,
        alt: "fine-tune.app Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "fine-tune.app",
    description: "",
    images: [
      {
        url: "https://fine-tune.app/api/og",
        width: 1200,
        height: 630,
        alt: "fine-tune.app Logo",
      },
    ],
    creator: "@srijanbaniyal",
  },
  icons: {
    icon: [
      { url: "./favicon.ico", sizes: "any" },
      {
        url: "/favicons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/favicons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  appleWebApp: {
    title: "fine-tune.app",
    statusBarStyle: "default",
    capable: true,
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GoogleProvider>
          <ThemeProvider>
            <PackageManagerProvider>
              {children}
            </PackageManagerProvider>
          </ThemeProvider>
        </GoogleProvider>
        </body>
    </html>
  );
}
