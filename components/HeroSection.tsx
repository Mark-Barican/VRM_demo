'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { animateHeroEntrance } from '@/lib/animations';

// Philippine sun with 8 primary rays + 8 wavy rays
function PhilippineSun({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      {/* Main circle */}
      <circle cx="100" cy="100" r="28" />
      {/* 8 primary rays */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const x1 = 100 + 32 * Math.cos(angle);
        const y1 = 100 + 32 * Math.sin(angle);
        const x2 = 100 + 72 * Math.cos(angle);
        const y2 = 100 + 72 * Math.sin(angle);
        const bx = 100 + 55 * Math.cos(angle - 0.18);
        const by = 100 + 55 * Math.sin(angle - 0.18);
        const cx2 = 100 + 55 * Math.cos(angle + 0.18);
        const cy2 = 100 + 55 * Math.sin(angle + 0.18);
        return (
          <path
            key={i}
            d={`M${x1.toFixed(1)},${y1.toFixed(1)} L${bx.toFixed(1)},${by.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)} L${cx2.toFixed(1)},${cy2.toFixed(1)} Z`}
          />
        );
      })}
      {/* Outer ring */}
      <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="83" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
    </svg>
  );
}

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    animateHeroEntrance(headlineRef.current, subtextRef.current, ctaRef.current);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-v-bg">

      {/* Warm radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 60%, color-mix(in srgb, var(--v-accent) 12%, transparent), transparent 70%)',
        }}
      />

      {/* Philippine sun — large background decoration */}
      <PhilippineSun
        className="absolute inset-0 m-auto w-[110vmin] h-[110vmin] text-v-accent opacity-[0.04] pointer-events-none"
      />

      {/* Rotating outer ring */}
      <div
        className="absolute inset-0 m-auto w-[85vmin] h-[85vmin] border border-v-border/40 rounded-full animate-spin-slow pointer-events-none"
        style={{ borderStyle: 'dashed' }}
      />
      <div
        className="absolute inset-0 m-auto w-[75vmin] h-[75vmin] border border-v-divider/30 rounded-full animate-spin-reverse pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6">

        {/* VRM Logo */}
        <div className="animate-float">
          <Image
            src="/vrm-logo.png"
            alt="VRM Manila"
            width={140}
            height={140}
            className="rounded-full shadow-2xl"
            style={{ filter: 'drop-shadow(0 0 24px color-mix(in srgb, var(--v-accent) 40%, transparent))' }}
            priority
          />
        </div>

        {/* Since line */}
        <p className="section-label tracking-[0.4em] uppercase">
          Est. Manila · 1976
        </p>

        {/* Main headline */}
        <h1
          ref={headlineRef}
          className="font-display text-[clamp(4rem,14vw,11rem)] leading-none tracking-wider text-accent-gradient"
          style={{ opacity: 0 }}
        >
          Ride With Honor.
        </h1>

        {/* Vintage divider */}
        <div className="vintage-divider w-full max-w-sm text-v-accent text-lg">
          <PhilippineSun className="w-6 h-6 flex-shrink-0" />
        </div>

        {/* Sub-headline */}
        <p
          ref={subtextRef}
          className="font-serif italic text-lg sm:text-xl text-v-text2 max-w-lg leading-relaxed"
          style={{ opacity: 0 }}
        >
          Classic Filipino helmets built for the scooter soul. Timeless style, uncompromising protection.
        </p>

        {/* CTA group */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-2"
          style={{ opacity: 0 }}
        >
          <Link href="/shop" className="btn-vintage">
            Explore Collection
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link href="/about" className="btn-outline-vintage">
            Our Story
          </Link>
        </div>

        {/* Safety badges */}
        <div className="flex gap-6 text-xs text-v-muted tracking-widest uppercase mt-2">
          <span>ECE Certified</span>
          <span className="text-v-divider">·</span>
          <span>DOT Approved</span>
          <span className="text-v-divider">·</span>
          <span>Made in PH</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="section-label text-xs tracking-[0.3em] uppercase opacity-60">Scroll</p>
        <div className="w-px h-8 bg-gradient-to-b from-v-accent to-transparent animate-bounce" />
      </div>
    </section>
  );
}
