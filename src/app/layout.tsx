import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/header";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Baterías GMA",
  description: "Baterías para carro por Grupo Miscelanéa Automotriz S.A.S ",
  icons: {
    icon: "/logotipoGMA.png",
    apple: "/logotipoGMA.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        outfit.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
