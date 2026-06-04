'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { animateModalOpen, animateModalClose } from '@/lib/animations';
import type { Helmet } from '@/lib/placeholders';
import { useCart } from './CartProvider';

const HelmetViewer = dynamic(() => import('./HelmetViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <p className="font-display text-v-accent/60 tracking-widest text-sm animate-pulse">
        LOADING 3D MODEL...
      </p>
    </div>
  ),
});

interface ViewerModalProps {
  helmet: Helmet | null;
  onClose: () => void;
}

export default function ViewerModal({ helmet, onClose }: ViewerModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  useEffect(() => {
    if (helmet && overlayRef.current && panelRef.current) {
      animateModalOpen(overlayRef.current, panelRef.current);
    }
  }, [helmet]);

  const handleClose = () => {
    if (!overlayRef.current || !panelRef.current) { onClose(); return; }
    animateModalClose(overlayRef.current, panelRef.current, onClose);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [helmet]);

  useEffect(() => {
    document.body.style.overflow = helmet ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [helmet]);

  if (!helmet) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-v-bg/80 backdrop-blur-sm"
      onClick={(e) => e.target === overlayRef.current && handleClose()}
      style={{ opacity: 0 }}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-4xl bg-v-surface border border-v-border overflow-hidden flex flex-col"
        style={{ height: 'min(80vh, 640px)', opacity: 0 }}
      >
        {/* Vintage corner accents */}
        <span className="absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-v-accent z-10 pointer-events-none" />
        <span className="absolute top-0 right-0 w-7 h-7 border-t-2 border-r-2 border-v-accent z-10 pointer-events-none" />
        <span className="absolute bottom-0 left-0 w-7 h-7 border-b-2 border-l-2 border-v-accent z-10 pointer-events-none" />
        <span className="absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 border-v-accent z-10 pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-v-border">
          <div>
            <p className="font-serif italic text-xs text-v-accent mb-0.5">{helmet.category}</p>
            <h2 className="font-display text-2xl tracking-wide text-v-text">{helmet.name}</h2>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-display text-2xl text-v-accent">₱{helmet.price.toLocaleString()}</p>
            <button
              onClick={handleClose}
              aria-label="Close viewer"
              className="w-9 h-9 flex items-center justify-center border border-v-border text-v-muted hover:border-v-accent hover:text-v-accent transition-colors duration-200 text-xl leading-none"
            >
              ×
            </button>
          </div>
        </div>

        {/* 3D Viewer */}
        <div className="flex-1 relative bg-v-bg">
          <HelmetViewer autoRotate={true} className="absolute inset-0" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
            <p className="font-serif italic text-xs text-v-muted/50 tracking-wide text-center">
              Drag to rotate · Scroll to zoom
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-6 py-4 border-t border-v-border flex items-center justify-between gap-4 bg-v-surface">
          <div>
            <p className="text-xs text-v-muted mb-1">
              Available in: {helmet.colorways.join(', ')}
            </p>
            <p className="text-xs text-v-muted/60">TIS-Rated (≈ ECE) · Valid ICC Sticker · DTI Conformity</p>
          </div>
          <button
            onClick={() => {
              if (helmet.availability === 'Out of Stock') return;
              addItem(helmet.id);
              handleClose();
            }}
            disabled={helmet.availability === 'Out of Stock'}
            className={
              helmet.availability === 'Out of Stock'
                ? 'btn-outline-vintage text-sm opacity-60 cursor-not-allowed'
                : 'btn-vintage text-sm'
            }
          >
            {helmet.availability === 'Out of Stock'
              ? 'Sold Out'
              : helmet.availability === 'Made to Order'
                ? 'Pre-Order'
                : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
