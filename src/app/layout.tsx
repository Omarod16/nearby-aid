import type { Metadata, Viewport } from 'next';
import './globals.css';
import { TextSizeProvider } from '@/components/accessibility/TextSizeContext';

export const metadata: Metadata = {
  title: 'NearbyAid | Find Essential UK Healthcare Services Near You',
  description:
    'Quickly find your nearest verified Hospital & A&E, Pharmacy, GP surgery, Dentist, and Urgent Treatment Centre (UTC) across the UK. Fast, clear, and accessible.',
  keywords: [
    'NearbyAid',
    'find nearest A&E',
    'urgent treatment centre near me',
    'late night pharmacy',
    'find GP surgery',
    'emergency dentist near me',
    'UK healthcare finder',
  ],
  authors: [{ name: 'NearbyAid' }],
  metadataBase: new URL('https://nearbyaid.co.uk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'NearbyAid | Find Essential UK Services Near You',
    description:
      'Simple, high-contrast UK service locator for A&E, Pharmacies, GPs, Dentists, and Urgent Treatment Centres.',
    url: 'https://nearbyaid.co.uk',
    siteName: 'NearbyAid',
    locale: 'en_GB',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0284c7',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-text-size="normal">
      <body className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/40 via-slate-50/30 to-white text-slate-900 antialiased selection:bg-blue-200">
        <TextSizeProvider>{children}</TextSizeProvider>
      </body>
    </html>
  );
}
