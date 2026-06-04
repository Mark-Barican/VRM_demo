'use client';

import { useEffect, useRef, useState } from 'react';
import { SORT_OPTIONS, type SortOption } from '@/lib/placeholders';

interface SortDropdownProps {
  value: SortOption['value'];
  onChange: (value: SortOption['value']) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0];

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2.5 px-3 sm:px-4 py-2.5 border border-v-border bg-v-card text-v-text2 hover:border-v-accent hover:text-v-accent transition-colors duration-200 min-w-0 sm:min-w-[12rem] max-w-full justify-between"
      >
        <span className="flex items-center gap-2 min-w-0">
          <span className="text-xs uppercase tracking-widest text-v-muted shrink-0">Sort</span>
          <span className="text-sm font-body font-medium truncate">{current.label}</span>
        </span>
        <svg
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-2 w-full min-w-[13rem] z-30 bg-v-card border border-v-border shadow-lg overflow-hidden"
        >
          {SORT_OPTIONS.map((option) => {
            const active = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={active}>
                <button
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-4 py-2.5 text-sm font-body text-left transition-colors duration-150 ${
                    active
                      ? 'bg-v-accent/10 text-v-accent'
                      : 'text-v-text2 hover:bg-v-surface hover:text-v-accent'
                  }`}
                >
                  {option.label}
                  {active && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
