import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "For Tutu ♡",
  description: "A tiny, private love story for Sanjana.",
};
export const viewport: Viewport = { themeColor: "#21161d", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
