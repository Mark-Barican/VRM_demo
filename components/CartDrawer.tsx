'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from './CartProvider';

const FREE_SHIP_THRESHOLD = 5000;

export default function CartDrawer() {
  const { lines, count, subtotal, isOpen, removeItem, setQty, closeCart } = useCart();

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeCart]);

  // Lock body scroll while open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);
  const shipProgress = Math.min(100, (subtotal / FREE_SHIP_THRESHOLD) * 100);

  return (
    <div
      className={`fixed inset-0 z-[120] overflow-hidden ${isOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-v-bg/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel — slides in from the right */}
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={`absolute top-0 right-0 bottom-0 w-full max-w-md bg-v-bg border-l border-v-border flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 h-16 border-b border-v-border shrink-0">
          <h2 className="font-display text-2xl tracking-wide text-v-text">
            Your Cart
            <span className="text-v-muted text-base ml-2">({count})</span>
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="w-9 h-9 flex items-center justify-center border border-v-border text-v-muted hover:border-v-accent hover:text-v-accent transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        {lines.length === 0 ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-4">
            <svg className="w-12 h-12 text-v-muted/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <p className="font-display text-2xl tracking-wide text-v-text">Your cart is empty</p>
            <p className="text-sm text-v-muted">Add a helmet to get started — vintage style, modern safety.</p>
            <Link href="/shop" onClick={closeCart} className="btn-vintage mt-2">
              Shop the Collection
            </Link>
          </div>
        ) : (
          <>
            {/* Free-shipping progress */}
            <div className="px-5 sm:px-6 py-4 border-b border-v-divider bg-v-surface/50">
              <p className="text-xs text-v-text2 mb-2">
                {remaining > 0 ? (
                  <>
                    Add <span className="text-v-accent font-semibold">₱{remaining.toLocaleString()}</span> more for free Metro Manila shipping
                  </>
                ) : (
                  <span className="text-v-accent font-semibold">You&apos;ve unlocked free Metro Manila shipping ✓</span>
                )}
              </p>
              <div className="h-1.5 bg-v-divider rounded-full overflow-hidden">
                <div
                  className="h-full bg-v-accent rounded-full transition-all duration-500"
                  style={{ width: `${shipProgress}%` }}
                />
              </div>
            </div>

            {/* Line items */}
            <ul className="flex-1 overflow-y-auto px-5 sm:px-6 divide-y divide-v-divider">
              {lines.map(({ helmet, qty }) => (
                <li key={helmet.id} className="py-4 flex gap-4">
                  <div className="relative w-20 h-20 shrink-0 bg-v-surface border border-v-border overflow-hidden">
                    <Image src={helmet.image} alt={helmet.name} fill sizes="80px" className="object-cover saturate-[0.9]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-display text-lg tracking-wide text-v-text leading-tight truncate">
                          {helmet.name}
                        </h3>
                        <p className="text-xs text-v-muted">{helmet.type} · {helmet.colorways[0]}</p>
                      </div>
                      <button
                        onClick={() => removeItem(helmet.id)}
                        aria-label={`Remove ${helmet.name}`}
                        className="text-v-muted hover:text-v-red transition-colors text-lg leading-none shrink-0"
                      >
                        ×
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty stepper */}
                      <div className="flex items-center border border-v-border">
                        <button
                          onClick={() => setQty(helmet.id, qty - 1)}
                          aria-label="Decrease quantity"
                          className="w-8 h-8 flex items-center justify-center text-v-text2 hover:text-v-accent hover:bg-v-surface transition-colors text-lg leading-none"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-body text-v-text tabular-nums">{qty}</span>
                        <button
                          onClick={() => setQty(helmet.id, qty + 1)}
                          aria-label="Increase quantity"
                          className="w-8 h-8 flex items-center justify-center text-v-text2 hover:text-v-accent hover:bg-v-surface transition-colors text-lg leading-none"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-display text-xl tracking-wide text-v-accent">
                        ₱{(helmet.price * qty).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer / summary */}
            <div className="border-t border-v-border px-5 sm:px-6 py-5 shrink-0 bg-v-bg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-v-text2">Subtotal</span>
                <span className="font-display text-2xl tracking-wide text-v-text">
                  ₱{subtotal.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-v-muted mb-4">Shipping &amp; taxes calculated at checkout.</p>
              <button className="btn-vintage w-full">Checkout</button>
              <button
                onClick={closeCart}
                className="w-full text-center mt-3 text-xs uppercase tracking-widest text-v-muted hover:text-v-accent transition-colors"
              >
                Continue shopping
              </button>
              <p className="text-center text-[0.7rem] text-v-muted/60 mt-3 font-serif italic">
                Demo store — checkout is not enabled.
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
