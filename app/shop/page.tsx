'use client';

import { useEffect, useRef, useState } from 'react';
import HelmetCard from '@/components/HelmetCard';
import FilterBar, { type Filter } from '@/components/FilterBar';
import ViewerModal from '@/components/ViewerModal';
import { HELMETS, type Helmet } from '@/lib/placeholders';
import { animateFilterTransition, createScrollReveal } from '@/lib/animations';

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [activeHelmet, setActiveHelmet] = useState<Helmet | null>(null);
  const [displayedIds, setDisplayedIds] = useState<string[]>(HELMETS.map((h) => h.id));
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Initial reveal animation
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const nodes = el.querySelectorAll('[data-reveal]');
    const cleanup = createScrollReveal(nodes);
    return cleanup;
  }, []);

  const handleFilterChange = (filter: Filter) => {
    if (!gridRef.current) {
      setActiveFilter(filter);
      const next = filter === 'All' ? HELMETS : HELMETS.filter((h) => h.category === filter);
      setDisplayedIds(next.map((h) => h.id));
      return;
    }

    const currentCards = Array.from(
      gridRef.current.querySelectorAll<HTMLElement>('[data-card]'),
    );

    const nextHelmets =
      filter === 'All' ? HELMETS : HELMETS.filter((h) => h.category === filter);
    const nextIds = nextHelmets.map((h) => h.id);

    const hiding = currentCards.filter(
      (el) => !nextIds.includes(el.dataset.card ?? ''),
    );
    const showing = currentCards.filter((el) => nextIds.includes(el.dataset.card ?? ''));

    setActiveFilter(filter);

    animateFilterTransition(hiding, showing, () => {
      setDisplayedIds(nextIds);
    });
  };

  const displayedHelmets = HELMETS.filter((h) => displayedIds.includes(h.id));

  return (
    <>
      {/* Page header */}
      <section className="pt-36 pb-12 bg-brand-black" ref={headerRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div data-reveal>
            <p className="text-xs tracking-[0.3em] text-brand-gold uppercase mb-3">
              {/* TODO: replace with real content */}
              VRM Collection
            </p>
            <h1 className="font-display text-6xl sm:text-7xl tracking-wide mb-6">
              Shop Helmets
            </h1>
            <p className="text-brand-offwhite/50 max-w-xl leading-relaxed">
              {/* TODO: replace with real content */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Each VRM helmet is
              engineered to exceed international safety standards while looking exceptional.
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" data-reveal>
            <FilterBar active={activeFilter} onChange={handleFilterChange} />
            <p className="text-sm text-brand-offwhite/30">
              {displayedHelmets.length} helmet{displayedHelmets.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="py-12 bg-brand-black min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {displayedHelmets.map((helmet, i) => (
              <div key={helmet.id} data-card={helmet.id}>
                <HelmetCard
                  helmet={helmet}
                  onView3D={setActiveHelmet}
                  priority={i < 4}
                />
              </div>
            ))}
          </div>

          {displayedHelmets.length === 0 && (
            <div className="flex items-center justify-center py-24">
              <p className="text-brand-offwhite/30 font-display text-2xl tracking-wide">
                No helmets found
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-16 border-t border-brand-gray/20 bg-brand-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'ECE 22.06 Certified', icon: '🛡' },
              { label: 'DOT FMVSS 218', icon: '✓' },
              { label: 'Free Shipping ₱5k+', icon: '📦' },
              { label: '30-Day Returns', icon: '↩' },
            ].map(({ label, icon }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <span className="text-2xl" aria-hidden>
                  {icon}
                </span>
                <p className="text-xs text-brand-offwhite/40 tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ViewerModal helmet={activeHelmet} onClose={() => setActiveHelmet(null)} />
    </>
  );
}
