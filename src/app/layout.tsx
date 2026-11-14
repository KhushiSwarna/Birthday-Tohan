import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/fredoka";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy Birthday, Tohan Bhaiya!",
  description:
    "A little birthday magic for our favourite night owl. Make a wish, Tohan Bhaiya!",
  robots: { index: false, follow: false },
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Happy Birthday, Tohan Bhaiya!",
    description: "Close the laptop. Make a wish. Let’s celebrate!",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fff8eb",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
