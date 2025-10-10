import type { Metadata } from 'next';

import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import '@/common/styles/globals.css';

const plus_jakarta_sans = Plus_Jakarta_Sans({ subsets: ['latin'], preload: true });
const inter = Inter({ subsets: ['latin'], preload: true });

import { PipecatProvider } from '@/providers/PipecatProvider';

export const metadata: Metadata = {
  title: 'Alex AI',
  description: 'Coding Challenge',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plus_jakarta_sans.className} ${inter.className}`} suppressHydrationWarning={true}>
        <PipecatProvider>{children}</PipecatProvider>
      </body>
    </html>
  );
}
