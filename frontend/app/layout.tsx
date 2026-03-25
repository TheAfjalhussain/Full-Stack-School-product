import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rkmissionnwd.com";
const siteName = "R.K. Mission Public School";
const siteDescription =
  "R.K. Mission Public School in Nawada offers quality CBSE-style education, strong discipline, modern facilities, and holistic development for students from Nursery to Class 10.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Best School in Nawada`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "R.K. Mission Public School",
    "school in Nawada",
    "best school in Nawada",
    "CBSE school Nawada",
    "English medium school Nawada",
    "Nursery to 10th school",
    "school admission Nawada",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName,
    title: `${siteName} | Best School in Nawada`,
    description: siteDescription,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteName} - Nawada`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Best School in Nawada`,
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  category: "education",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const schoolSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rajendra Nagar, Near Bhagat Singh Chowk",
      addressLocality: "Nawada",
      addressRegion: "Bihar",
      postalCode: "805110",
      addressCountry: "IN",
    },
    email: "rkmissionnwd@gmail.com",
    areaServed: {
      "@type": "City",
      name: "Nawada",
    },
    sameAs: [
      // Add your real social links here later
      // "https://www.facebook.com/...",
      // "https://www.instagram.com/...",
      // "https://www.youtube.com/...",
    ],
  };

  return (
    <html lang="en-IN" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-white font-inter text-slate-900 antialiased">
        <Script
          id="school-structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolSchema) }}
        />
        <Navigation />
        <main id="main-content" className="min-h-[70vh]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}