'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { animateHeroEntrance } from '@/lib/animations';
import Grainient from '@/components/Grainient';

// Grainient palette mapped to the site theme.
// color1 = lightest highlight, color2 = gold accent, color3 = deepest base.
const GRAINIENT_LIGHT = { color1: '#FBF6EA', color2: '#C99020', color3: '#9B6B1E' };
const GRAINIENT_DARK = { color1: '#E8C050', color2: '#7A4A1A', color3: '#0D0804' };

// Philippine sun with 8 primary rays
function PhilippineSun({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="currentColor" aria-hidden="true">
      <circle cx="100" cy="100" r="28" />
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
      <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="83" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
    </svg>
  );
}

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // Track the active theme so the Grainient gradient matches light/dark.
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains('dark'));
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);
  const grainient = isDark ? GRAINIENT_DARK : GRAINIENT_LIGHT;

  useEffect(() => {
    animateHeroEntrance(headlineRef.current, subtextRef.current, ctaRef.current);
  }, []);

  // Scroll-linked logo "transfer": as the user scrolls, the hero logo fades and
  // lifts up/shrinks — handing off to the small logo that appears in the navbar.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = logoRef.current;
      if (!el) return;
      const y = window.scrollY;
      const p = Math.min(y / 180, 1); // 0 → 1 over first 180px
      el.style.opacity = String(1 - p);
      el.style.transform = `translateY(${-p * 48}px) scale(${1 - p * 0.55})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center overflow-hidden bg-v-bg px-4 pt-24 sm:pt-28 pb-20">
      {/* Animated grainient gradient — recolored to the vintage palette */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Grainient
          color1={grainient.color1}
          color2={grainient.color2}
          color3={grainient.color3}
          timeSpeed={0.12}
          warpStrength={1.0}
          warpFrequency={4.0}
          warpSpeed={1.2}
          warpAmplitude={60.0}
          blendSoftness={0.12}
          rotationAmount={300.0}
          noiseScale={1.6}
          grainAmount={0.07}
          grainScale={2.0}
          contrast={1.15}
          saturation={0.95}
          zoom={1.0}
        />
      </div>

      {/* Rotating rings — kept behind the scrim below so the readability scrim
          dims them where they cross the centered text (was obstructing copy,
          especially in dark mode). */}
      <div
        className="absolute inset-0 z-0 m-auto w-[88vmin] h-[88vmin] border border-v-border/30 rounded-full animate-spin-slow pointer-events-none"
        style={{ borderStyle: 'dashed' }}
      />
      <div className="absolute inset-0 z-0 m-auto w-[78vmin] h-[78vmin] border border-v-divider/20 rounded-full animate-spin-reverse pointer-events-none" />

      {/* Focus vignette — keeps the centre clear and lets the edges fall back
          into the background so the eye lands on the logo + headline. Uses
          var(--v-bg) so it darkens the edges in dark mode and lightens them in
          light mode. */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 92% 82% at 50% 50%, transparent 36%, color-mix(in srgb, var(--v-bg) 30%, transparent) 62%, color-mix(in srgb, var(--v-bg) 68%, transparent) 100%)',
        }}
      />

      {/* Readability scrim — softens the gradient behind the centered text.
          Sits above the rings + gradient so the text area stays clean. */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 52%, color-mix(in srgb, var(--v-bg) 74%, transparent), transparent 80%)',
        }}
      />

      {/* Bottom fade — blends the hero smoothly into the section below */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 z-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--v-bg))' }}
      />

      {/* Top scrim — darkens the strip behind the fixed (transparent) navbar so
          the nav links + icons stay legible over the gradient. Most needed in
          dark mode, where the bright gold otherwise washes them out. */}
      <div
        className="absolute inset-x-0 top-0 h-44 z-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, color-mix(in srgb, var(--v-bg) 85%, transparent) 0%, color-mix(in srgb, var(--v-bg) 48%, transparent) 38%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto my-auto text-center flex flex-col items-center gap-3 sm:gap-5">
        {/* VRM Logo — the element that transfers to the navbar */}
        <div ref={logoRef} className="animate-float will-change-transform">
          <Image
            src="/vrm-logo.png"
            alt="Vintage Rider Manila"
            width={160}
            height={160}
            priority
            className="rounded-full shadow-2xl w-[clamp(4rem,12vh,8rem)] h-[clamp(4rem,12vh,8rem)]"
            style={{ filter: 'drop-shadow(0 0 24px color-mix(in srgb, var(--v-accent) 40%, transparent))' }}
          />
        </div>

        {/* Brand line */}
        <p className="section-label tracking-[0.3em] sm:tracking-[0.4em] uppercase text-xs">
          VRM 1976 · Proudly Filipino
        </p>

        {/* Main headline */}
        <h1
          ref={headlineRef}
          className="font-display text-[clamp(2.25rem,min(9vw,11vh),7.5rem)] leading-[0.92] tracking-wide text-accent-gradient"
          style={{ opacity: 0 }}
        >
          Classics &amp; Modern Retro
        </h1>

        {/* Vintage divider */}
        <div className="vintage-divider w-full max-w-xs sm:max-w-sm text-v-accent">
          <PhilippineSun className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
        </div>

        {/* Sub-headline */}
        <p
          ref={subtextRef}
          className="font-serif italic text-sm sm:text-base lg:text-lg text-v-text2 max-w-md sm:max-w-lg leading-relaxed px-2"
          style={{ opacity: 0, textShadow: '0 1px 10px var(--v-bg)' }}
        >
          Vintage Rider Manila — shock-resistant, TIS-rated helmets and moto-gear for the classic, café-racer, scooter and e-bike rider.
        </p>

        {/* CTA group */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto pt-1"
          style={{ opacity: 0 }}
        >
          <Link href="/shop" className="btn-vintage justify-center">
            Explore Collection
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link href="/about" className="btn-outline-vintage justify-center">
            Our Story
          </Link>
        </div>

        {/* Safety badges */}
        <div
          className="flex flex-wrap justify-center gap-x-4 gap-y-1 sm:gap-6 text-xs text-v-text2 font-medium tracking-widest uppercase mt-1"
          style={{ textShadow: '0 1px 8px var(--v-bg), 0 0 2px var(--v-bg)' }}
        >
          <span>ECE Certified</span>
          <span className="text-v-accent/70 hidden sm:inline">·</span>
          <span>DOT Approved</span>
          <span className="text-v-accent/70 hidden sm:inline">·</span>
          <span>Made in PH</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="section-label text-xs tracking-[0.3em] uppercase opacity-60">Scroll</p>
        <div className="w-px h-8 bg-gradient-to-b from-v-accent to-transparent animate-bounce" />
      </div>
    </section>
  );
}
