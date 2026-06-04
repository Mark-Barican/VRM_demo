export type HelmetCategory = 'Classic' | 'Modern Retro' | 'Kids' | 'E-Bike';

// Filterable attributes for the collection page.
export type HelmetType = 'Open Face' | 'Full Face';
export type HelmetSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type Certification = 'TIS' | 'DTI' | 'ICC' | 'DOT';
export type Finish = 'Gloss' | 'Matte' | 'Satin';
export type ShellColor = 'Black' | 'White' | 'Pearl' | 'Brown' | 'Gunmetal';
export type Availability = 'In Stock' | 'Made to Order' | 'Out of Stock';

export interface Helmet {
  id: string;
  name: string;
  category: HelmetCategory;
  line: 'VRM 1976' | 'VRUM';
  price: number;
  image: string;
  /** Second product shot, revealed on card hover. */
  image2: string;
  colorways: string[];
  /** Open vs full face — used by the Helmet Type filter. */
  type: HelmetType;
  sizes: HelmetSize[];
  certifications: Certification[];
  /** Normalised shell-colour families for the Shell Color filter. */
  shellColors: ShellColor[];
  finishes: Finish[];
  availability: Availability;
  featured: boolean;
  /** Lower = sells better (Best selling sort). */
  bestSellerRank: number;
  /** Higher = more recently released (Newest sort). */
  newest: number;
  description: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  quote: string;
  rating: number;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface BranchLocation {
  id: string;
  name: string;
  address: string;
  hours: string;
  contact: string;
  lng: number;
  lat: number;
}

// Real VRM lines: VRM 1976 (vintage/classic) and VRUM (modern retro), plus
// kids and e-bike gear. Build specs: shock-resistant ABS shell + EPS absorber,
// TIS-rated (equivalent to ECE), DTI conformity, valid ICC sticker.
export const HELMETS: Helmet[] = [
  {
    id: 'vrm-milano-sport',
    name: 'Milano Sport',
    category: 'Classic',
    line: 'VRM 1976',
    price: 5200,
    image: '/helmets/milano_gloss_black.jpg',
    image2: '/helmets/milano_gloss_white.jpg',
    colorways: ['Gloss Black', 'Gloss White', 'Iridescent Visor'],
    type: 'Full Face',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    certifications: ['TIS', 'DTI', 'ICC', 'DOT'],
    shellColors: ['Black', 'White'],
    finishes: ['Gloss'],
    availability: 'In Stock',
    featured: true,
    bestSellerRank: 1,
    newest: 3,
    description:
      'The full-face flagship of the VRM 1976 line. Shock-resistant ABS shell, EPS absorber and an iridescent visor — TIS-rated with a valid ICC sticker.',
    badge: 'Bestseller',
  },
  {
    id: 'vrm-premium-plus-vintage',
    name: 'Premium Plus Half Face',
    category: 'Classic',
    line: 'VRM 1976',
    price: 4500,
    image: '/helmets/vintage_white_hf.jpg',
    image2: '/helmets/gloss_white_hf.jpg',
    colorways: ['Vintage White', 'Gloss White', 'Gloss Pearl', 'Matte Black'],
    type: 'Open Face',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    certifications: ['TIS', 'DTI', 'ICC'],
    shellColors: ['White', 'Pearl', 'Black'],
    finishes: ['Gloss', 'Matte'],
    availability: 'In Stock',
    featured: true,
    bestSellerRank: 3,
    newest: 4,
    description:
      'Open-face vintage icon with hand-finished leather trim and the classic "Vintage" graphic. TIS-rated (equivalent to ECE) with a valid ICC sticker.',
    badge: 'TIS Rated',
  },
  {
    id: 'vrm-atomic-bomber',
    name: 'Premium Plus — Atomic Bomber',
    category: 'Classic',
    line: 'VRM 1976',
    price: 5600,
    image: '/helmets/matte_black_hf.jpg',
    image2: '/helmets/gloss_pearl_hf.jpg',
    colorways: ['Matte Black', 'Gloss Pearl'],
    type: 'Open Face',
    sizes: ['M', 'L', 'XL'],
    certifications: ['TIS', 'DTI', 'ICC'],
    shellColors: ['Black', 'Pearl'],
    finishes: ['Matte', 'Gloss'],
    availability: 'In Stock',
    featured: false,
    bestSellerRank: 6,
    newest: 6,
    description:
      'A bolder Premium Plus open-face finish for the café racer crowd. ABS shell, EPS liner and DTI conformity — built for the daily Metro ride.',
    badge: 'Premium',
  },
  {
    id: 'vrm-tracker-classic',
    name: 'Tracker Classic',
    category: 'Classic',
    line: 'VRM 1976',
    price: 4200,
    image: '/helmets/gloss_white_hf.jpg',
    image2: '/helmets/vintage_white_hf.jpg',
    colorways: ['Gloss White', 'Cafe Brown', 'Checker Trim'],
    type: 'Open Face',
    sizes: ['S', 'M', 'L', 'XL'],
    certifications: ['TIS', 'DTI', 'ICC'],
    shellColors: ['White', 'Brown'],
    finishes: ['Gloss', 'Satin'],
    availability: 'In Stock',
    featured: false,
    bestSellerRank: 5,
    newest: 5,
    description:
      'Tracker-style open face inspired by golden-age scrambler culture. Lightweight ABS shell with a snug EPS fit — a Sunday-ride essential.',
  },
  {
    id: 'vrm-painted-8ball',
    name: 'Painted 8Ball',
    category: 'Classic',
    line: 'VRM 1976',
    price: 3800,
    image: '/helmets/gloss_pearl_hf.jpg',
    image2: '/helmets/matte_black_hf.jpg',
    colorways: ['Gloss Pearl', '8Ball Print'],
    type: 'Open Face',
    sizes: ['M', 'L', 'XL'],
    certifications: ['TIS', 'DTI', 'ICC'],
    shellColors: ['Pearl', 'Black'],
    finishes: ['Gloss'],
    availability: 'In Stock',
    featured: false,
    bestSellerRank: 4,
    newest: 12,
    description:
      'Hand-painted 8Ball open-face — pure retro attitude. Shock-resistant ABS, EPS absorber and a valid ICC sticker for worry-free city riding.',
    badge: 'New',
  },
  {
    id: 'vrum-dual-visor',
    name: 'VRUM Dual Visor',
    category: 'Modern Retro',
    line: 'VRUM',
    price: 3500,
    image: '/helmets/milano_gloss_white.jpg',
    image2: '/helmets/milano_gloss_black.jpg',
    colorways: ['Gloss White', 'Gloss Black', 'Gun Metal'],
    type: 'Full Face',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    certifications: ['TIS', 'DTI', 'ICC'],
    shellColors: ['White', 'Black', 'Gunmetal'],
    finishes: ['Gloss'],
    availability: 'In Stock',
    featured: true,
    bestSellerRank: 2,
    newest: 9,
    description:
      'The modern-retro VRUM line: impact-resistant ABS shell, EPS, a polycarbonate dual visor and adjustable vents. Versatility, reliability, modern design.',
    badge: 'VRUM',
  },
  {
    id: 'vrm-premium-kids',
    name: 'Premium Kids',
    category: 'Kids',
    line: 'VRM 1976',
    price: 2200,
    image: '/helmets/gloss_white_hf.jpg',
    image2: '/helmets/vintage_white_hf.jpg',
    colorways: ['Gloss White', 'Vintage White'],
    type: 'Open Face',
    sizes: ['XS', 'S'],
    certifications: ['TIS', 'DTI', 'ICC'],
    shellColors: ['White'],
    finishes: ['Gloss'],
    availability: 'In Stock',
    featured: false,
    bestSellerRank: 7,
    newest: 2,
    description:
      'A scaled-down Premium Plus for young riders and backriders. Same TIS-rated ABS + EPS protection in a lighter, kid-friendly fit.',
  },
  {
    id: 'vrum-ebike-commuter',
    name: 'E-Bike Commuter',
    category: 'E-Bike',
    line: 'VRUM',
    price: 950,
    image: '/helmets/gloss_pearl_hf.jpg',
    image2: '/helmets/gloss_white_hf.jpg',
    colorways: ['Gloss Pearl', 'Matte Black'],
    type: 'Open Face',
    sizes: ['S', 'M', 'L'],
    certifications: ['DTI', 'ICC'],
    shellColors: ['Pearl', 'Black'],
    finishes: ['Gloss', 'Matte'],
    availability: 'In Stock',
    featured: false,
    bestSellerRank: 12,
    newest: 1,
    description:
      'Entry-level half-helmet built for e-bikes and scooters. Lightweight, ventilated and ICC-compliant — the easiest way to ride protected.',
    badge: 'Value',
  },
  {
    id: 'vrm-milano-iridescent',
    name: 'Milano Iridescent',
    category: 'Classic',
    line: 'VRM 1976',
    price: 5600,
    image: '/helmets/milano_gloss_black.jpg',
    image2: '/helmets/milano_gloss_white.jpg',
    colorways: ['Gunmetal', 'Gloss Black', 'Oil-Slick Visor'],
    type: 'Full Face',
    sizes: ['M', 'L', 'XL'],
    certifications: ['TIS', 'DTI', 'ICC', 'DOT'],
    shellColors: ['Gunmetal', 'Black'],
    finishes: ['Gloss'],
    availability: 'Made to Order',
    featured: false,
    bestSellerRank: 10,
    newest: 11,
    description:
      'A limited Milano run with an oil-slick iridescent visor and gunmetal shell. Full-face ABS protection, TIS-rated and DOT-referenced — built to order.',
    badge: 'Limited',
  },
  {
    id: 'vrm-cafe-racer-tracker',
    name: 'Café Racer Tracker',
    category: 'Classic',
    line: 'VRM 1976',
    price: 3900,
    image: '/helmets/vintage_white_hf.jpg',
    image2: '/helmets/gloss_white_hf.jpg',
    colorways: ['Café Brown', 'Tan Leather Trim'],
    type: 'Open Face',
    sizes: ['S', 'M', 'L', 'XL'],
    certifications: ['TIS', 'DTI', 'ICC'],
    shellColors: ['Brown'],
    finishes: ['Satin'],
    availability: 'In Stock',
    featured: false,
    bestSellerRank: 9,
    newest: 8,
    description:
      'Satin café-brown open face with tan leather trim — the purest expression of the tracker silhouette. ABS shell, EPS liner and a valid ICC sticker.',
  },
  {
    id: 'vrum-sport',
    name: 'VRUM Sport',
    category: 'Modern Retro',
    line: 'VRUM',
    price: 2800,
    image: '/helmets/milano_gloss_white.jpg',
    image2: '/helmets/matte_black_hf.jpg',
    colorways: ['Matte Gunmetal', 'Matte White'],
    type: 'Full Face',
    sizes: ['S', 'M', 'L', 'XL'],
    certifications: ['TIS', 'DTI', 'ICC'],
    shellColors: ['Gunmetal', 'White'],
    finishes: ['Matte'],
    availability: 'In Stock',
    featured: false,
    bestSellerRank: 8,
    newest: 10,
    description:
      'The most accessible VRUM full face — matte shell, polycarbonate visor and high-flow vents for hot Manila commutes. Modern retro, from ₱2,800.',
    badge: 'VRUM',
  },
  {
    id: 'vrm-premium-plus-pearl',
    name: 'Premium Plus — Pearl',
    category: 'Classic',
    line: 'VRM 1976',
    price: 4795,
    image: '/helmets/gloss_pearl_hf.jpg',
    image2: '/helmets/gloss_white_hf.jpg',
    colorways: ['Gloss Pearl', 'Pearl White'],
    type: 'Open Face',
    sizes: ['XS', 'S', 'M', 'L'],
    certifications: ['TIS', 'DTI', 'ICC'],
    shellColors: ['Pearl', 'White'],
    finishes: ['Gloss'],
    availability: 'Out of Stock',
    featured: false,
    bestSellerRank: 11,
    newest: 7,
    description:
      'The Premium Plus open face in a deep pearl gloss with leather trim. Shock-resistant ABS, EPS absorber, TIS-rated with a valid ICC sticker.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi-001',
    author: 'Juan dela Cruz',
    location: 'Pasig City',
    quote:
      'Bought my Milano Sport at the Tiendesitas store. The fit is perfect and the iridescent visor gets compliments every single ride. Legit TIS-rated and the ICC sticker gives peace of mind.',
    rating: 5,
  },
  {
    id: 'testi-002',
    author: 'Maria Santos',
    location: 'Alabang, Muntinlupa',
    quote:
      'My Premium Plus Half Face feels premium way beyond its price. The vintage graphic and leather trim are gorgeous — proudly Filipino and genuinely well made.',
    rating: 5,
  },
  {
    id: 'testi-003',
    author: 'Carlo Reyes',
    location: 'Quezon City',
    quote:
      'Got the VRUM Dual Visor for daily commuting. The dual visor and vents are a game-changer in Manila traffic. Classics and modern retro — VRM nailed both.',
    rating: 5,
  },
];

export const FEATURES: Feature[] = [
  {
    id: 'feat-safety',
    icon: 'shield',
    title: 'TIS-Rated & ICC-Certified',
    description:
      'Shock-resistant ABS shell with an EPS impact absorber — TIS-rated (equivalent to ECE), DTI-conforming, and shipped with a valid ICC sticker.',
  },
  {
    id: 'feat-craft',
    icon: 'star',
    title: 'Proudly Filipino',
    description:
      'Vintage Rider Manila is a homegrown helmet and moto-gear brand built for classic, café-racer, scooter and e-bike riders across the Philippines.',
  },
  {
    id: 'feat-style',
    icon: 'sparkles',
    title: 'Classics & Modern Retro',
    description:
      'From the vintage VRM 1976 collection to the modern VRUM line — versatility, reliability and timeless design in every helmet.',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-founder',
    name: 'Atty. Ped Faytaren Jr.',
    role: 'Founder & Owner',
    image: 'https://picsum.photos/seed/vrm-founder/400/400',
    bio: 'A lawyer, entrepreneur and lifelong rider, Atty. Ped Faytaren Jr. founded Vintage Rider Manila in 2018 to give Filipino riders gear that is safe, stylish and unmistakably their own — the home of Classics and Modern Retro.',
  },
];

// Active VRM branches across Metro Manila & Cavite.
export const BRANCHES: BranchLocation[] = [
  {
    id: 'branch-tiendesitas',
    name: 'VRM Tiendesitas (Main)',
    address:
      '2nd Floor, Bldg. A, Tiendesitas, Ortigas East (Frontera Verde), E. Rodriguez Jr. Ave., Ugong, Pasig City',
    hours: 'Mon–Sun: 10:00 AM – 8:00 PM',
    contact: 'DM @vintageridermanila to reserve',
    lng: 121.0805,
    lat: 14.5869,
  },
  {
    id: 'branch-alabang',
    name: 'VRM Alabang',
    address: 'Festival Mall & Bloc 10 Mall, Alabang, Muntinlupa City',
    hours: 'Mon–Sun: 10:00 AM – 9:00 PM',
    contact: 'DM @vintageridermanila to reserve',
    lng: 121.0412,
    lat: 14.4186,
  },
  {
    id: 'branch-greenhills',
    name: 'VRM Greenhills',
    address: 'Greenhills Shopping Center, San Juan City',
    hours: 'Mon–Sun: 11:00 AM – 8:00 PM',
    contact: 'DM @vintageridermanila to reserve',
    lng: 121.0500,
    lat: 14.6038,
  },
  {
    id: 'branch-silang',
    name: 'VRM Silang, Cavite',
    address: 'Silang, Cavite',
    hours: 'Mon–Sun: 9:00 AM – 6:00 PM',
    contact: 'DM @vintageridermanila to reserve',
    lng: 120.9747,
    lat: 14.2306,
  },
];

export const CONTACT_INFO = {
  website: 'vintageridermanila.com',
  instagram: { handle: '@vintageridermanila', url: 'https://instagram.com/vintageridermanila', followers: '6.6k' },
  facebook: { handle: 'Vintage Rider Manila', url: 'https://facebook.com/vintageridermanila', followers: '45k' },
  resellers: ['Lazada', 'Shopee'],
  payments: ['Credit Card', 'PayPal', 'BDO Deposit', 'COD via resellers'],
  delivery: ['Grab & Lalamove (Metro Manila)', 'LBC (provincial)'],
};

export const BRAND_COPY = {
  brandName: 'Vintage Rider Manila',
  brandMark: 'VRM 1976',
  tagline: 'Home of Classics & Modern Retro',
  subTagline:
    'Vintage Rider Manila — shock-resistant, TIS-rated helmets and moto-gear for the classic, café-racer, scooter and e-bike rider.',
  heroCtaText: 'Explore Collection',
  aboutHeadline: 'Proudly Filipino. Built for the Ride.',
  aboutBody: `Vintage Rider Manila — branded VRM 1976 — is a proudly Filipino helmet and moto-gear brand. Founded in 2018 by lawyer, entrepreneur and rider Atty. Ped Faytaren Jr., VRM set out to give local riders gear that is genuinely safe, distinctly styled, and built for the way Filipinos ride.

The name pays homage to classic moto heritage — "1976" is our styling, not our founding year. What we build is real: shock-resistant ABS shells, EPS absorbers, TIS-rated protection (equivalent to ECE), DTI conformity, and a valid ICC sticker on every helmet.

In 2023 we celebrated our 5th year and launched VRUM, our modern-retro line. Today VRM rides with classic and café-racer riders, scooter and e-bike commuters, and a community that's grown to tens of thousands strong — the home of Classics and Modern Retro.`,
  missionHeadline: 'Our Mission',
  missionBody:
    'Make world-class protection accessible to every Filipino rider — pairing TIS-rated safety with the classic and modern-retro style our community is proud to wear.',
  valuesHeadline: 'What We Stand For',
  values: [
    { title: 'Certified Safety', body: 'Shock-resistant ABS + EPS, TIS-rated (equivalent to ECE), DTI-conforming, with a valid ICC sticker on every helmet.' },
    { title: 'Proudly Filipino', body: 'A homegrown Metro Manila brand built for local roads, local riders, and the culture we ride in.' },
    { title: 'Classics & Modern Retro', body: 'Two lines, one soul — the vintage VRM 1976 collection and the modern VRUM range.' },
    { title: 'For Every Rider', body: 'From premium full-face to kids and e-bike gear, priced from ₱950 — there is a VRM for everyone.' },
  ],
  viewer3dLabel: 'Interactive 3D Preview',
  viewer3dSub: 'Drag to rotate · Scroll to zoom',
};

// ── Collection / catalog page content ──────────────────────────────────────

/** Ordered filter option lists, used by the FilterSidebar. */
export const SIZES: HelmetSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
export const CERTIFICATIONS: Certification[] = ['TIS', 'DTI', 'ICC', 'DOT'];
export const HELMET_TYPES: HelmetType[] = ['Open Face', 'Full Face'];
export const SHELL_COLORS: ShellColor[] = ['Black', 'White', 'Pearl', 'Brown', 'Gunmetal'];
export const FINISHES: Finish[] = ['Gloss', 'Matte', 'Satin'];
export const AVAILABILITIES: Availability[] = ['In Stock', 'Made to Order', 'Out of Stock'];

/** Min/max price across the catalog — drives the price-range slider bounds. */
export const PRICE_BOUNDS = {
  min: Math.min(...HELMETS.map((h) => h.price)),
  max: Math.max(...HELMETS.map((h) => h.price)),
};

/** Swatch hex values for the Shell Color filter dots. */
export const SHELL_COLOR_SWATCHES: Record<ShellColor, string> = {
  Black: '#1c1c1c',
  White: '#f3efe6',
  Pearl: '#dcd3c0',
  Brown: '#6b4a2b',
  Gunmetal: '#5a5e63',
};

export interface SortOption {
  value: 'featured' | 'best-selling' | 'price-asc' | 'price-desc' | 'newest';
  label: string;
}

export const SORT_OPTIONS: SortOption[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'best-selling', label: 'Best selling' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    id: 'faq-safe',
    question: 'Are VRM helmets safe?',
    answer:
      'Yes. Every VRM helmet is built on a shock-resistant ABS shell with an EPS impact absorber, is TIS-rated (equivalent to ECE), conforms to DTI standards, and ships with a valid ICC sticker. Our full-face Milano line is also DOT-referenced.',
  },
  {
    id: 'faq-weather',
    question: 'Are they suitable for hot Philippine weather?',
    answer:
      'They are designed for it. Our open-face and VRUM full-face models use high-flow ventilation and moisture-wicking, removable liners so you stay cool in Metro traffic and on long provincial rides alike.',
  },
  {
    id: 'faq-sizing',
    question: 'How do I choose my size?',
    answer:
      'Measure the circumference of your head about 2cm above your eyebrows, then match it to our size chart (XS–XXL). When you are between sizes we recommend sizing up. A correct fit is snug with no pressure points and no movement when you shake your head.',
  },
  {
    id: 'faq-branches',
    question: 'Where can I buy? Which branches do you have?',
    answer:
      'Visit us at Tiendesitas (main, Pasig), Alabang, Greenhills, or Silang, Cavite — or order online for nationwide delivery via Grab, Lalamove and LBC. We are also available on Lazada and Shopee.',
  },
];

export interface EditorialBlock {
  id: string;
  label: string;
  title: string;
  body: string;
}

export const EDITORIAL: EditorialBlock[] = [
  {
    id: 'edit-craft',
    label: 'The Workshop',
    title: 'Handcrafted in the Philippines',
    body:
      'Every VRM helmet is finished by hand in Metro Manila — from the hand-laid paint and leather trim to the final quality check. We build in small runs so each piece carries the detail of something made, not just manufactured.',
  },
  {
    id: 'edit-classic',
    label: 'The Look',
    title: 'Classic Looks, Honest Lines',
    body:
      'We chase the silhouettes of the golden age of motorcycling — the open-face tracker, the full-face café racer, the clean scooter dome — and keep them free of noise. Timeless on the road today, and ten years from now.',
  },
  {
    id: 'edit-safety',
    label: 'The Protection',
    title: 'Modern Safety, Certified',
    body:
      'Underneath the vintage shell is genuinely modern protection: shock-resistant ABS, an EPS absorber, TIS-rated certification (equivalent to ECE), DTI conformity, and a valid ICC sticker on every helmet. Heritage style, no compromise on safety.',
  },
];

/** Mega-menu category tiles shown under the Shop / Helmets-by-Type nav items. */
export interface NavCategory {
  label: string;
  description: string;
  href: string;
  image: string;
}

export const NAV_CATEGORIES: NavCategory[] = [
  {
    label: 'Half Face',
    description: 'Open-face vintage & scooter domes',
    href: '/shop?type=open',
    image: '/helmets/vintage_white_hf.jpg',
  },
  {
    label: 'Full Face',
    description: 'Maximum-coverage protection',
    href: '/shop?type=full',
    image: '/helmets/milano_gloss_black.jpg',
  },
  {
    label: 'Tracker',
    description: 'Café-racer & scrambler style',
    href: '/shop?q=tracker',
    image: '/helmets/gloss_white_hf.jpg',
  },
  {
    label: 'Milano',
    description: 'The full-face flagship line',
    href: '/shop?q=milano',
    image: '/helmets/milano_gloss_white.jpg',
  },
];
