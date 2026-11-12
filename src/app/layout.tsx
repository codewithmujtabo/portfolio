import type { Metadata, Viewport } from 'next';
import { Syne, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const syne = Syne({ variable: '--font-syne', subsets: ['latin'], weight: ['500', '600', '700', '800'] });
const manrope = Manrope({ variable: '--font-manrope', subsets: ['latin'] });
const jetbrains = JetBrains_Mono({ variable: '--font-jetbrains', subsets: ['latin'], weight: ['400', '500'] });

export const metadata: Metadata = {
  title: 'Mujtabo Saidamirzoda | Full Stack Developer',
  description:
    "Explore Mujtabo Saidamirzoda's web projects, development experience, and ways to get in touch.",
};

export const viewport: Viewport = {
  themeColor: '#111111',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${manrope.variable} ${jetbrains.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
