'use client';

import anime from 'animejs';

// Hero section: staggered fade+slide entrance
export function animateHeroEntrance(
  headline: Element | null,
  subtext: Element | null,
  cta: Element | null,
) {
  if (!headline && !subtext && !cta) return;

  const targets = [headline, subtext, cta].filter(Boolean) as Element[];

  anime.set(targets, { opacity: 0, translateY: 40 });

  anime({
    targets,
    opacity: [0, 1],
    translateY: [40, 0],
    easing: 'easeOutExpo',
    duration: 900,
    delay: anime.stagger(150, { start: 200 }),
  });
}

// Section reveal via IntersectionObserver
export function createScrollReveal(
  elements: NodeListOf<Element> | Element[],
  options?: { translateY?: number; duration?: number; delay?: number },
) {
  const { translateY = 30, duration = 800, delay = 0 } = options ?? {};

  const els = Array.from(elements);
  anime.set(els, { opacity: 0, translateY });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: entry.target,
            opacity: [0, 1],
            translateY: [translateY, 0],
            easing: 'easeOutExpo',
            duration,
            delay,
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  els.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}

// HelmetCard hover: scale + shadow lift
export function animateCardHover(card: Element, entering: boolean) {
  anime({
    targets: card,
    scale: entering ? 1.03 : 1,
    easing: 'easeOutQuad',
    duration: 220,
  });
}

// FilterBar: cross-fade filtered items
export function animateFilterTransition(
  hidingItems: Element[],
  showingItems: Element[],
  onComplete?: () => void,
) {
  if (hidingItems.length === 0) {
    anime.set(showingItems, { opacity: 0, scale: 0.96 });
    anime({
      targets: showingItems,
      opacity: [0, 1],
      scale: [0.96, 1],
      easing: 'easeOutQuad',
      duration: 300,
      delay: anime.stagger(50),
      complete: onComplete,
    });
    return;
  }

  anime({
    targets: hidingItems,
    opacity: [1, 0],
    scale: [1, 0.96],
    easing: 'easeInQuad',
    duration: 200,
    complete: () => {
      anime.set(showingItems, { opacity: 0, scale: 0.96 });
      anime({
        targets: showingItems,
        opacity: [0, 1],
        scale: [0.96, 1],
        easing: 'easeOutQuad',
        duration: 300,
        delay: anime.stagger(50),
        complete: onComplete,
      });
    },
  });
}

// ViewerModal: slide-up open
export function animateModalOpen(overlay: Element, panel: Element) {
  anime.set(overlay, { opacity: 0 });
  anime.set(panel, { opacity: 0, translateY: 60 });

  anime({
    targets: overlay,
    opacity: [0, 1],
    easing: 'easeOutQuad',
    duration: 300,
  });

  anime({
    targets: panel,
    opacity: [0, 1],
    translateY: [60, 0],
    easing: 'easeOutExpo',
    duration: 500,
  });
}

// ViewerModal: fade-out close
export function animateModalClose(overlay: Element, panel: Element, onComplete?: () => void) {
  anime({
    targets: panel,
    opacity: [1, 0],
    translateY: [0, 40],
    easing: 'easeInQuad',
    duration: 300,
  });

  anime({
    targets: overlay,
    opacity: [1, 0],
    easing: 'easeInQuad',
    duration: 350,
    complete: onComplete,
  });
}

// Mobile nav: slide down open / slide up close
export function animateMobileNav(menu: Element, open: boolean) {
  anime({
    targets: menu,
    height: open ? [0, 'auto'] : ['auto', 0],
    opacity: open ? [0, 1] : [1, 0],
    easing: open ? 'easeOutExpo' : 'easeInQuad',
    duration: 350,
  });
}
