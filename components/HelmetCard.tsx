'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { animateCardHover } from '@/lib/animations';
import type { Helmet } from '@/lib/placeholders';
import { useCart } from './CartProvider';

interface HelmetCardProps {
  helmet: Helmet;
  onView3D?: (helmet: Helmet) => void;
  priority?: boolean;
}

// Badges get a subtle colour treatment depending on meaning.
const BADGE_TONE: Record<string, string> = {
  New: 'bg-v-accent text-v-bg',
  Limited: 'bg-v-red text-v-bg',
  Bestseller: 'bg-v-accent text-v-bg',
};

export default function HelmetCard({ helmet, onView3D, priority = false }: HelmetCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const soldOut = helmet.availability === 'Out of Stock';
  const madeToOrder = helmet.availability === 'Made to Order';

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => cardRef.current && animateCardHover(cardRef.current, true)}
      onMouseLeave={() => cardRef.current && animateCardHover(cardRef.current, false)}
      className="group relative bg-v-card border border-v-border hover:border-v-accent overflow-hidden transition-colors duration-300 flex flex-col"
      style={{ willChange: 'transform' }}
    >
      {/* Vintage corner accents */}
      <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-v-accent z-20 pointer-events-none" />
      <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-v-accent z-20 pointer-events-none" />
      <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-v-accent z-20 pointer-events-none" />
      <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-v-accent z-20 pointer-events-none" />

      {/* Badge (New / Limited / Bestseller / etc.) */}
      {helmet.badge && (
        <span
          className={`absolute top-3 left-3 z-20 px-2.5 py-0.5 text-xs font-display tracking-widest ${
            BADGE_TONE[helmet.badge] ?? 'bg-v-text text-v-bg'
          }`}
        >
          {helmet.badge}
        </span>
      )}

      {/* Availability flag */}
      {madeToOrder && (
        <span className="absolute top-3 right-3 z-20 px-2.5 py-0.5 text-[0.65rem] font-body uppercase tracking-widest bg-v-surface/90 text-v-text2 border border-v-border">
          Made to Order
        </span>
      )}

      {/* ── Square image: primary + hover-swap secondary ─────────────────── */}
      <div className="relative aspect-square overflow-hidden bg-v-surface">
        {/* Primary shot */}
        <Image
          src={helmet.image}
          alt={helmet.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-opacity duration-500 saturate-[0.92] group-hover:opacity-0"
          priority={priority}
        />
        {/* Secondary shot, revealed on hover */}
        <Image
          src={helmet.image2}
          alt={`${helmet.name} alternate view`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover opacity-0 transition-opacity duration-500 saturate-[0.92] group-hover:opacity-100 scale-[1.03]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-v-card/70 via-transparent to-transparent pointer-events-none" />

        {/*
          ── 3D VIEWER SLOT ──────────────────────────────────────────────
          Placeholder mount point for the per-product 3D helmet viewer.
          For the demo this overlay opens the shared <HelmetViewer> modal;
          later, an inline <HelmetViewer modelId={helmet.id} /> can render here.
        */}
        <button
          onClick={() => onView3D?.(helmet)}
          aria-label={`View ${helmet.name} in 3D`}
          data-viewer-slot={helmet.id}
          className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-center gap-2 py-2.5 bg-v-bg/85 backdrop-blur-sm border border-v-accent/60 text-v-accent text-xs font-body font-semibold uppercase tracking-widest opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-v-accent hover:text-v-bg"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
          </svg>
          View in 3D
        </button>

        {/* Sold-out veil */}
        {soldOut && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-v-bg/55 backdrop-blur-[1px]">
            <span className="px-4 py-1.5 font-display text-lg tracking-[0.3em] text-v-text border border-v-text/40">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category + divider */}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-serif italic text-xs text-v-accent">{helmet.category}</span>
          <span className="text-v-divider text-xs">·</span>
          <span className="text-[0.7rem] uppercase tracking-widest text-v-muted">{helmet.type}</span>
          <span className="flex-1 h-px bg-v-divider" />
        </div>

        <h3 className="font-display fluid-h4 tracking-wide text-v-text mb-1 leading-tight">
          {helmet.name}
        </h3>

        {/* Colorways */}
        <p className="text-xs text-v-muted/80 mb-4 tracking-wide">{helmet.colorways.join(' · ')}</p>

        {/* Price + CTA pinned to bottom */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-3 border-t border-v-divider">
          <p className="font-display text-3xl tracking-wide text-v-accent">
            ₱{helmet.price.toLocaleString()}
          </p>
          <button
            onClick={() => !soldOut && addItem(helmet.id)}
            disabled={soldOut}
            className={`px-4 py-2 text-xs font-body font-semibold tracking-widest uppercase border transition-colors duration-200 ${
              soldOut
                ? 'border-v-divider text-v-muted/50 cursor-not-allowed'
                : 'border-v-accent text-v-accent hover:bg-v-accent hover:text-v-bg'
            }`}
          >
            {soldOut ? 'Notify Me' : madeToOrder ? 'Pre-Order' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
