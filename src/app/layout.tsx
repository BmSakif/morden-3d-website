import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SSR X | Pure Sound",
  description: "Experience the ultimate in audio engineering with SSR X Headphones.",
  openGraph: {
    title: "SSR X | Pure Sound",
    description: "Experience the ultimate in audio engineering with SSR X Headphones.",
    url: "https://ssr-x.com",
    siteName: "SSR X",
    images: [
      {
        url: "/frames/ezgif-frame-001.jpg",
        width: 1200,
        height: 630,
        alt: "SSR X Headphones Explosion",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SSR X | Pure Sound",
    description: "Experience the ultimate in audio engineering with SSR X Headphones.",
    images: ["/frames/ezgif-frame-001.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
