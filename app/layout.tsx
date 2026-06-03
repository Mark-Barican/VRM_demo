import type { Metadata } from 'next';
import '../styles/globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'VRM Manila Helmets — Ride With Honor Since 1976',
  description:
    'Classic Filipino helmets since 1976. Retro scooter helmets handcrafted for the Filipino rider. ECE & DOT certified.',
  keywords: ['motorcycle helmet', 'Filipino helmet', 'VRM Manila', 'retro helmet', 'scooter helmet Philippines', 'vintage helmet'],
  openGraph: {
    title: 'VRM Manila Helmets — Since 1976',
    description: 'Classic Filipino helmets for the retro scooter rider.',
    siteName: 'VRM Manila',
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
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
