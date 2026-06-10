'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { BackgroundCircles } from '@/components/ui/background-circles';

// WebGL dots only init after hydration, so keep three.js out of the initial bundle.
const DottedSurface = dynamic(
  () => import('@/components/ui/dotted-surface').then((m) => m.DottedSurface),
  { ssr: false }
);

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-v-bg">
      {/* Backmost layer — animated gold dotted surface */}
      <DottedSurface className="absolute inset-0 z-0" />

      {/* Rotating gold rings + brand title, transparent so the dots show through.
          CTAs are passed as children so the hero stays actionable. */}
      <BackgroundCircles
        className="relative z-10 h-[100svh] bg-transparent"
        title="Classics & Modern Retro"
        description="Vintage Rider Manila"
      >
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link href="/shop" className="btn-vintage justify-center">
            Explore Collection
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link href="/about" className="btn-outline-vintage justify-center">
            Our Story
          </Link>
        </div>
      </BackgroundCircles>

      {/* Top scrim — keeps the fixed navbar legible over the gold dots */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-40"
        style={{
          background:
            'linear-gradient(to bottom, color-mix(in srgb, var(--v-bg) 85%, transparent) 0%, color-mix(in srgb, var(--v-bg) 40%, transparent) 45%, transparent 100%)',
        }}
      />

      {/* Bottom fade — seamless transition into the next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-44 sm:h-56"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--v-bg))' }}
      />
    </section>
  );
}
