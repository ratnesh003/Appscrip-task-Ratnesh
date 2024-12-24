import type { Metadata } from "next";
import "./globals.css";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Ecommerce Web App", // all example SEO practice
  description: "The one stop solution for all your shopping needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AdBanner />
        {children}
      </body>
    </html>
  );
}
