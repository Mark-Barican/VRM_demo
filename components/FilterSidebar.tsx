'use client';

import { useState, type ReactNode } from 'react';
import {
  SIZES,
  CERTIFICATIONS,
  HELMET_TYPES,
  SHELL_COLORS,
  FINISHES,
  AVAILABILITIES,
  PRICE_BOUNDS,
  SHELL_COLOR_SWATCHES,
  type HelmetSize,
  type Certification,
  type HelmetType,
  type ShellColor,
  type Finish,
  type Availability,
} from '@/lib/placeholders';

// ── Filter state shape, shared with the collection page ─────────────────────
export interface FilterState {
  priceMin: number;
  priceMax: number;
  sizes: HelmetSize[];
  certifications: Certification[];
  types: HelmetType[];
  shellColors: ShellColor[];
  finishes: Finish[];
  availability: Availability[];
}

export const DEFAULT_FILTERS: FilterState = {
  priceMin: PRICE_BOUNDS.min,
  priceMax: PRICE_BOUNDS.max,
  sizes: [],
  certifications: [],
  types: [],
  shellColors: [],
  finishes: [],
  availability: [],
};

/** Number of active (non-default) filter facets — drives the badge count. */
export function activeFilterCount(f: FilterState): number {
  return (
    (f.priceMin !== PRICE_BOUNDS.min || f.priceMax !== PRICE_BOUNDS.max ? 1 : 0) +
    f.sizes.length +
    f.certifications.length +
    f.types.length +
    f.shellColors.length +
    f.finishes.length +
    f.availability.length
  );
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  /** When provided, renders a drawer header with a close button (mobile). */
  onClose?: () => void;
}

export default function FilterSidebar({ filters, onChange, onClose }: FilterSidebarProps) {
  // Generic multi-select toggle for the array-valued facets.
  function toggle<K extends keyof FilterState>(
    key: K,
    value: FilterState[K] extends (infer U)[] ? U : never,
  ) {
    const arr = filters[key] as unknown as unknown[];
    const next = arr.includes(value)
      ? arr.filter((v) => v !== value)
      : [...arr, value];
    onChange({ ...filters, [key]: next } as FilterState);
  }

  const activeCount = activeFilterCount(filters);

  return (
    <div className="flex flex-col">
      {/* Header (sticky on mobile drawer) */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h2 className="font-display text-2xl tracking-wide text-v-text">Filters</h2>
          {activeCount > 0 && (
            <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-[0.65rem] font-body font-semibold bg-v-accent text-v-bg rounded-full">
              {activeCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {activeCount > 0 && (
            <button
              onClick={() => onChange(DEFAULT_FILTERS)}
              className="text-xs font-body uppercase tracking-widest text-v-muted hover:text-v-accent transition-colors"
            >
              Clear all
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close filters"
              className="lg:hidden w-8 h-8 flex items-center justify-center border border-v-border text-v-muted hover:border-v-accent hover:text-v-accent transition-colors text-lg leading-none"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Price range */}
      <FilterGroup title="Price Range" defaultOpen>
        <PriceRange filters={filters} onChange={onChange} />
      </FilterGroup>

      {/* Helmet Type */}
      <FilterGroup title="Helmet Type" defaultOpen>
        <CheckList
          options={HELMET_TYPES}
          selected={filters.types}
          onToggle={(v) => toggle('types', v)}
        />
      </FilterGroup>

      {/* Size */}
      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => {
            const on = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggle('sizes', size)}
                aria-pressed={on}
                className={`min-w-[2.75rem] px-2 py-2 text-xs font-body font-semibold tracking-wide border transition-colors duration-200 ${
                  on
                    ? 'bg-v-accent text-v-bg border-v-accent'
                    : 'bg-transparent text-v-text2 border-v-border hover:border-v-accent hover:text-v-accent'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      {/* Certification */}
      <FilterGroup title="Certification">
        <CheckList
          options={CERTIFICATIONS}
          selected={filters.certifications}
          onToggle={(v) => toggle('certifications', v)}
        />
      </FilterGroup>

      {/* Shell Color */}
      <FilterGroup title="Shell Color">
        <div className="space-y-2.5">
          {SHELL_COLORS.map((color) => {
            const on = filters.shellColors.includes(color);
            return (
              <button
                key={color}
                onClick={() => toggle('shellColors', color)}
                aria-pressed={on}
                className="flex items-center gap-3 w-full group"
              >
                <span
                  className={`w-5 h-5 rounded-full border transition-all duration-200 ${
                    on ? 'ring-2 ring-v-accent ring-offset-2 ring-offset-v-bg border-transparent' : 'border-v-border'
                  }`}
                  style={{ backgroundColor: SHELL_COLOR_SWATCHES[color] }}
                />
                <span
                  className={`text-sm font-body transition-colors ${
                    on ? 'text-v-accent' : 'text-v-text2 group-hover:text-v-accent'
                  }`}
                >
                  {color}
                </span>
              </button>
            );
          })}
        </div>
      </FilterGroup>

      {/* Finish */}
      <FilterGroup title="Finish">
        <CheckList
          options={FINISHES}
          selected={filters.finishes}
          onToggle={(v) => toggle('finishes', v)}
        />
      </FilterGroup>

      {/* Availability */}
      <FilterGroup title="Availability">
        <CheckList
          options={AVAILABILITIES}
          selected={filters.availability}
          onToggle={(v) => toggle('availability', v)}
        />
      </FilterGroup>
    </div>
  );
}

// ── Collapsible group ───────────────────────────────────────────────────────
function FilterGroup({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-v-divider py-4 first-of-type:border-t-0">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center justify-between w-full group"
      >
        <span className="font-body text-xs uppercase tracking-[0.2em] text-v-text2 group-hover:text-v-accent transition-colors">
          {title}
        </span>
        <svg
          className={`w-4 h-4 text-v-muted group-hover:text-v-accent transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

// ── Reusable check list ─────────────────────────────────────────────────────
function CheckList<T extends string>({
  options,
  selected,
  onToggle,
}: {
  options: readonly T[];
  selected: T[];
  onToggle: (value: T) => void;
}) {
  return (
    <ul className="space-y-2.5">
      {options.map((option) => {
        const on = selected.includes(option);
        return (
          <li key={option}>
            <button
              onClick={() => onToggle(option)}
              aria-pressed={on}
              className="flex items-center gap-3 w-full group"
            >
              <span
                className={`w-4 h-4 shrink-0 border flex items-center justify-center transition-colors duration-200 ${
                  on ? 'bg-v-accent border-v-accent' : 'border-v-border group-hover:border-v-accent'
                }`}
              >
                {on && (
                  <svg className="w-3 h-3 text-v-bg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span
                className={`text-sm font-body transition-colors ${
                  on ? 'text-v-accent' : 'text-v-text2 group-hover:text-v-accent'
                }`}
              >
                {option}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

// ── Dual price-range slider ─────────────────────────────────────────────────
function PriceRange({
  filters,
  onChange,
}: {
  filters: FilterState;
  onChange: (next: FilterState) => void;
}) {
  const { min, max } = PRICE_BOUNDS;
  const step = 50;

  const setMin = (value: number) =>
    onChange({ ...filters, priceMin: Math.min(value, filters.priceMax - step) });
  const setMax = (value: number) =>
    onChange({ ...filters, priceMax: Math.max(value, filters.priceMin + step) });

  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="font-display text-lg tracking-wide text-v-accent">
          ₱{filters.priceMin.toLocaleString()}
        </span>
        <span className="text-v-muted text-sm">—</span>
        <span className="font-display text-lg tracking-wide text-v-accent">
          ₱{filters.priceMax.toLocaleString()}
        </span>
      </div>

      {/* Track with two overlaid range thumbs */}
      <div className="relative h-5 flex items-center">
        <div className="absolute inset-x-0 h-1 bg-v-divider rounded-full" />
        <div
          className="absolute h-1 bg-v-accent rounded-full"
          style={{ left: `${pct(filters.priceMin)}%`, right: `${100 - pct(filters.priceMax)}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={filters.priceMin}
          onChange={(e) => setMin(Number(e.target.value))}
          aria-label="Minimum price"
          className="price-thumb absolute inset-x-0 w-full appearance-none bg-transparent pointer-events-none"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={filters.priceMax}
          onChange={(e) => setMax(Number(e.target.value))}
          aria-label="Maximum price"
          className="price-thumb absolute inset-x-0 w-full appearance-none bg-transparent pointer-events-none"
        />
      </div>
    </div>
  );
}
