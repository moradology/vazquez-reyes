import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vazquez–Reyes Family History",
  description:
    "Pastora Reyes, recorded as Cruz in official documents, and Rafael Vázquez: from eastern Puerto Rico to East Harlem, New York.",
  openGraph: {
    title: "Vazquez–Reyes Family History",
    description:
      "The Vazquez-Reyes family from eastern Puerto Rico to East Harlem, New York.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1659,
        height: 948,
        alt: "Vazquez-Reyes: From Puerto Rico to Manhattan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vazquez–Reyes Family History",
    description:
      "Family records for Pastora or Cruz Reyes and Rafael Vázquez.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
