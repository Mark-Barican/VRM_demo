'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { CONTACT_INFO } from '@/lib/placeholders';

const FOOTER_LINKS = {
  'Popular Collections': [
    { label: 'VRM 1976 Classics', href: '/shop' },
    { label: 'VRUM Modern Retro', href: '/shop' },
    { label: 'Kids', href: '/shop' },
    { label: 'E-Bike & Gear', href: '/shop' },
  ],
  'About VRM': [
    { label: 'Our Story', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/about' },
    { label: 'Press', href: '/about' },
  ],
  Help: [
    { label: 'FAQ', href: '/shop' },
    { label: 'Warranty', href: '/contact' },
    { label: 'Returns', href: '/contact' },
    { label: 'Store Locator', href: '/contact' },
  ],
};

// Social links with real VRM handles.
const SOCIAL_LINKS = [
  {
    label: `Facebook · ${CONTACT_INFO.facebook.handle}`,
    href: CONTACT_INFO.facebook.url,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: `Instagram · ${CONTACT_INFO.instagram.handle}`,
    href: CONTACT_INFO.instagram.url,
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const CERTIFICATIONS = ['TIS-Rated (≈ ECE)', 'DTI Conformity', 'Valid ICC Sticker', 'DOT (Milano)'];
const PAYMENTS = ['Visa', 'Mastercard', 'GCash', 'PayPal', 'BDO', 'COD'];

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  // Demo only — no real submission.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setDone(true);
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md">
      {done ? (
        <p className="font-serif italic text-v-accent text-sm py-3">
          Thanks — you&apos;re on the list. Keep an eye on your inbox for new drops.
        </p>
      ) : (
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            aria-label="Email address"
            className="flex-1 bg-v-bg border border-v-border px-4 py-3 text-sm text-v-text placeholder:text-v-muted outline-none focus:border-v-accent transition-colors"
          />
          <button type="submit" className="btn-vintage text-sm justify-center shrink-0">
            Subscribe
          </button>
        </div>
      )}
      <p className="text-xs text-v-muted/70 mt-2">
        New drops, restocks &amp; ride stories. No spam — unsubscribe anytime.
      </p>
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="bg-v-surface border-t border-v-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* ── Newsletter band ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center pb-12 mb-12 border-b border-v-border">
          <div>
            <p className="section-label mb-2">— Join the Club —</p>
            <h3 className="font-display fluid-h3 tracking-wide text-v-text">
              Ride With Us
            </h3>
            <p className="text-v-muted text-sm mt-2 max-w-md">
              Be first to hear about limited runs, restocks and the stories behind every VRM build.
            </p>
          </div>
          <div className="lg:justify-self-end w-full">
            <NewsletterForm />
          </div>
        </div>

        {/* ── Top: brand + link columns ────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="block group w-fit" aria-label="Vintage Rider Manila Home">
              <Image
                src="/vrm-logo.png"
                alt="Vintage Rider Manila"
                width={120}
                height={120}
                className="rounded-full opacity-90 group-hover:opacity-100 transition-opacity w-24 h-24 sm:w-28 sm:h-28"
              />
            </Link>

            <p className="mt-5 text-v-muted text-sm leading-relaxed max-w-xs font-body">
              Vintage Rider Manila — the home of Classics &amp; Modern Retro. Proudly Filipino helmets &amp; moto-gear, TIS-rated and ICC-certified, since 2018.
            </p>

            {/* Social links */}
            <div className="flex gap-2 mt-5">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
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

        {/* ── Certification badges ─────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {CERTIFICATIONS.map((cert) => (
            <span
              key={cert}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-v-border text-v-text2 text-xs font-body tracking-wide"
            >
              <svg className="w-3.5 h-3.5 text-v-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {cert}
            </span>
          ))}
        </div>

        {/* Vintage divider */}
        <div className="vintage-divider mb-6 text-v-accent text-sm font-serif italic">
          VRM 1976 · Proudly Filipino
        </div>

        {/* ── Bottom bar: copyright + payments ─────────────────────────── */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-5 text-xs text-v-muted/60 font-body">
          <p className="order-2 lg:order-1 text-center lg:text-left">
            © {new Date().getFullYear()} VRM 1976 Motorcycle Parts and Accessories. All rights reserved.
          </p>

          {/* Payment methods */}
          <div className="order-1 lg:order-2 flex flex-wrap items-center justify-center gap-2">
            {PAYMENTS.map((pay) => (
              <span
                key={pay}
                className="px-2.5 py-1 border border-v-border text-v-muted text-[0.7rem] font-semibold tracking-wide bg-v-bg/40"
              >
                {pay}
              </span>
            ))}
          </div>

          <div className="order-3 flex gap-6">
            <a href="#" className="hover:text-v-accent transition-colors">Privacy</a>
            <a href="#" className="hover:text-v-accent transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
