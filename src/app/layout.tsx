import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppInstallPrompt } from "../components/AppInstallPrompt";
import { MobileNav } from "../components/MobileNav";

export const metadata: Metadata = {
  title: "DragonMind Mahjong",
  description: "Learn, analyze, and master every Mahjong variant.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DragonMind"
  },
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/icon.svg"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#071421"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <MobileNav />
        <AppInstallPrompt />
      </body>
    </html>
  );
}
