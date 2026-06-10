'use client';

import gsap from 'gsap';
import { useLayoutEffect, useRef, useState } from 'react';

export default function Preloader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    let animationFrame = 0;

    const markLoaded = () => setLoaded(true);

    const checkReady = () => {
      if (document.readyState === 'complete') {
        markLoaded();
      } else {
        animationFrame = requestAnimationFrame(checkReady);
      }
    };

    checkReady();

    // Safety net: never let the intro block interaction for more than ~1.8s,
    // even if a slow/blocked asset keeps readyState from reaching "complete".
    const fallback = window.setTimeout(markLoaded, 1800);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(fallback);
    };
  }, []);

  useLayoutEffect(() => {
    if (loaded && loaderRef.current && textRef.current) {
      // Stop intercepting clicks the instant the intro begins to leave — not
      // only when the animation finishes — so links are never dead mid-exit.
      gsap.set(loaderRef.current, { pointerEvents: 'none' });

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: () => {
          gsap.set(loaderRef.current, { display: 'none' });
        },
      });

      tl.to(textRef.current, { scale: 5, opacity: 0, duration: 0.8 });
      tl.to(
        loaderRef.current,
        {
          y: '-105%',
          borderBottomLeftRadius: '50% 20%',
          borderBottomRightRadius: '50% 20%',
          duration: 1,
        },
        '<'
      );
    }
  }, [loaded]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1A0F07] shadow-2xl"
      style={{
        transform: 'translateY(0%)',
        borderBottomLeftRadius: '0%',
        borderBottomRightRadius: '0%',
      }}
    >
      <div ref={textRef} className="flex flex-col items-center gap-2 text-center">
        <span className="font-display text-5xl sm:text-6xl uppercase tracking-[0.15em] text-[#D4A832]">
          VRM 1976
        </span>
        <span className="font-body text-[0.65rem] sm:text-xs uppercase tracking-[0.4em] text-[#F5EFE0]/60 animate-pulse">
          Vintage Rider Manila
        </span>
      </div>
    </div>
  );
}
