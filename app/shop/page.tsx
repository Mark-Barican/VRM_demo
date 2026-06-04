'use client';

import Link from 'next/link';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import HelmetCard from '@/components/HelmetCard';
import FilterSidebar, {
  type FilterState,
  DEFAULT_FILTERS,
  activeFilterCount,
} from '@/components/FilterSidebar';
import SortDropdown from '@/components/SortDropdown';
import FaqAccordion from '@/components/FaqAccordion';
import ViewerModal from '@/components/ViewerModal';
import {
  HELMETS,
  FAQS,
  EDITORIAL,
  type Helmet,
  type SortOption,
} from '@/lib/placeholders';
import { animateFilterTransition, createScrollReveal } from '@/lib/animations';

// ── Client-side filter + sort ───────────────────────────────────────────────
function applyFilters(list: Helmet[], f: FilterState): Helmet[] {
  // Each facet uses OR-within / AND-across semantics, the standard for
  // storefront filtering: a product must satisfy every active facet, and
  // within a facet it qualifies if it matches any selected value.
  const overlaps = <T,>(a: T[], b: T[]) => a.some((v) => b.includes(v));

  return list.filter((h) => {
    if (h.price < f.priceMin || h.price > f.priceMax) return false;
    if (f.types.length && !f.types.includes(h.type)) return false;
    if (f.sizes.length && !overlaps(f.sizes, h.sizes)) return false;
    if (f.certifications.length && !overlaps(f.certifications, h.certifications)) return false;
    if (f.shellColors.length && !overlaps(f.shellColors, h.shellColors)) return false;
    if (f.finishes.length && !overlaps(f.finishes, h.finishes)) return false;
    if (f.availability.length && !f.availability.includes(h.availability)) return false;
    return true;
  });
}

function sortHelmets(list: Helmet[], sort: SortOption['value']): Helmet[] {
  const out = [...list];
  switch (sort) {
    case 'best-selling':
      return out.sort((a, b) => a.bestSellerRank - b.bestSellerRank);
    case 'price-asc':
      return out.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return out.sort((a, b) => b.price - a.price);
    case 'newest':
      return out.sort((a, b) => b.newest - a.newest);
    case 'featured':
    default:
      return out.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || a.bestSellerRank - b.bestSellerRank,
      );
  }
}

const TRUST_BADGES = [
  { label: 'TIS-Rated (≈ ECE)', icon: 'shield' },
  { label: 'Valid ICC Sticker', icon: 'check' },
  { label: 'Nationwide Delivery', icon: 'box' },
  { label: 'Also on Lazada & Shopee', icon: 'cart' },
];

const BADGE_ICONS: Record<string, React.ReactNode> = {
  shield: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 10c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286z" />,
  check: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  box: <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />,
  cart: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />,
};

function ShopCollection() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption['value']>('featured');
  const [query, setQuery] = useState('');
  const [activeHelmet, setActiveHelmet] = useState<Helmet | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const editorialRef = useRef<HTMLDivElement>(null);

  // Seed filters/search from the URL (?type=open|full from the mega-menu,
  // ?q=… from nav search or the Tracker/Milano category tiles).
  useEffect(() => {
    const type = searchParams.get('type');
    const q = searchParams.get('q') ?? '';
    setQuery(q);
    if (type === 'open') setFilters({ ...DEFAULT_FILTERS, types: ['Open Face'] });
    else if (type === 'full') setFilters({ ...DEFAULT_FILTERS, types: ['Full Face'] });
    else if (q) setFilters(DEFAULT_FILTERS);
  }, [searchParams]);

  const displayed = useMemo(() => {
    let list = applyFilters(HELMETS, filters);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((h) =>
        [h.name, h.category, h.line, h.type].some((field) => field.toLowerCase().includes(q)),
      );
    }
    return sortHelmets(list, sort);
  }, [filters, sort, query]);

  const activeCount = activeFilterCount(filters);

  // Reveal the static header / editorial sections on scroll.
  useEffect(() => {
    const cleanups: (() => void)[] = [];
    [headerRef, editorialRef].forEach((ref) => {
      const el = ref.current;
      if (!el) return;
      const nodes = el.querySelectorAll('[data-reveal]');
      if (nodes.length) cleanups.push(createScrollReveal(nodes));
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  // Re-stagger the grid whenever the filtered/sorted result changes.
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = Array.from(gridRef.current.querySelectorAll<HTMLElement>('[data-card]'));
    if (cards.length) animateFilterTransition([], cards);
  }, [displayed]);

  // Lock body scroll while the mobile filter drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileFiltersOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileFiltersOpen]);

  return (
    <>
      {/* ── Collection hero ─────────────────────────────────────────────── */}
      <section className="pt-32 sm:pt-40 pb-8 sm:pb-10 bg-v-bg" ref={headerRef}>
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6" data-reveal>
            <ol className="flex items-center gap-2 text-xs font-body tracking-wide text-v-muted">
              <li>
                <Link href="/" className="hover:text-v-accent transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-v-divider">/</li>
              <li className="text-v-text2">Vintage Helmets</li>
            </ol>
          </nav>

          <div data-reveal>
            <p className="section-label mb-3">— VRM 1976 · VRUM Collection —</p>
            <h1 className="font-display fluid-h1 tracking-wide text-v-text mb-5">
              Vintage Motorcycle Helmets
            </h1>
            <p className="font-serif italic text-v-text2 max-w-2xl leading-relaxed fluid-lead">
              Hand-finished in the Philippines for the classic, café-racer, scooter and e-bike
              rider — timeless vintage looks wrapped around genuinely modern safety. Every helmet
              is TIS-rated (≈ ECE), DTI-conforming and ships with a valid ICC sticker.
            </p>
          </div>
        </div>
      </section>

      {/* ── Toolbar (sticks just under the bar + header) ────────────────── */}
      <section className="sticky top-[5.75rem] sm:top-[6.25rem] z-30 bg-v-bg/95 backdrop-blur-md border-y border-v-border">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Filters toggle (opens drawer on mobile) */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-v-border bg-v-card text-v-text2 hover:border-v-accent hover:text-v-accent transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h18M6 12h12M10 19.5h4" />
              </svg>
              <span className="text-sm font-body font-medium">Filters</span>
              {activeCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[1.1rem] h-[1.1rem] px-1 text-[0.6rem] font-semibold bg-v-accent text-v-bg rounded-full">
                  {activeCount}
                </span>
              )}
            </button>
            <p className="text-sm text-v-muted">
              <span className="text-v-text2 font-medium">{displayed.length}</span>{' '}
              {displayed.length === 1 ? 'helmet' : 'helmets'}
            </p>
            {query.trim() && (
              <button
                onClick={() => setQuery('')}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-v-text2 border border-v-border px-2.5 py-1 hover:border-v-accent hover:text-v-accent transition-colors"
              >
                “{query.trim()}”
                <span aria-hidden className="text-sm leading-none">×</span>
              </button>
            )}
          </div>

          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </section>

      {/* ── Two-column body: sidebar + grid ─────────────────────────────── */}
      <section className="py-8 sm:py-10 bg-v-bg min-h-[60vh]">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex gap-8 lg:gap-10">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-64 xl:w-72 shrink-0">
              <div className="sticky top-32">
                <FilterSidebar filters={filters} onChange={setFilters} />
              </div>
            </aside>

            {/* Grid */}
            <div className="flex-1 min-w-0">
              {displayed.length > 0 ? (
                <div
                  ref={gridRef}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6"
                >
                  {displayed.map((helmet, i) => (
                    <div key={helmet.id} data-card={helmet.id}>
                      <HelmetCard helmet={helmet} onView3D={setActiveHelmet} priority={i < 3} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <p className="font-display text-3xl tracking-wide text-v-text mb-2">
                    No helmets match your filters
                  </p>
                  <p className="text-v-muted text-sm mb-6">
                    Try widening your price range or clearing a few options.
                  </p>
                  <button
                    onClick={() => {
                      setFilters(DEFAULT_FILTERS);
                      setQuery('');
                    }}
                    className="btn-vintage text-sm"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust strip ─────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-14 section-fade-down">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {TRUST_BADGES.map(({ label, icon }) => (
              <div key={label} className="flex flex-col items-center gap-3">
                <svg className="w-7 h-7 text-v-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  {BADGE_ICONS[icon]}
                </svg>
                <p className="text-xs sm:text-sm text-v-text2 tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Editorial: the VRM story ────────────────────────────────────── */}
      <section className="section-py section-fade-up" ref={editorialRef}>
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16" data-reveal>
            <p className="section-label mb-2">— Why Vintage Rider Manila —</p>
            <h2 className="font-display fluid-h2 tracking-wide text-v-text">
              Heritage, Honestly Made
            </h2>
            <div className="vintage-divider w-40 sm:w-48 mx-auto mt-4 text-v-accent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {EDITORIAL.map((block, i) => (
              <article key={block.id} className="relative" data-reveal>
                <span className="font-display text-5xl text-v-accent/25 leading-none">
                  0{i + 1}
                </span>
                <p className="section-label mt-3 mb-2">{block.label}</p>
                <h3 className="font-display fluid-h4 tracking-wide text-v-text mb-3">
                  {block.title}
                </h3>
                <p className="font-body text-v-muted leading-relaxed text-sm sm:text-base">
                  {block.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="section-py section-fade-down">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <p className="section-label mb-2">— Good to Know —</p>
            <h2 className="font-display fluid-h2-sm tracking-wide text-v-text">
              Frequently Asked
            </h2>
            <div className="vintage-divider w-32 sm:w-40 mx-auto mt-4 text-v-accent" />
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      {/* ── Mobile filter drawer ────────────────────────────────────────── */}
      <div
        className={`lg:hidden fixed inset-0 z-[90] overflow-hidden transition-opacity duration-300 ${
          mobileFiltersOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-v-bg/70 backdrop-blur-sm"
          onClick={() => setMobileFiltersOpen(false)}
        />
        <div
          className={`absolute top-0 left-0 bottom-0 w-[85%] max-w-sm bg-v-bg border-r border-v-border overflow-y-auto p-5 transition-transform duration-300 ease-out ${
            mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onClose={() => setMobileFiltersOpen(false)}
          />
          <button
            onClick={() => setMobileFiltersOpen(false)}
            className="btn-vintage w-full justify-center mt-6 text-sm"
          >
            Show {displayed.length} {displayed.length === 1 ? 'Result' : 'Results'}
          </button>
        </div>
      </div>

      <ViewerModal helmet={activeHelmet} onClose={() => setActiveHelmet(null)} />
    </>
  );
}

export default function ShopPage() {
  // useSearchParams() requires a Suspense boundary in the App Router.
  return (
    <Suspense
      fallback={
        <div className="pt-32 sm:pt-40 pb-20 text-center text-v-muted font-display text-2xl tracking-wide">
          Loading collection…
        </div>
      }
    >
      <ShopCollection />
    </Suspense>
  );
}
