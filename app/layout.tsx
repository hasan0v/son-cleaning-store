import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/layout/Providers";
import { Toaster } from "@/components/ui/sonner";
import { organizationSchema, localBusinessSchema, websiteSchema } from "@/lib/schema";

// latin-ext carries the Azerbaijani letters (ə, ğ, ı, ş); without it they fall back to a system font
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b1f33",
  colorScheme: "light",
};

export const metadata: Metadata = {
  title: "SON Təmizlik Məhsulları | Qabyuyan Maye, Ağardıcı, Təmizlik Vasitələri Gəncə",
  description: "Gəncədə keyfiyyətli təmizlik məhsulları - qabyuyan maye, ağardıcı, maye sabun, təmizlik vasitələri. SON keyfiyyəti ilə topdan və pərakəndə satış. Sürətli çatdırılma və ucuz qiymətlər.",
  keywords: "təmizlik məhsulları, qabyuyan maye, ağardıcı, maye sabun, təmizlik vasitələri, təmizlik, temizlik, temizlik vasiteleri, temizlik vasitələri, təmizlik kimyəvi məhsulları, gəncə təmizlik, son təmizlik, xlor, duru ağardıcı, toz ağardıcı, ev təmizlik məhsulları, professional təmizlik, ucuz təmizlik məhsulları, keyfiyyətli təmizlik",
  authors: [{ name: "SON Təmizlik Məhsulları" }],
  creator: "SON Təmizlik Məhsulları",
  publisher: "SON Təmizlik Məhsulları",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://son-temizlik.com'),
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/brand/icon-256.png", type: "image/png", sizes: "256x256" }],
    apple: "/brand/apple-touch-icon.png",
  },
  openGraph: {
    type: 'website',
    locale: 'az_AZ',
    siteName: 'SON Təmizlik Məhsulları',
    title: 'SON - Təmizlik Məhsulları | Gəncə',
    description: 'Keyfiyyətli təmizlik məhsulları - qabyuyan maye, ağardıcı, təmizlik vasitələri. Gəncədə topdan və pərakəndə satış.',
    url: 'https://son-temizlik.com',
    images: [
      {
        url: '/brand/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SON Təmizlik Məhsulları Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SON Təmizlik Məhsulları | Gəncə',
    description: 'Keyfiyyətli təmizlik məhsulları - qabyuyan maye, ağardıcı, təmizlik vasitələri. Topdan və pərakəndə satış.',
    images: ['/brand/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://son-temizlik.com',
  },
  category: 'Təmizlik Məhsulları',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" className={`${inter.variable} ${jakarta.variable}`} data-scroll-behavior="smooth">
      <head>
        <link rel="dns-prefetch" href="https://api.emailjs.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, localBusinessSchema, websiteSchema]),
          }}
        />
      </head>
      <body className="min-h-dvh bg-white text-brand-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:shadow-lift"
        >
          Əsas məzmuna keç
        </a>
        <Providers>
          <Navbar />
          <main id="main" className="min-h-[60vh]">{children}</main>
          <Footer />
        </Providers>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
