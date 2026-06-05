'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
import PartnerLogoMarquee from '@/components/PartnerLogoMarquee';
import HelmetCard from '@/components/HelmetCard';
import ViewerModal from '@/components/ViewerModal';
import { HELMETS, FEATURES, TESTIMONIALS, BRAND_COPY, type Helmet } from '@/lib/placeholders';
import { createScrollReveal } from '@/lib/animations';

const HelmetViewer = dynamic(() => import('@/components/HelmetViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-v-surface">
      <p className="font-display text-v-accent/40 tracking-widest text-sm animate-pulse">
        LOADING 3D...
      </p>
    </div>
  ),
});

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  shield: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 10c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286z" />
    </svg>
  ),
  star: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  ),
  sparkles: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
  ),
};

export default function HomePage() {
  const [activeHelmet, setActiveHelmet] = useState<Helmet | null>(null);
  const featuredSectionRef = useRef<HTMLDivElement>(null);
  const featureSectionRef = useRef<HTMLDivElement>(null);
  const viewerSectionRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const featuredHelmets = HELMETS.filter((h) => h.featured);

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    const setup = (ref: React.RefObject<HTMLElement | null>, sel: string) => {
      const el = ref.current;
      if (!el) return;
      const nodes = el.querySelectorAll(sel);
      if (nodes.length) cleanups.push(createScrollReveal(nodes));
    };
    setup(featuredSectionRef, '[data-reveal]');
    setup(featureSectionRef, '[data-reveal]');
    setup(viewerSectionRef, '[data-reveal]');
    setup(testimonialsRef, '[data-reveal]');
    return () => cleanups.forEach(fn => fn());
  }, []);

  return (
    <>
      <HeroSection />

      {/* ── Trusted partner logos (marquee) ────────────────────────────────── */}
      <PartnerLogoMarquee />

      {/* ── Featured Helmets ───────────────────────────────────────────────── */}
      <section className="section-py section-fade-down" ref={featuredSectionRef}>
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14" data-reveal>
            <p className="section-label mb-2">— Collection —</p>
            <h2 className="font-display fluid-h2 tracking-wide text-v-text">
              Featured Helmets
            </h2>
            <div className="vintage-divider w-40 sm:w-48 mx-auto mt-4 text-v-accent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {featuredHelmets.map((helmet, i) => (
              <div key={helmet.id} data-reveal>
                <HelmetCard helmet={helmet} onView3D={setActiveHelmet} priority={i === 0} />
              </div>
            ))}
          </div>
          <div className="text-center mt-10 sm:mt-12" data-reveal>
            <a
              href="/shop"
              className="btn-outline-vintage text-sm inline-flex items-center gap-2"
            >
              View All Helmets
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── Why VRM ────────────────────────────────────────────────────────── */}
      <section className="section-py section-fade-up" ref={featureSectionRef}>
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14" data-reveal>
            <p className="section-label mb-2">— Why VRM —</p>
            <h2 className="font-display fluid-h2 tracking-wide text-v-text">
              Built Different.
            </h2>
            <div className="vintage-divider w-40 sm:w-48 mx-auto mt-4 text-v-accent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {FEATURES.map((feat) => (
              <div
                key={feat.id}
                className="group p-8 bg-v-card border border-v-border hover:border-v-accent transition-colors duration-300 relative"
                data-reveal
              >
                {/* Corner accents */}
                <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-v-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-v-accent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="w-12 h-12 flex items-center justify-center text-v-accent mb-6 border border-v-border group-hover:border-v-accent group-hover:bg-v-accent/5 transition-colors">
                  {FEATURE_ICONS[feat.icon]}
                </div>
                <h3 className="font-display fluid-h4 tracking-wide text-v-text mb-3">{feat.title}</h3>
                <p className="text-v-muted text-sm leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3D Viewer ──────────────────────────────────────────────────────── */}
      <section className="section-py section-fade-down overflow-hidden" ref={viewerSectionRef}>
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Text */}
            <div data-reveal>
              <p className="section-label mb-3">{BRAND_COPY.viewer3dLabel}</p>
              <h2 className="font-display fluid-h2 tracking-wide text-v-text mb-6">
                Explore Every Angle.
              </h2>
              <p className="font-body text-v-muted leading-relaxed mb-4">
                Examine our helmets in full 3D before you buy. Rotate, zoom, and inspect every detail — the handcrafted stitching, the gold trim, the vintage finish — all from your screen.
              </p>
              <p className="font-body text-v-muted leading-relaxed mb-8">
                From the vintage VRM 1976 line to the modern VRUM range, every helmet is built for the Filipino rider — shock-resistant ABS shell, EPS absorber, and TIS-rated protection (equivalent to ECE).
              </p>
              <p className="font-serif italic text-xs text-v-muted/50 tracking-wide">
                {BRAND_COPY.viewer3dSub}
              </p>
            </div>

            {/* 3D Canvas */}
            <div
              className="relative h-[340px] sm:h-[440px] lg:h-[480px] border border-v-border bg-v-surface overflow-hidden"
              data-reveal
            >
              {/* Vintage corner accents */}
              <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-v-accent z-10 pointer-events-none" />
              <span className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-v-accent z-10 pointer-events-none" />
              <span className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-v-accent z-10 pointer-events-none" />
              <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-v-accent z-10 pointer-events-none" />
              <HelmetViewer autoRotate={true} className="absolute inset-0" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      <section className="section-py section-fade-up" ref={testimonialsRef}>
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14" data-reveal>
            <p className="section-label mb-2">— Reviews —</p>
            <h2 className="font-display fluid-h2 tracking-wide text-v-text">
              Riders Speak.
            </h2>
            <div className="vintage-divider w-40 sm:w-48 mx-auto mt-4 text-v-accent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-8 bg-v-card border border-v-border hover:border-v-accent/50 transition-colors duration-300 relative"
                data-reveal
              >
                {/* Large decorative quote */}
                <span className="absolute top-3 right-5 font-serif text-6xl text-v-accent/10 leading-none select-none">
                  &#8220;
                </span>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-v-accent" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="font-serif italic text-v-text2 text-sm leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="border-t border-v-divider pt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-v-accent/20 flex items-center justify-center text-v-accent font-display text-sm">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-body font-semibold text-v-text text-sm">{t.author}</p>
                    <p className="text-xs text-v-muted">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-28 bg-v-accent relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center relative z-10">
          <p className="font-serif italic text-v-bg/70 text-sm tracking-widest mb-3">— VRM 1976 · Est. 2018 —</p>
          <h2 className="font-hero uppercase text-[clamp(2.75rem,2rem+3.4vw,4.75rem)] leading-[0.95] text-v-bg mb-4">
            Ready to Ride?
          </h2>
          <p className="font-body text-v-bg/70 mb-8 text-lg">
            Find your perfect VRM helmet — TIS-rated, ICC-certified and proudly Filipino. Classics and modern retro for every ride.
          </p>
          <a
            href="/shop"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-v-bg text-v-accent font-hero uppercase text-xl sm:text-2xl tracking-[0.12em] shadow-lg hover:bg-v-surface hover:-translate-y-0.5 transition-all duration-200"
            style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
          >
            Shop the Collection
            <svg className="w-6 h-6 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      <ViewerModal helmet={activeHelmet} onClose={() => setActiveHelmet(null)} />
    </>
  );
}
