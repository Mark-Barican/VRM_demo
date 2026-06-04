'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { createScrollReveal } from '@/lib/animations';
import { BRANCHES, CONTACT_INFO } from '@/lib/placeholders';

const VrmMap = dynamic(() => import('@/components/VrmMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[320px] sm:h-[380px] lg:h-[440px] w-full flex items-center justify-center bg-v-card border border-v-border">
      <p className="font-display text-v-accent/50 tracking-widest text-sm animate-pulse">LOADING MAP...</p>
    </div>
  ),
});

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;
    const nodes = el.querySelectorAll('[data-reveal]');
    const cleanup = createScrollReveal(nodes);
    return cleanup;
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('VRM Contact Form submission:', form);
    setSubmitted(true);
  };

  const inputClass =
    'w-full bg-v-bg border border-v-border px-4 py-3 text-sm text-v-text placeholder:text-v-muted/50 focus:outline-none focus:border-v-accent focus:ring-1 focus:ring-v-accent/30 transition-colors';

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="pt-28 sm:pt-36 pb-12 sm:pb-16 bg-v-bg" data-reveal>
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          <p className="section-label mb-3">— Get in Touch —</p>
          <h1 className="font-display fluid-h1 tracking-wide text-v-text mb-5">
            Contact Us
          </h1>
          <p className="font-serif italic text-v-text2 max-w-xl leading-relaxed fluid-lead">
            Whether you have questions about our helmets or need help with an order, the Vintage Rider
            Manila team is here for you. Visit a branch, message us on socials, or drop a note below.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-12 section-fade-down">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div data-reveal>
            <h2 className="font-display fluid-h3 tracking-wide text-v-text mb-7">Send a Message</h2>

            {submitted ? (
              <div className="p-8 border border-v-accent/40 bg-v-card text-center">
                <div className="w-16 h-16 border border-v-accent flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-v-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl tracking-wide text-v-accent mb-2">Message Sent!</h3>
                <p className="text-v-muted text-sm">
                  Salamat! We&apos;ve received your message and will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="btn-outline-vintage text-sm mt-6"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs tracking-wider text-v-muted uppercase mb-2">Full Name *</label>
                    <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Juan dela Cruz" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs tracking-wider text-v-muted uppercase mb-2">Email Address *</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="juan@example.com" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs tracking-wider text-v-muted uppercase mb-2">Subject</label>
                  <select id="subject" name="subject" value={form.subject} onChange={handleChange} className={`${inputClass} appearance-none`}>
                    <option value="">Select a topic...</option>
                    <option value="product">Product Inquiry</option>
                    <option value="order">Order Support</option>
                    <option value="warranty">Warranty &amp; Returns</option>
                    <option value="wholesale">Wholesale / Dealer</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs tracking-wider text-v-muted uppercase mb-2">Message *</label>
                  <textarea id="message" name="message" required rows={6} value={form.message} onChange={handleChange} placeholder="Tell us how we can help..." className={`${inputClass} resize-none`} />
                </div>

                <button type="submit" className="btn-vintage w-full justify-center">
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Locations */}
          <div>
            <h2 className="font-display fluid-h3 tracking-wide text-v-text mb-7" data-reveal>Our Locations</h2>

            <div className="space-y-5 mb-8">
              {BRANCHES.map((branch) => (
                <div
                  key={branch.id}
                  className="p-6 bg-v-card border border-v-border hover:border-v-accent/50 transition-colors"
                  data-reveal
                >
                  <h3 className="font-display text-xl tracking-wide mb-3 text-v-accent">{branch.name}</h3>
                  <div className="space-y-2 text-sm text-v-text2">
                    <p className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-v-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {branch.address}
                    </p>
                    <p className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-v-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {branch.hours}
                    </p>
                    <p className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-v-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l1.3-3.9A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {branch.contact}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Ways to order */}
            <div className="p-6 bg-v-card border border-v-border mb-8" data-reveal>
              <h3 className="font-display text-xl tracking-wide mb-4 text-v-accent">Ways to Order</h3>
              <dl className="space-y-3 text-sm text-v-text2">
                <div className="flex flex-col sm:flex-row sm:gap-3">
                  <dt className="w-28 flex-shrink-0 text-v-muted uppercase tracking-wider text-xs sm:pt-0.5">Online</dt>
                  <dd>
                    <a href={CONTACT_INFO.instagram.url} target="_blank" rel="noopener noreferrer" className="text-v-text2 hover:text-v-accent transition-colors">Instagram {CONTACT_INFO.instagram.handle}</a>
                    {' · '}
                    <a href={CONTACT_INFO.facebook.url} target="_blank" rel="noopener noreferrer" className="text-v-text2 hover:text-v-accent transition-colors">Facebook</a>
                    {' · '}
                    <span>{CONTACT_INFO.website}</span>
                  </dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-3">
                  <dt className="w-28 flex-shrink-0 text-v-muted uppercase tracking-wider text-xs sm:pt-0.5">Resellers</dt>
                  <dd>{CONTACT_INFO.resellers.join(' · ')}</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-3">
                  <dt className="w-28 flex-shrink-0 text-v-muted uppercase tracking-wider text-xs sm:pt-0.5">Payment</dt>
                  <dd>{CONTACT_INFO.payments.join(' · ')}</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-3">
                  <dt className="w-28 flex-shrink-0 text-v-muted uppercase tracking-wider text-xs sm:pt-0.5">Delivery</dt>
                  <dd>{CONTACT_INFO.delivery.join(' · ')}</dd>
                </div>
              </dl>
            </div>

            {/* mapcn interactive map */}
            <div className="relative border border-v-border overflow-hidden" data-reveal>
              <span className="absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-v-accent z-10 pointer-events-none" />
              <span className="absolute top-0 right-0 w-7 h-7 border-t-2 border-r-2 border-v-accent z-10 pointer-events-none" />
              <span className="absolute bottom-0 left-0 w-7 h-7 border-b-2 border-l-2 border-v-accent z-10 pointer-events-none" />
              <span className="absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 border-v-accent z-10 pointer-events-none" />
              <VrmMap />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
