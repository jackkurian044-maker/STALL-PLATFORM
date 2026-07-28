import "./globals.css";

export const metadata = {
  title: "Stall",
  description: "Discover Local Businesses"
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
