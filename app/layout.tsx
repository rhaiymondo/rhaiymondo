import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { WinkCursor } from "wink-cursor";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Rhaiymondo — AI version of Rhaymondo",
  description:
    "Rhaiymondo is the AI distillation of Rhaymondo — a senior Next.js engineer at Bol.com. Built from real patterns in testing, DX, and AI-native development.",
  metadataBase: new URL("https://rhaiymondo.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rhaiymondo — AI version of Rhaymondo",
    description:
      "Rhaiymondo is the AI distillation of Rhaymondo — a senior Next.js engineer at Bol.com. Built from real patterns in testing, DX, and AI-native development.",
    url: "https://rhaiymondo.com",
    siteName: "Rhaiymondo",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rhaiymondo — AI version of Rhaymondo",
    description:
      "Rhaiymondo is the AI distillation of Rhaymondo — a senior Next.js engineer at Bol.com. Built from real patterns in testing, DX, and AI-native development.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={process.env.NEXT_PUBLIC_SITE === "RHAYMONDO" ? "" : "dark"}>
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        <WinkCursor />
        {children}
      </body>
    </html>
  );
}
