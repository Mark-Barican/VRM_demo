'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import HeroSection from '@/components/HeroSection';
import PartnerLogoMarquee from '@/components/PartnerLogoMarquee';
import HelmetCard from '@/components/HelmetCard';
import ViewerModal from '@/components/ViewerModal';
import { Testimonials } from '@/components/ui/unique-testimonial';
import {
  ProgressSlider,
  SliderContent,
  SliderWrapper,
  SliderBtnGroup,
  SliderBtn,
} from '@/components/ui/progressive-carousel';
import { HELMETS, FEATURES, BRAND_COPY, type Helmet } from '@/lib/placeholders';
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

// Brand imagery for the "Why VRM" progressive carousel — index-aligned to FEATURES.
const WHY_VRM_IMAGES = [
  '/helmets/milano_gloss_black.jpg',
  '/helmets/matte_black_hf.jpg',
  '/helmets/milano_gloss_white.jpg',
];

// Short carousel blurbs — keep the message but fit the button without truncating.
const WHY_VRM_BLURBS = [
  'Shock-resistant ABS, EPS-lined — TIS-rated & ICC-certified.',
  'A homegrown Filipino brand, built for every kind of rider.',
  'Vintage VRM 1976 to modern VRUM — timeless by design.',
];

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

          <div className="max-w-4xl mx-auto" data-reveal>
            <ProgressSlider
              vertical={false}
              activeSlider={FEATURES[0].id}
              duration={5000}
            >
              <SliderContent>
                {FEATURES.map((feat, i) => (
                  <SliderWrapper key={feat.id} value={feat.id}>
                    <div className="relative w-full h-[clamp(400px,56vh,520px)] overflow-hidden rounded-lg border border-v-border">
                      <Image
                        src={WHY_VRM_IMAGES[i]}
                        alt={feat.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 56rem"
                        className="object-cover"
                      />
                      {/* Scrim so the overlaid buttons stay legible over the photo.
                          Only on sm+ where the buttons sit on the image — on mobile
                          the buttons drop below, so the photo shows in full. */}
                      <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-v-bg/95 via-v-bg/20 to-transparent pointer-events-none" />
                    </div>
                  </SliderWrapper>
                ))}
              </SliderContent>

              <SliderBtnGroup className="relative sm:absolute sm:inset-x-0 sm:bottom-0 mt-3 sm:mt-0 h-fit isolate text-v-text bg-v-card overflow-hidden grid grid-cols-1 sm:grid-cols-3 rounded-lg sm:rounded-t-none border border-v-border sm:border-x-0 sm:border-b-0">
                {FEATURES.map((feat, i) => (
                  <SliderBtn
                    key={feat.id}
                    value={feat.id}
                    className="text-left cursor-pointer p-4 sm:p-5 border-b last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 border-v-border transition-opacity"
                    progressBarClass="bottom-0 h-1.5 bg-v-accent"
                  >
                    <h3 className="relative inline-block w-fit px-3 py-0.5 mb-2 rounded-full bg-v-accent text-v-bg font-display uppercase tracking-wide text-xs">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-v-text2 leading-relaxed">
                      {WHY_VRM_BLURBS[i]}
                    </p>
                  </SliderBtn>
                ))}
              </SliderBtnGroup>
            </ProgressSlider>
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
          <div data-reveal>
            <Testimonials />
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-28 bg-v-accent relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center relative z-10">
          <p className="font-serif italic text-v-bg/70 text-sm tracking-widest mb-3">— VRM 1976 · Est. 2018 —</p>
          <h2 className="font-hero uppercase text-[clamp(2.75rem,2rem_+_3.4vw,4.75rem)] leading-[0.95] text-v-bg mb-4">
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
