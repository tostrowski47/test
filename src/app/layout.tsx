import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Cart from '@/components/sections/Cart';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bella Farina - Pizzeria, Piekarnia, Ciastkarnia | Warszawa',
  description: 'Najlepsza pizza, świeże pieczywo i domowe ciasta w Warszawie. Zamów online lub odwiedź nas przy ul. Dobra 21. Dostawa i odbiór osobisty.',
  keywords: 'pizza warszawa, piekarnia warszawa, ciastkarnia, dostawa jedzenia, bella farina, dobra 21',
  authors: [{ name: 'Bella Farina' }],
  creator: 'Bella Farina',
  publisher: 'Bella Farina',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Bella Farina - Pizzeria, Piekarnia, Ciastkarnia',
    description: 'Najlepsza pizza, świeże pieczywo i domowe ciasta w Warszawie. Zamów online lub odwiedź nas przy ul. Dobra 21.',
    url: '/',
    siteName: 'Bella Farina',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bella Farina - Pizzeria, Piekarnia, Ciastkarnia',
      },
    ],
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bella Farina - Pizzeria, Piekarnia, Ciastkarnia',
    description: 'Najlepsza pizza, świeże pieczywo i domowe ciasta w Warszawie.',
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Cart />
      </body>
    </html>
  );
}