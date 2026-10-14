import type { Metadata } from "next";
import { Cormorant_Garamond, Dancing_Script, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "A Little Light Beside Me 🌙🕯️",
  description: "Not every light is meant to become our moon. A quiet, romantic story written for you.",
  openGraph: {
    title: "A Little Light Beside Me 🌙🕯️",
    description: "Not every light is meant to become our moon. A quiet, romantic story written for you.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dancingScript.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0B1026] text-[#DCE5F2] selection:bg-[#FFD58A]/30 selection:text-[#FFF7E8]">
        {children}
      </body>
    </html>
  );
}
