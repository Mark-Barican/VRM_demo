'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { HELMETS, type Helmet } from '@/lib/placeholders';

// Persisted cart line — just an id + quantity. The full helmet is resolved
// from HELMETS at read time so we never store stale product data.
interface StoredLine {
  id: string;
  qty: number;
}

export interface CartLine {
  helmet: Helmet;
  qty: number;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  addItem: (helmetId: string, qty?: number) => void;
  removeItem: (helmetId: string) => void;
  setQty: (helmetId: string, qty: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'vrm-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<StoredLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount (after first paint to avoid SSR mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setStored(JSON.parse(raw));
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  // Persist on change.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      /* storage unavailable — ignore */
    }
  }, [stored, hydrated]);

  const addItem = useCallback((helmetId: string, qty = 1) => {
    setStored((prev) => {
      const existing = prev.find((l) => l.id === helmetId);
      if (existing) {
        return prev.map((l) => (l.id === helmetId ? { ...l, qty: l.qty + qty } : l));
      }
      return [...prev, { id: helmetId, qty }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback(
    (helmetId: string) => setStored((prev) => prev.filter((l) => l.id !== helmetId)),
    [],
  );

  const setQty = useCallback((helmetId: string, qty: number) => {
    setStored((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== helmetId)
        : prev.map((l) => (l.id === helmetId ? { ...l, qty } : l)),
    );
  }, []);

  const clear = useCallback(() => setStored([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const lines = stored
      .map((l) => {
        const helmet = HELMETS.find((h) => h.id === l.id);
        return helmet ? { helmet, qty: l.qty } : null;
      })
      .filter((l): l is CartLine => l !== null);

    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((s, l) => s + l.helmet.price * l.qty, 0),
      isOpen,
      addItem,
      removeItem,
      setQty,
      clear,
      openCart,
      closeCart,
    };
  }, [stored, isOpen, addItem, removeItem, setQty, clear, openCart, closeCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
