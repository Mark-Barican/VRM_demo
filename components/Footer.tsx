import Link from 'next/link';
import Image from 'next/image';

const FOOTER_LINKS = {
  Shop: [
    { label: 'Full Face', href: '/shop' },
    { label: 'Open Face', href: '/shop' },
    { label: 'Modular', href: '/shop' },
    { label: 'Accessories', href: '/shop' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/about' },
    { label: 'Press', href: '/about' },
  ],
  Support: [
    { label: 'FAQ', href: '/contact' },
    { label: 'Warranty', href: '/contact' },
    { label: 'Returns', href: '/contact' },
    { label: 'Store Locator', href: '/contact' },
  ],
};

// Social icons as SVG
const SocialIcons: Record<string, React.ReactNode> = {
  Facebook: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  ),
  Instagram: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  ),
  TikTok: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.82a8.27 8.27 0 004.84 1.56V6.93a4.85 4.85 0 01-1.07-.24z" />
    </svg>
  ),
};

export default function Footer() {
  return (
    <footer className="bg-v-surface border-t border-v-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top: brand + links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <Image
                src="/vrm-logo.png"
                alt="VRM Manila"
                width={52}
                height={52}
                className="rounded-full opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <div>
                <p className="font-display text-2xl tracking-widest text-v-text leading-none">VRM<span className="text-v-accent">.</span></p>
                <p className="font-serif italic text-xs text-v-muted">Manila Helmets</p>
              </div>
            </Link>

            <p className="mt-5 text-v-muted text-sm leading-relaxed max-w-xs font-body">
              Crafting classic Filipino helmets since 1976. Built for the scooter soul — timeless style, uncompromising protection.
            </p>

            {/* Social links */}
            <div className="flex gap-2 mt-5">
              {Object.entries(SocialIcons).map(([label, icon]) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 border border-v-border flex items-center justify-center text-v-muted hover:border-v-accent hover:text-v-accent transition-colors duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="font-display tracking-widest text-v-accent text-sm mb-4 uppercase">
                {group}
              </h4>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-v-muted text-sm hover:text-v-accent transition-colors duration-200 font-body"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Vintage divider */}
        <div className="vintage-divider mb-6 text-v-accent text-sm font-serif italic">
          Since 1976
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-v-muted/60 font-body">
          <p>© {new Date().getFullYear()} VRM Manila Helmets. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-v-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-v-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
