'use client';

import { type HelmetCategory } from '@/lib/placeholders';

type Filter = 'All' | HelmetCategory;

const FILTERS: Filter[] = ['All', 'Classic', 'Modern Retro', 'Kids', 'E-Bike'];

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
          className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-body font-semibold tracking-wide border transition-colors duration-200 ${
            active === filter
              ? 'bg-v-accent text-v-bg border-v-accent'
              : 'bg-transparent text-v-text2 border-v-border hover:border-v-accent hover:text-v-accent'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export type { Filter };
