'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { createScrollReveal } from '@/lib/animations';
import { BRAND_COPY, TEAM_MEMBERS } from '@/lib/placeholders';

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
      <section className="pt-36 pb-20 bg-brand-black relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle at 70% 30%, #c9a84c 0%, transparent 60%)',
          }}
        />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative" data-reveal>
          <p className="text-xs tracking-[0.3em] text-brand-gold uppercase mb-4">Our Story</p>
          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl tracking-wide leading-none mb-8">
            {BRAND_COPY.aboutHeadline}
          </h1>
          <div className="w-20 h-0.5 bg-brand-gold mb-10" />
          <div className="text-brand-offwhite/60 leading-relaxed space-y-6 max-w-2xl text-lg">
            {BRAND_COPY.aboutBody.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Brand image */}
      <section className="bg-brand-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8" data-reveal>
          <div className="relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden border border-brand-gold/10">
            <Image
              src="https://picsum.photos/seed/vrm-about/1400/600"
              alt="VRM Manila workshop"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1400px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black/70 via-transparent to-brand-black/30" />
            <div className="absolute bottom-8 left-8">
              <p className="text-xs tracking-[0.3em] text-brand-gold uppercase mb-2">
                {/* TODO: replace with real content */}
                Est. 2018 — Manila, Philippines
              </p>
              <p className="font-display text-4xl text-brand-offwhite">
                {/* TODO: replace with real content */}
                Where Passion Meets Precision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-brand-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-reveal>
              <p className="text-xs tracking-[0.3em] text-brand-gold uppercase mb-4">
                {BRAND_COPY.missionHeadline}
              </p>
              <h2 className="font-display text-5xl tracking-wide mb-6">
                Protection Without Compromise.
              </h2>
              <p className="text-brand-offwhite/50 leading-relaxed text-lg">
                {BRAND_COPY.missionBody}
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-reveal>
              {BRAND_COPY.values.map(({ title, body }) => (
                <div
                  key={title}
                  className="p-6 rounded-xl border border-brand-gray/40 bg-brand-gray/10 hover:border-brand-gold/20 transition-colors"
                >
                  <div className="w-8 h-0.5 bg-brand-gold mb-4" />
                  <h3 className="font-display text-xl tracking-wide mb-2">{title}</h3>
                  <p className="text-xs text-brand-offwhite/40 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-gradient-to-b from-brand-black to-brand-gray/10">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16" data-reveal>
            <p className="text-xs tracking-[0.3em] text-brand-gold uppercase mb-3">Milestones</p>
            <h2 className="font-display text-5xl tracking-wide">Our Journey</h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-brand-gold/20" />
            <div className="space-y-10">
              {[
                { year: '2018', title: 'Founded', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                { year: '2019', title: 'First Collection', body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.' },
                { year: '2021', title: 'ECE Certification', body: 'At vero eos et accusamus et iusto odio dignissimos ducimus.' },
                { year: '2023', title: 'Cebu Expansion', body: 'Temporibus autem quibusdam et aut officiis debitis aut rerum.' },
                { year: '2025', title: 'Regional Launch', body: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque.' },
              ].map(({ year, title, body }) => (
                <div key={year} className="flex gap-8 items-start" data-reveal>
                  {/* Dot */}
                  <div className="relative flex-shrink-0 w-8 flex justify-center">
                    <div className="w-3 h-3 rounded-full bg-brand-gold ring-4 ring-brand-black mt-1" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest text-brand-gold uppercase mb-1">{year}</p>
                    <h3 className="font-display text-xl tracking-wide mb-1">{title}</h3>
                    {/* TODO: replace with real content */}
                    <p className="text-sm text-brand-offwhite/40">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-brand-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16" data-reveal>
            <p className="text-xs tracking-[0.3em] text-brand-gold uppercase mb-3">The People</p>
            <h2 className="font-display text-5xl tracking-wide">Meet the Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="group text-center"
                data-reveal
              >
                <div className="relative w-40 h-40 mx-auto mb-5 rounded-full overflow-hidden border-2 border-brand-gold/20 group-hover:border-brand-gold/50 transition-colors">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
                <h3 className="font-display text-2xl tracking-wide mb-1">{member.name}</h3>
                <p className="text-xs text-brand-gold tracking-widest uppercase mb-4">
                  {member.role}
                </p>
                <p className="text-sm text-brand-offwhite/40 leading-relaxed max-w-xs mx-auto">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
