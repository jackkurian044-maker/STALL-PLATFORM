import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "STALL",
  description: "Discover Local Businesses Around You",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
