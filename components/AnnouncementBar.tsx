'use client';

import { useEffect, useState } from 'react';

// Slim, persistent promo strip pinned above the header. Messages rotate on a
// gentle fade so the bar stays one line tall on every breakpoint.
const MESSAGES = [
  'Free shipping across Metro Manila via Grab & Lalamove',
  'TIS-Rated (≈ ECE) · DTI Conformity · Valid ICC Sticker on every helmet',
  'Now shipping nationwide via LBC — also on Lazada & Shopee',
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      // Fade out, swap message, fade back in.
      setVisible(false);
      const swap = setTimeout(() => {
        setIndex((i) => (i + 1) % MESSAGES.length);
        setVisible(true);
      }, 300);
      return () => clearTimeout(swap);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-9 bg-v-accent text-v-bg flex items-center overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto w-full px-5 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left tag — decorative, hidden on small screens */}
        <span className="hidden lg:block font-serif italic text-xs/none opacity-80 whitespace-nowrap">
          Vintage Rider Manila · Est. 2018
        </span>

        {/* Rotating message */}
        <p
          className={`flex-1 text-center text-[0.7rem] sm:text-xs font-body font-medium tracking-wide truncate transition-opacity duration-300 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          aria-live="polite"
        >
          {MESSAGES[index]}
        </p>

        {/* Right tag — decorative, hidden on small screens */}
        <span className="hidden lg:block font-display text-xs tracking-[0.2em] opacity-80 whitespace-nowrap">
          MNL · PH
        </span>
      </div>
    </div>
  );
}
