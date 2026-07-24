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
    "The documented journey of Cruz Reyes and Rafael Vázquez, from Humacao to Manhattan and Linden.",
  openGraph: {
    title: "Vazquez–Reyes Family History",
    description:
      "Two Puerto Rican lives, a 1941 Manhattan marriage, and a shared resting place in Linden, New Jersey.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1659,
        height: 948,
        alt: "Vazquez-Reyes: From Humacao to Manhattan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vazquez–Reyes Family History",
    description:
      "From Humacao to Manhattan: a documented family history in progress.",
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
