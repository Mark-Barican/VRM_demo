'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { createScrollReveal } from '@/lib/animations';
import { BRAND_COPY, TEAM_MEMBERS } from '@/lib/placeholders';
import DomeGallery from '@/components/DomeGallery';

const GALLERY_IMAGES = [
  { src: '/helmets/milano_gloss_black.jpg', alt: 'VRM Milano Sport — Gloss Black' },
  { src: '/helmets/milano_gloss_white.jpg', alt: 'VRM Milano Sport — Gloss White' },
  { src: '/helmets/vintage_white_hf.jpg', alt: 'Premium Plus Half Face — Vintage White' },
  { src: '/helmets/gloss_white_hf.jpg', alt: 'Premium Plus Half Face — Gloss White' },
  { src: '/helmets/gloss_pearl_hf.jpg', alt: 'Premium Plus Half Face — Gloss Pearl' },
  { src: '/helmets/matte_black_hf.jpg', alt: 'Premium Plus Half Face — Matte Black' },
  { src: 'https://picsum.photos/seed/vrm-ride1/600/600', alt: 'Rider on a Manila street' },
  { src: 'https://picsum.photos/seed/vrm-ride2/600/600', alt: 'Café racer culture' },
  { src: 'https://picsum.photos/seed/vrm-ride3/600/600', alt: 'Scooter rider at golden hour' },
  { src: 'https://picsum.photos/seed/vrm-store/600/600', alt: 'Inside the VRM Tiendesitas store' },
];

const TIMELINE = [
  { year: '2018', title: 'Vintage Rider Manila Is Born', body: 'Lawyer, entrepreneur and rider Atty. Ped Faytaren Jr. founds VRM to give Filipino riders gear that is safe, stylish and unmistakably their own.' },
  { year: '2019', title: 'The VRM 1976 Line', body: 'Our vintage/classic collection — Milano, Premium Plus, Tracker Classic and the Painted 8Ball — takes off with café-racer and scooter riders.' },
  { year: '2021', title: 'Certified & Trusted', body: 'Every helmet ships shock-resistant ABS + EPS, TIS-rated (equivalent to ECE), DTI-conforming and carrying a valid ICC sticker.' },
  { year: '2023', title: '5 Years · VRUM Launches', body: 'We celebrate our 5th year and launch VRUM, our modern-retro line — "Versatility, Reliability, Modern Design."' },
  { year: 'Today', title: 'Classics & Modern Retro', body: 'From Tiendesitas to Alabang, Greenhills and Silang — plus Lazada and Shopee — VRM rides with a community tens of thousands strong.' },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;
    const nodes = el.querySelectorAll('[data-reveal]');
    const cleanup = createScrollReveal(nodes);
    return cleanup;
  }, []);

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-20 bg-v-bg relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 70% 25%, color-mix(in srgb, var(--v-accent) 10%, transparent), transparent 65%)' }}
        />
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 relative" data-reveal>
          <p className="section-label mb-3">— Our Story —</p>
          <h1 className="font-display fluid-display tracking-wide leading-[0.92] text-v-text mb-7">
            {BRAND_COPY.aboutHeadline}
          </h1>
          <div className="vintage-divider w-24 mb-8 text-v-accent" />
          <div className="font-body text-v-text2 leading-relaxed space-y-5 max-w-2xl fluid-lead">
            {BRAND_COPY.aboutBody.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Brand image */}
      <section className="bg-v-bg pb-4">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8" data-reveal>
          <div className="relative w-full h-[300px] sm:h-[440px] lg:h-[520px] overflow-hidden border border-v-border">
            <Image
              src="https://picsum.photos/seed/vrm-about/1400/600"
              alt="Vintage Rider Manila store"
              fill
              className="object-cover saturate-[0.85]"
              sizes="(max-width: 768px) 100vw, 1400px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-v-bg/80 via-v-bg/20 to-transparent" />
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
              <p className="section-label mb-2">Est. 2018 — Pasig, Philippines</p>
              <p className="font-display fluid-h3 text-v-text">Home of Classics &amp; Modern Retro.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-py bg-v-bg">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div data-reveal>
              <p className="section-label mb-3">{BRAND_COPY.missionHeadline}</p>
              <h2 className="font-display fluid-h2-sm tracking-wide text-v-text mb-6">
                Protection Without Compromise.
              </h2>
              <p className="font-body text-v-text2 leading-relaxed fluid-lead">
                {BRAND_COPY.missionBody}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-reveal>
              {BRAND_COPY.values.map(({ title, body }) => (
                <div key={title} className="p-6 bg-v-card border border-v-border hover:border-v-accent/50 transition-colors">
                  <div className="w-8 h-0.5 bg-v-accent mb-4" />
                  <h3 className="font-display text-xl tracking-wide text-v-text mb-2">{title}</h3>
                  <p className="text-sm text-v-muted leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-py section-fade-band">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16" data-reveal>
            <p className="section-label mb-2">— Milestones —</p>
            <h2 className="font-display fluid-h2-sm tracking-wide text-v-text">Our Journey</h2>
            <div className="vintage-divider w-40 mx-auto mt-4 text-v-accent" />
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-v-border" />
            <div className="space-y-9 sm:space-y-10">
              {TIMELINE.map(({ year, title, body }) => (
                <div key={year} className="flex gap-6 sm:gap-8 items-start" data-reveal>
                  <div className="relative flex-shrink-0 w-8 flex justify-center">
                    <div className="w-3 h-3 rounded-full bg-v-accent ring-4 ring-v-surface mt-1" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest text-v-accent uppercase mb-1">{year}</p>
                    <h3 className="font-display text-xl tracking-wide text-v-text mb-1">{title}</h3>
                    <p className="text-sm text-v-muted leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-py bg-v-bg">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16" data-reveal>
            <p className="section-label mb-2">— The Founder —</p>
            <h2 className="font-display fluid-h2-sm tracking-wide text-v-text">Meet the Rider Behind VRM</h2>
            <div className="vintage-divider w-40 mx-auto mt-4 text-v-accent" />
          </div>
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="group max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-8 sm:gap-10 text-center sm:text-left"
              data-reveal
            >
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex-shrink-0 rounded-full overflow-hidden border-2 border-v-border group-hover:border-v-accent transition-colors">
                <Image src={member.image} alt={member.name} fill className="object-cover saturate-[0.85]" sizes="192px" />
              </div>
              <div>
                <h3 className="font-display text-3xl tracking-wide text-v-text mb-1">{member.name}</h3>
                <p className="text-xs text-v-accent tracking-widest uppercase mb-4">{member.role}</p>
                <p className="text-sm sm:text-base text-v-muted leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="section-py section-fade-down">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16" data-reveal>
            <p className="section-label mb-2">— Gallery —</p>
            <h2 className="font-display fluid-h2-sm tracking-wide text-v-text">In the Wild</h2>
            <div className="vintage-divider w-40 mx-auto mt-4 text-v-accent" />
            <p className="mt-4 text-sm text-v-muted">Drag to explore — tap any photo to enlarge.</p>
          </div>
          <div
            className="relative w-full h-[70vh] min-h-[460px] overflow-hidden border border-v-border"
            data-reveal
          >
            <DomeGallery
              images={GALLERY_IMAGES}
              fit={0.6}
              grayscale={false}
              overlayBlurColor="var(--v-bg)"
              imageBorderRadius="16px"
              openedImageBorderRadius="16px"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
