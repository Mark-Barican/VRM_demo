import type { Metadata } from 'next';
import '../styles/globals.css';
import { CartProvider } from '@/components/CartProvider';
import CartDrawer from '@/components/CartDrawer';
import AnnouncementBar from '@/components/AnnouncementBar';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Vintage Rider Manila (VRM 1976) — Home of Classics & Modern Retro',
  description:
    'Vintage Rider Manila is a proudly Filipino helmet & moto-gear brand. Shock-resistant ABS, TIS-rated (≈ECE), with a valid ICC sticker — from the vintage VRM 1976 line to the modern VRUM range.',
  keywords: ['Vintage Rider Manila', 'VRM 1976', 'VRUM', 'Filipino helmet', 'motorcycle helmet Philippines', 'retro helmet', 'café racer helmet', 'scooter helmet', 'TIS rated helmet'],
  openGraph: {
    title: 'Vintage Rider Manila — Home of Classics & Modern Retro',
    description: 'Proudly Filipino helmets & moto-gear for the classic, café-racer, scooter and e-bike rider.',
    siteName: 'Vintage Rider Manila',
    locale: 'en_PH',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent FOUC: apply saved theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('vrm-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(t!=='light'&&d)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-v-bg text-v-text font-body antialiased">
        <CartProvider>
          <AnnouncementBar />
          <Nav />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
