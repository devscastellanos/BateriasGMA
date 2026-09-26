import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SITE_URL } from "@/lib/site";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

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
  // Sin esto, las URLs canonicas y las de Open Graph que definan las paginas
  // individuales salen relativas y no sirven para compartir ni para posicionar.
  metadataBase: new URL(SITE_URL),
  title: "Baterías GMA",
  description:
    "Baterías para carro por Grupo Miscelánea Automotriz S.A.S.",
  icons: {
    icon: "/logotipo-gma.png",
    apple: "/logotipo-gma.png",
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
        <Footer />
      </body>
    </html>
  );
}
