import type { Metadata } from "next";
import {
  Instrument_Serif,
  Courier_Prime,
  Caveat,
  Sora
} from "next/font/google";
import "./globals.css";
import { ThemeProviders } from "@/components/common/ThemeProviders";
import PageTransitionWrapper from "@/components/common/PageTransitionWrapper";
import Layout from "@/components/common/Layout";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Sora({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-mono",
  weight: ["400"],
  subsets: ["latin"],
});

const prime = Courier_Prime({
  variable: "--font-prime",
  weight: ["400"],
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sakthivel | Frontend developer",
  description:
    "Explore my portfolio featuring modern web experiences, interactive interfaces, creative projects, and frontend development expertise.",
  authors: [{ name: "Sakthivel" }],
  creator: "Sakthivel",
  publisher: "Sakthivel",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sakthivel | Frontend developer",
    description:
      "Explore my portfolio featuring modern web experiences, interactive interfaces, creative projects, and frontend development expertise.",
    url: "https://sakthi-portfolio-mauve.vercel.app/",
    type: "website",
    siteName: "Sakthivel-Portfolio",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Portfolio Banner",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sakthivel | Frontend developer",
    description:
      "Explore my portfolio featuring modern web experiences, interactive interfaces, creative projects, and frontend development expertise.",
    images: ["/images/og-image.webp"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${prime.variable} ${serif.variable} ${caveat.variable} h-full antialiased bg-background scrollbar-hide `}
    >
      <Analytics />
      <body>
        <ThemeProviders>
          <div className="noise-overlay"></div>
          <PageTransitionWrapper>
            <Layout>{children}</Layout>
          </PageTransitionWrapper>
        </ThemeProviders>
      </body>
    </html>
  );
}
