'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { animateCardHover } from '@/lib/animations';
import type { Helmet } from '@/lib/placeholders';

interface HelmetCardProps {
  helmet: Helmet;
  onView3D?: (helmet: Helmet) => void;
  priority?: boolean;
}

export default function HelmetCard({ helmet, onView3D, priority = false }: HelmetCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => cardRef.current && animateCardHover(cardRef.current, true)}
      onMouseLeave={() => cardRef.current && animateCardHover(cardRef.current, false)}
      className="group relative bg-v-card border border-v-border hover:border-v-accent overflow-hidden transition-colors duration-300 cursor-pointer"
      style={{ willChange: 'transform' }}
    >
      {/* Vintage corner accents */}
      <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-v-accent z-10 pointer-events-none" />
      <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-v-accent z-10 pointer-events-none" />
      <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-v-accent z-10 pointer-events-none" />
      <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-v-accent z-10 pointer-events-none" />

      {/* Badge */}
      {helmet.badge && (
        <span className="absolute top-3 left-3 z-10 px-2.5 py-0.5 text-xs font-display tracking-widest bg-v-accent text-v-bg">
          {helmet.badge}
        </span>
      )}

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-v-surface">
        <Image
          src={helmet.image}
          alt={helmet.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-108 saturate-90"
          priority={priority}
        />
        {/* Sepia overlay for vintage feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-v-card/80 via-transparent to-transparent" />
        <div
          className="absolute inset-0 mix-blend-multiply opacity-20"
          style={{ background: 'var(--v-surface)' }}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category + divider */}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-serif italic text-xs text-v-accent">{helmet.category}</span>
          <span className="flex-1 h-px bg-v-divider" />
        </div>

        <h3 className="font-display text-2xl tracking-wide text-v-text mb-1 leading-tight">
          {helmet.name}
        </h3>
        <p className="text-sm text-v-muted line-clamp-2 mb-3 leading-relaxed">{helmet.description}</p>

        {/* Colorways */}
        <p className="text-xs text-v-muted/70 mb-4 tracking-wide">
          {helmet.colorways.join(' · ')}
        </p>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-v-divider">
          <p className="font-display text-3xl tracking-wide text-v-accent">
            ₱{helmet.price.toLocaleString()}
          </p>
          <button
            onClick={() => onView3D?.(helmet)}
            className="px-4 py-2 text-xs font-body font-semibold tracking-widest uppercase border border-v-accent text-v-accent hover:bg-v-accent hover:text-v-bg transition-colors duration-200"
          >
            View 3D
          </button>
        </div>
      </div>
    </div>
  );
}
