'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { animateMobileNav } from '@/lib/animations';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;
    animateMobileNav(menu, menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-v-bg/95 backdrop-blur-md border-b border-v-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="VRM Manila Home" className="flex items-center gap-2 group">
          <Image
            src="/vrm-logo.png"
            alt="VRM Manila Helmets"
            width={44}
            height={44}
            className="rounded-full opacity-90 group-hover:opacity-100 transition-opacity"
            priority
          />
          <span className="hidden sm:block font-display text-xl tracking-widest text-v-text group-hover:text-v-accent transition-colors duration-200">
            VRM<span className="text-v-accent">.</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-v-accent relative group ${
                  pathname === href ? 'text-v-accent' : 'text-v-text2'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-v-accent transition-all duration-200 ${
                    pathname === href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Theme toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/shop"
            className="btn-vintage text-sm"
          >
            Shop Now
          </Link>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="w-8 h-8 flex flex-col justify-center gap-1.5"
          >
            <span
              className={`block h-0.5 bg-v-text transition-all duration-300 origin-center ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block h-0.5 bg-v-text transition-all duration-300 ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 bg-v-text transition-all duration-300 origin-center ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="bg-v-bg/98 border-t border-v-border px-6 pb-6">
          <ul className="flex flex-col gap-1 pt-4">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block py-3 font-body text-lg border-b border-v-divider transition-colors hover:text-v-accent ${
                    pathname === href ? 'text-v-accent' : 'text-v-text2'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Link
                href="/shop"
                className="btn-vintage w-full justify-center text-center block"
              >
                Shop Now
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
