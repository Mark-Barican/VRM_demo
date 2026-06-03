'use client';

import { useEffect, useRef, useState } from 'react';
import { createScrollReveal } from '@/lib/animations';
import { BRANCHES } from '@/lib/placeholders';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
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
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace with real form submission (email service / backend)
    console.log('VRM Contact Form submission:', form);
    setSubmitted(true);
  };

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="pt-36 pb-16 bg-brand-black" data-reveal>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-xs tracking-[0.3em] text-brand-gold uppercase mb-4">Get in Touch</p>
          <h1 className="font-display text-6xl sm:text-7xl tracking-wide mb-6">Contact Us</h1>
          <p className="text-brand-offwhite/50 max-w-xl leading-relaxed text-lg">
            {/* TODO: replace with real content */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Whether you have questions
            about our helmets or need support, we&apos;re here to help.
          </p>
        </div>
      </section>

      <section className="py-12 bg-brand-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div data-reveal>
            <h2 className="font-display text-3xl tracking-wide mb-8">Send a Message</h2>

            {submitted ? (
              <div className="p-8 rounded-2xl border border-brand-gold/30 bg-brand-gold/5 text-center">
                <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl tracking-wide text-brand-gold mb-2">
                  Message Sent!
                </h3>
                <p className="text-brand-offwhite/50 text-sm">
                  {/* TODO: replace with real content */}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. We&apos;ll get back to
                  you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="mt-6 px-6 py-2 text-sm border border-brand-gold text-brand-gold rounded hover:bg-brand-gold hover:text-brand-black transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs tracking-wider text-brand-offwhite/50 uppercase mb-2">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Juan dela Cruz"
                      className="w-full bg-brand-gray/30 border border-brand-gray-mid/50 rounded-lg px-4 py-3 text-sm text-brand-offwhite placeholder:text-brand-offwhite/20 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs tracking-wider text-brand-offwhite/50 uppercase mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="juan@example.com"
                      className="w-full bg-brand-gray/30 border border-brand-gray-mid/50 rounded-lg px-4 py-3 text-sm text-brand-offwhite placeholder:text-brand-offwhite/20 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/20 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs tracking-wider text-brand-offwhite/50 uppercase mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full bg-brand-gray/30 border border-brand-gray-mid/50 rounded-lg px-4 py-3 text-sm text-brand-offwhite focus:outline-none focus:border-brand-gold/50 transition-colors appearance-none"
                  >
                    <option value="">Select a topic...</option>
                    <option value="product">Product Inquiry</option>
                    <option value="order">Order Support</option>
                    <option value="warranty">Warranty & Returns</option>
                    <option value="wholesale">Wholesale / Dealer</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs tracking-wider text-brand-offwhite/50 uppercase mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    className="w-full bg-brand-gray/30 border border-brand-gray-mid/50 rounded-lg px-4 py-3 text-sm text-brand-offwhite placeholder:text-brand-offwhite/20 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/20 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-brand-gold text-brand-black font-semibold tracking-wider rounded-lg hover:bg-brand-gold-light transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Locations */}
          <div>
            <h2 className="font-display text-3xl tracking-wide mb-8" data-reveal>Our Locations</h2>

            <div className="space-y-6 mb-10">
              {BRANCHES.map((branch) => (
                <div
                  key={branch.id}
                  className="p-6 rounded-xl border border-brand-gray/40 bg-brand-gray/10 hover:border-brand-gold/20 transition-colors"
                  data-reveal
                >
                  <h3 className="font-display text-xl tracking-wide mb-3 text-brand-gold">
                    {branch.name}
                  </h3>
                  <div className="space-y-2 text-sm text-brand-offwhite/50">
                    <p className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-brand-gold/60 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {branch.address}
                    </p>
                    <p className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-brand-gold/60 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {branch.hours}
                    </p>
                    <p className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-brand-gold/60 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {branch.phone}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Maps placeholder */}
            <div className="rounded-xl overflow-hidden border border-brand-gray/40" data-reveal>
              {/* TODO: replace with real Google Maps embed */}
              <iframe
                title="VRM Manila BGC Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.6784936817285!2d121.03982731483908!3d14.550560489830226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c90264a0af5f%3A0x2b9e5e9b94a53d8!2sBonifacio%20Global%20City%2C%20Taguig%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1620000000000!5m2!1sen!2sph"
                width="100%"
                height="260"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.7)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
