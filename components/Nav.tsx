'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV_CATEGORIES } from '@/lib/placeholders';
import { useCart } from './CartProvider';
import ThemeToggle from './ThemeToggle';

// Desktop nav. Items flagged `mega` open the category mega-menu on hover/focus.
const NAV_LINKS = [
  { href: '/shop', label: 'Shop', mega: true },
  { href: '/about', label: 'About', mega: false },
  { href: '/contact', label: 'Contact', mega: false },
];

// Mobile drawer mirrors the desktop nav.
const MOBILE_LINKS = [
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { count, openCart } = useCart();
  const isHome = pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  // Mobile drawer: when the "Shop" row is tapped, a category sub-panel slides
  // in to its right (the mobile equivalent of the desktop mega-menu).
  const [mobileShopOpen, setMobileShopOpen] = useState(false);

  // Opening/closing the drawer always resets the sub-panel to collapsed.
  const toggleMenu = () => {
    setMenuOpen((v) => !v);
    setMobileShopOpen(false);
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchValue.trim();
    setSearchOpen(false);
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop');
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset transient UI when the route changes.
  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
    setSearchOpen(false);
    setMobileShopOpen(false);
  }, [pathname]);

  // Logo shows in the bar once scrolled (it "transfers" up from the hero), or
  // always on inner pages where there is no hero logo.
  const showLogo = scrolled || !isHome;
  // Solid backdrop whenever scrolled or an overlay panel is open.
  const solid = scrolled || megaOpen || searchOpen;

  return (
    <header
      onMouseLeave={() => setMegaOpen(false)}
      className={`fixed top-9 left-0 right-0 z-50 ${
        // When the mobile menu opens, fill the whole bar instantly (no
        // transition) so it never reads as transparent-then-opaque.
        menuOpen
          ? 'bg-v-bg border-b border-v-border shadow-sm'
          : solid
            ? 'bg-v-bg/95 backdrop-blur-md border-b border-v-border shadow-sm transition-all duration-300'
            : 'bg-transparent transition-all duration-300'
      }`}
    >
      <nav className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        {/* ── Left: desktop links / mobile hamburger ─────────────────────── */}
        <div className="flex items-center">
          {/* Mobile hamburger */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5"
          >
            <span className={`block w-5 h-0.5 bg-v-text transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-v-text transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-v-text transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-5 lg:gap-7">
            {NAV_LINKS.map(({ href, label, mega }) => (
              <li
                key={label}
                onMouseEnter={() => setMegaOpen(mega)}
              >
                <Link
                  href={href}
                  onFocus={() => setMegaOpen(mega)}
                  className={`group relative text-sm font-medium tracking-wide transition-colors duration-200 hover:text-v-accent whitespace-nowrap ${
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
        </div>

        {/* ── Center: logo (transfers in from hero on scroll) ────────────── */}
        <Link
          href="/"
          aria-label="Vintage Rider Manila Home"
          aria-hidden={!showLogo}
          tabIndex={showLogo ? 0 : -1}
          className="flex items-center justify-center shrink-0"
        >
          <Image
            src="/vrm-logo.png"
            alt="Vintage Rider Manila"
            width={48}
            height={48}
            priority
            className="rounded-full will-change-transform transition-all duration-500 ease-out w-9 h-9 sm:w-11 sm:h-11"
            style={{
              opacity: showLogo ? 1 : 0,
              transform: showLogo ? 'translateY(0) scale(1)' : 'translateY(-12px) scale(0.6)',
              pointerEvents: showLogo ? 'auto' : 'none',
            }}
          />
        </Link>

        {/* ── Right: search / account / cart / theme ─────────────────────── */}
        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Search"
            aria-expanded={searchOpen}
            className="w-9 h-9 flex items-center justify-center text-v-text2 hover:text-v-accent transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>

          <Link
            href="/account"
            aria-label="Account"
            className={`hidden sm:flex w-9 h-9 items-center justify-center transition-colors hover:text-v-accent ${
              pathname === '/account' ? 'text-v-accent' : 'text-v-text2'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </Link>

          <button
            onClick={openCart}
            aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}
            className="relative w-9 h-9 flex items-center justify-center text-v-text2 hover:text-v-accent transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[1.05rem] h-[1.05rem] px-1 flex items-center justify-center text-[0.6rem] font-semibold bg-v-accent text-v-bg rounded-full">
                {count}
              </span>
            )}
          </button>

          <ThemeToggle />
        </div>
      </nav>

      {/* ── Mega-menu (desktop) ─────────────────────────────────────────── */}
      <div
        className={`hidden md:block absolute left-0 right-0 top-full origin-top transition-all duration-300 ${
          megaOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="bg-v-bg border-b border-v-border shadow-xl">
          <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-6 lg:px-8 py-8">
            <div className="grid grid-cols-4 gap-5">
              {NAV_CATEGORIES.map((cat) => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className="group block"
                  onClick={() => setMegaOpen(false)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-v-surface border border-v-border group-hover:border-v-accent transition-colors">
                    <Image
                      src={cat.image}
                      alt={cat.label}
                      fill
                      sizes="(max-width: 1024px) 25vw, 320px"
                      className="object-cover saturate-[0.9] transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-v-bg/70 to-transparent" />
                  </div>
                  <h3 className="font-display text-xl tracking-wide text-v-text mt-3 group-hover:text-v-accent transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-v-muted mt-0.5">{cat.description}</p>
                </Link>
              ))}
            </div>
            <div className="flex items-center justify-between mt-6 pt-5 border-t border-v-divider">
              <p className="font-serif italic text-sm text-v-text2">
                Vintage style, modern safety — TIS-rated &amp; ICC-certified.
              </p>
              <Link
                href="/shop"
                onClick={() => setMegaOpen(false)}
                className="text-xs font-body font-semibold uppercase tracking-widest text-v-accent hover:text-v-accent-h transition-colors inline-flex items-center gap-2"
              >
                Shop the full collection
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Search overlay row ──────────────────────────────────────────── */}
      <div
        className={`absolute left-0 right-0 top-full transition-all duration-300 ${
          searchOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="bg-v-bg border-b border-v-border shadow-sm">
          <form onSubmit={submitSearch} className="max-w-3xl mx-auto px-6 py-5 flex items-center gap-3">
            <svg className="w-5 h-5 text-v-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search helmets — Milano, Tracker, VRUM…"
              className="flex-1 bg-transparent border-0 outline-none text-v-text placeholder:text-v-muted font-body text-base"
              autoFocus={searchOpen}
            />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
              className="text-v-muted hover:text-v-accent text-xl leading-none px-2"
            >
              ×
            </button>
          </form>
        </div>
      </div>

      {/* ── Mobile menu ─────────────────────────────────────────────────── */}
      {/* Open/close uses a grid-rows 0fr→1fr transition so the drawer also
          re-flows smoothly when the category sub-panel expands. */}
      <div
        className={`md:hidden grid transition-[grid-template-rows] duration-300 ease-out ${
          menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="bg-v-bg border-t border-v-border">
            <div className="flex">
              {/* Left: primary links. Shrinks to make room for the sub-panel. */}
              <ul
                className={`shrink-0 flex flex-col gap-1 py-4 px-5 sm:px-6 transition-[width] duration-300 ease-out ${
                  mobileShopOpen ? 'w-[42%] border-r border-v-divider' : 'w-full'
                }`}
              >
                {/* Shop toggles the category sub-panel instead of navigating. */}
                <li>
                  <button
                    type="button"
                    onClick={() => setMobileShopOpen((v) => !v)}
                    aria-expanded={mobileShopOpen}
                    className={`w-full flex items-center justify-between gap-2 py-3 font-body text-lg border-b border-v-divider transition-colors hover:text-v-accent ${
                      mobileShopOpen || pathname.startsWith('/shop') ? 'text-v-accent' : 'text-v-text2'
                    }`}
                  >
                    <span>Shop</span>
                    <svg
                      className={`w-4 h-4 shrink-0 transition-transform duration-300 ${mobileShopOpen ? 'rotate-90' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </li>

                {/* About / Contact navigate normally. */}
                {MOBILE_LINKS.filter((l) => l.href !== '/shop').map(({ href, label }) => (
                  <li key={label}>
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
              </ul>

              {/* Right: category sub-panel — the mobile mega-menu. Slides in
                  from the left's edge; fixed inner width keeps the content
                  from reflowing while the column width animates. */}
              <div
                className={`shrink-0 overflow-hidden transition-[width,opacity] duration-300 ease-out ${
                  mobileShopOpen ? 'w-[58%] opacity-100' : 'w-0 opacity-0 pointer-events-none'
                }`}
                aria-hidden={!mobileShopOpen}
              >
                <div className="w-[58vw] max-w-[16rem] py-4 pl-4 pr-5">
                  <p className="section-label text-xs mb-1">Categories</p>
                  <ul className="flex flex-col">
                    {NAV_CATEGORIES.map((cat) => (
                      <li key={cat.label}>
                        <Link
                          href={cat.href}
                          onClick={() => setMenuOpen(false)}
                          className="group flex items-center gap-3 py-2 border-b border-v-divider last:border-0"
                        >
                          <span className="relative w-10 h-10 shrink-0 overflow-hidden rounded border border-v-border bg-v-surface">
                            <Image
                              src={cat.image}
                              alt={cat.label}
                              fill
                              sizes="40px"
                              className="object-cover saturate-[0.9] transition-transform duration-500 group-hover:scale-105"
                            />
                          </span>
                          <span className="min-w-0">
                            <span className="block font-display text-base leading-tight tracking-wide text-v-text group-hover:text-v-accent transition-colors truncate">
                              {cat.label}
                            </span>
                            <span className="block text-xs text-v-muted truncate">{cat.description}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Full-width CTA under both panes. */}
            <div className="px-5 sm:px-6 pt-2 pb-6">
              <Link href="/shop" className="btn-vintage w-full justify-center text-center block">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
