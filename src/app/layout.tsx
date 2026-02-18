import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://calefones-loja.vercel.app'),
  title: {
    default: "Calefones Loja | Venta y Servicio Técnico en Loja, Ecuador",
    template: "%s | Calefones Loja"
  },
  description: "Especialistas en venta, instalación y reparación de calefones en Loja. Repuestos originales Instamatic, YANG y Bosch. El mejor servicio técnico garantizado en el sur del Ecuador.",
  keywords: [
    "calefones loja",
    "servicio técnico calefones loja",
    "reparación de calefones loja",
    "instamatic loja",
    "yang loja",
    "venta de calefones loja",
    "agua caliente loja",
    "gasfitería loja"
  ],
  authors: [{ name: "Cesar Reyes" }],
  creator: "Cesar Reyes",
  publisher: "Calefones Loja",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/Logo.jpg', sizes: '16x16', type: 'image/jpeg' },
      { url: '/Logo.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/Logo.jpg', sizes: '192x192', type: 'image/jpeg' },
      { url: '/Logo.jpg', sizes: '512x512', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/Logo.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "Calefones Loja | Venta y Servicio Técnico Garantizado",
    description: "Expertos en ingeniería térmica para tu hogar. Venta e instalación de las mejores marcas de calefones en Loja.",
    url: 'https://calefones-loja.vercel.app',
    siteName: 'Calefones Loja',
    images: [
      {
        url: 'https://calefones-loja.vercel.app/Logo.jpg',
        width: 800,
        height: 600,
        alt: 'Calefones Loja - Ingeniería Térmica',
      },
    ],
    locale: 'es_EC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Calefones Loja | Los mejores calefones en Loja",
    description: "Servicio técnico y venta de calefones con garantía total en Loja, Ecuador.",
    images: ['https://calefones-loja.vercel.app/Logo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden w-full`}
      >
        {children}
      </body>
    </html>
  );
}
