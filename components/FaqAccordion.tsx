'use client';

import { useState } from 'react';
import type { FaqItem } from '@/lib/placeholders';

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  // Open the first question by default; clicking a row toggles it.
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-v-divider border-y border-v-divider">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id}>
            <button
              onClick={() => setOpenId(open ? null : item.id)}
              aria-expanded={open}
              className="flex items-center justify-between w-full py-5 text-left group gap-4"
            >
              <span
                className={`font-display text-xl sm:text-2xl tracking-wide transition-colors duration-200 ${
                  open ? 'text-v-accent' : 'text-v-text group-hover:text-v-accent'
                }`}
              >
                {item.question}
              </span>
              <span
                className={`relative w-6 h-6 shrink-0 flex items-center justify-center transition-colors duration-200 ${
                  open ? 'text-v-accent' : 'text-v-muted group-hover:text-v-accent'
                }`}
              >
                {/* Plus/minus morph */}
                <span className="absolute w-4 h-0.5 bg-current" />
                <span
                  className={`absolute w-0.5 h-4 bg-current transition-transform duration-300 ${
                    open ? 'scale-y-0' : 'scale-y-100'
                  }`}
                />
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                open ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="font-body text-v-muted leading-relaxed max-w-2xl pr-8">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
