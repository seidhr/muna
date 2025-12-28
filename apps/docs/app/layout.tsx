import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import { Noto_Sans_Runic } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

const notoSansRunic = Noto_Sans_Runic({
  subsets: ['runic', 'latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'Muna | ᛗᚢᚾᚨ',
  description: 'Muna (remember) is a Sanity Studio with a data schema for describing and presenting cultural heritage objects.',
  openGraph: {
    title: 'Muna | ᛗᚢᚾᚨ',
    description: 'Muna (remember) is a Sanity Studio with a data schema for describing and presenting cultural heritage objects.',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`flex flex-col min-h-screen ${notoSansRunic.className}`}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

