import "./globals.css";
import type { Metadata } from "next";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://stallwale.in"),
  title: {
    default: "STall — neighbourhood businesses, one search away",
    template: "%s | STall",
  },
  description:
    "STall is a neighbourhood-first technology platform for discovering local businesses, exploring business profiles and helping nearby businesses get found.",
  alternates: {
    canonical: "https://stallwale.in",
  },
  openGraph: {
    title: "STall — neighbourhood businesses, one search away",
    description:
      "Discover local businesses and help neighbourhood businesses get found.",
    url: "https://stallwale.in",
    siteName: "STall",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500;600;700&family=Work+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
