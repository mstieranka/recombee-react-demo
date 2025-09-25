import type { Metadata } from "next";
import { JetBrains_Mono, Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  weight: "variable",
  variable: "--font-rubik",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  weight: "variable",
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recombee React Demo",
  description: "A demo app showcasing Recombee recommendations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} ${jetBrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
