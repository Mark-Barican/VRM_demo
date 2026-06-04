'use client';

import LogoLoop from './LogoLoop';

// Placeholder partner "brands". Each logo is a single inline SVG drawn with
// `currentColor`, so it inherits the marquee's text color (set to var(--v-text)
// below). That renders the logos near-black in light mode and near-white in dark
// mode automatically — no duplicate assets, driven by the site's `.dark` toggle.
// Swap these for real logos later, e.g. { src: '/logos/partner.svg', alt: '...' }.
const FONT = "'Oswald', 'Arial Narrow', sans-serif";
const svgStyle = { height: '1em', width: 'auto', display: 'block' };

const PARTNER_LOGOS = [
  {
    title: 'MotoWerks',
    node: (
      <svg viewBox="0 0 196 40" style={svgStyle} fill="currentColor" role="img" aria-label="MotoWerks">
        <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M22 8 L12 22 L19 22 L17 32 L28 17 L21 17 Z" />
        <text x="46" y="27" fontFamily={FONT} fontSize="21" fontWeight="600" letterSpacing="1.5">MOTOWERKS</text>
      </svg>
    ),
  },
  {
    title: 'Apex Moto',
    node: (
      <svg viewBox="0 0 184 40" style={svgStyle} fill="currentColor" role="img" aria-label="Apex Moto">
        <path d="M20 6 L35 31 L5 31 Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M20 17 L27 29 L13 29 Z" />
        <text x="46" y="27" fontFamily={FONT} fontSize="21" fontWeight="600" letterSpacing="1.5">APEX MOTO</text>
      </svg>
    ),
  },
  {
    title: 'RideHaus',
    node: (
      <svg viewBox="0 0 176 40" style={svgStyle} fill="currentColor" role="img" aria-label="RideHaus">
        <path d="M20 5 L34 10 V19 C34 27 28 32 20 36 C12 32 6 27 6 19 V10 Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M20 13 L25 22 H15 Z" />
        <text x="46" y="27" fontFamily={FONT} fontSize="21" fontWeight="600" letterSpacing="1.5">RIDEHAUS</text>
      </svg>
    ),
  },
  {
    title: 'Torque Co',
    node: (
      <svg viewBox="0 0 186 40" style={svgStyle} fill="currentColor" role="img" aria-label="Torque Co">
        <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M20 3 V8" /><path d="M20 32 V37" /><path d="M3 20 H8" /><path d="M32 20 H37" />
          <path d="M8 8 L11 11" /><path d="M29 29 L32 32" /><path d="M32 8 L29 11" /><path d="M11 29 L8 32" />
          <circle cx="20" cy="20" r="11" />
        </g>
        <circle cx="20" cy="20" r="3.5" />
        <text x="46" y="27" fontFamily={FONT} fontSize="21" fontWeight="600" letterSpacing="1.5">TORQUE CO</text>
      </svg>
    ),
  },
  {
    title: 'Velocite',
    node: (
      <svg viewBox="0 0 180 40" style={svgStyle} fill="currentColor" role="img" aria-label="Velocite">
        <g stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 12 H21" /><path d="M5 20 H25" /><path d="M9 28 H19" />
          <path d="M27 10 L35 20 L27 30" />
        </g>
        <text x="46" y="27" fontFamily={FONT} fontSize="21" fontWeight="600" letterSpacing="1.5">VELOCITE</text>
      </svg>
    ),
  },
  {
    title: 'Ironclad',
    node: (
      <svg viewBox="0 0 176 40" style={svgStyle} fill="currentColor" role="img" aria-label="Ironclad">
        <path d="M20 4 L34 12 V28 L20 36 L6 28 V12 Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M20 12 L27 16 V24 L20 28 L13 24 V16 Z" />
        <text x="46" y="27" fontFamily={FONT} fontSize="21" fontWeight="600" letterSpacing="1.5">IRONCLAD</text>
      </svg>
    ),
  },
];

export default function PartnerLogoMarquee() {
  return (
    <section className="bg-v-bg py-10 sm:py-12" aria-label="Trusted partners">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8">
        <p className="section-label text-center mb-6 sm:mb-8">— Trusted by Riders Nationwide —</p>
        {/* overflow-hidden clips the looping track; color drives the currentColor logos */}
        <div className="relative overflow-hidden" style={{ color: 'var(--v-text)' }}>
          <LogoLoop
            logos={PARTNER_LOGOS}
            speed={60}
            direction="left"
            logoHeight={34}
            gap={64}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="var(--v-bg)"
            ariaLabel="Trusted partner logos"
          />
        </div>
      </div>
    </section>
  );
}