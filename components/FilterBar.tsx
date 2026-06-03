'use client';

import { type HelmetCategory } from '@/lib/placeholders';

type Filter = 'All' | HelmetCategory;

const FILTERS: Filter[] = ['All', 'Full Face', 'Open Face', 'Modular'];

interface FilterBarProps {
  active: Filter;
  onChange: (filter: Filter) => void;
}

export default function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div
      role="group"
      aria-label="Filter helmets by category"
      className="flex flex-wrap items-center gap-2"
    >
      {FILTERS.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`px-5 py-2 text-sm font-semibold tracking-wide rounded-full border transition-all duration-200 ${
            active === filter
              ? 'bg-brand-gold text-brand-black border-brand-gold'
              : 'bg-transparent text-brand-offwhite/60 border-brand-gray-mid hover:border-brand-gold/50 hover:text-brand-offwhite'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export type { Filter };
