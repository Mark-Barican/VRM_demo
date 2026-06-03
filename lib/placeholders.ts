export type HelmetCategory = 'Full Face' | 'Open Face' | 'Modular';

export interface Helmet {
  id: string;
  name: string;
  category: HelmetCategory;
  price: number;
  image: string;
  colorways: string[];
  featured: boolean;
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
  phone: string;
}

export const HELMETS: Helmet[] = [
  {
    id: 'vrm-apex-001',
    name: 'VRM Apex Pro',
    category: 'Full Face',
    price: 4999,
    image: 'https://picsum.photos/seed/helmet1/600/600',
    colorways: ['Matte Black', 'Gloss White', 'Pearl Gold'],
    featured: true,
    description: 'Our flagship full-face helmet — ECE-certified with a retro silhouette that turns heads on Roxas Boulevard and EDSA alike.',
    badge: 'Bestseller',
  },
  {
    id: 'vrm-cruiser-002',
    name: 'VRM Cruiser Classic',
    category: 'Open Face',
    price: 3499,
    image: 'https://picsum.photos/seed/helmet2/600/600',
    colorways: ['Vintage Cream', 'Cafe Brown', 'Gloss Black'],
    featured: true,
    description: 'The open-face icon. Inspired by the golden age of Philippine scooter culture — built for the morning commute and the Sunday ride.',
    badge: 'New',
  },
  {
    id: 'vrm-modulus-003',
    name: 'VRM Modulus X',
    category: 'Modular',
    price: 6499,
    image: 'https://picsum.photos/seed/helmet3/600/600',
    colorways: ['Gun Metal', 'Stealth Black', 'Arctic White'],
    featured: true,
    description: 'Flip-front convenience meets full-face protection. For the Filipino rider who refuses to compromise on style or safety.',
    badge: 'Premium',
  },
  {
    id: 'vrm-urban-004',
    name: 'VRM Urban Lite',
    category: 'Open Face',
    price: 2799,
    image: 'https://picsum.photos/seed/helmet4/600/600',
    colorways: ['Sky Blue', 'Coral Red', 'Matte White'],
    featured: false,
    description: 'Lightweight open-face design for city riding. Ventilated, comfortable, and unmistakably VRM.',
  },
  {
    id: 'vrm-track-005',
    name: 'VRM Track Edition',
    category: 'Full Face',
    price: 8999,
    image: 'https://picsum.photos/seed/helmet5/600/600',
    colorways: ['Racing Red', 'Carbon Black', 'Neon Yellow'],
    featured: false,
    description: 'Track-ready aerodynamics wrapped in a vintage racing shell. Limited production, unlimited performance.',
    badge: 'Limited',
  },
  {
    id: 'vrm-touring-006',
    name: 'VRM Grand Tourer',
    category: 'Modular',
    price: 7299,
    image: 'https://picsum.photos/seed/helmet6/600/600',
    colorways: ['Deep Navy', 'Forest Green', 'Titanium Gray'],
    featured: false,
    description: 'Long-haul comfort with short-trip swagger. The Grand Tourer is built for riders who go the distance.',
  },
  {
    id: 'vrm-retro-007',
    name: 'VRM Retro Racer',
    category: 'Open Face',
    price: 3999,
    image: 'https://picsum.photos/seed/helmet7/600/600',
    colorways: ['British Racing Green', 'Ivory White', 'Burgundy'],
    featured: false,
    description: 'A love letter to classic café racer culture. Handfinished details, genuine leather liner, pure nostalgia.',
    badge: 'Heritage',
  },
  {
    id: 'vrm-stealth-008',
    name: 'VRM Stealth FF',
    category: 'Full Face',
    price: 5799,
    image: 'https://picsum.photos/seed/helmet8/600/600',
    colorways: ['All Black', 'Dark Chrome', 'Obsidian'],
    featured: false,
    description: 'Dark, aggressive, and relentlessly protective. The Stealth FF is for riders who let the helmet do the talking.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi-001',
    author: 'Juan dela Cruz',
    location: 'Makati City',
    quote: 'VRM changed the way I think about helmet safety. The Cruiser Classic fits like a glove and gets compliments every ride. Best investment I\'ve made for my scooter.',
    rating: 5,
  },
  {
    id: 'testi-002',
    author: 'Maria Santos',
    location: 'Quezon City',
    quote: 'The craftsmanship is unmatched — it feels like a European brand at a Filipino price. I\'ve worn a lot of helmets, but nothing comes close to this quality.',
    rating: 5,
  },
  {
    id: 'testi-003',
    author: 'Carlo Reyes',
    location: 'Cebu City',
    quote: 'I\'ve tried many brands but VRM Manila sits differently — premium in every way. The vintage finish on my Retro Racer is absolutely stunning.',
    rating: 5,
  },
];

export const FEATURES: Feature[] = [
  {
    id: 'feat-safety',
    icon: 'shield',
    title: 'ECE & DOT Certified',
    description: 'Every VRM helmet meets international safety standards before it reaches you. Protection you can trust on every Philippine road.',
  },
  {
    id: 'feat-craft',
    icon: 'star',
    title: 'Filipino Craftsmanship',
    description: 'Designed in Manila, built with pride. Our artisans bring decades of expertise to every helmet — from the shell to the stitching.',
  },
  {
    id: 'feat-style',
    icon: 'sparkles',
    title: 'Timeless Aesthetics',
    description: 'Classic lines that never go out of style. VRM helmets are designed to look just as sharp in 20 years as they do today.',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-001',
    name: 'Miguel Reyes',
    role: 'Founder & CEO',
    image: 'https://picsum.photos/seed/person1/400/400',
    bio: 'Miguel founded VRM Manila in 1976 after returning from a motorcycle tour across the Philippines. His vision: a Filipino helmet brand that could stand alongside the world\'s best.',
  },
  {
    id: 'team-002',
    name: 'Ana Villanueva',
    role: 'Head of Design',
    image: 'https://picsum.photos/seed/person2/400/400',
    bio: 'Ana brings 15 years of industrial design experience to VRM. She leads the team that translates vintage Filipino aesthetics into wearable, protective art.',
  },
  {
    id: 'team-003',
    name: 'Ramon Cruz',
    role: 'Chief Safety Officer',
    image: 'https://picsum.photos/seed/person3/400/400',
    bio: 'Ramon oversees every certification process at VRM. His mandate is simple: no helmet leaves the factory without exceeding international safety standards.',
  },
];

export const BRANCHES: BranchLocation[] = [
  {
    id: 'branch-001',
    name: 'VRM Manila — BGC Flagship',
    address: '3/F Uptown Place Mall, 9th Avenue, Bonifacio Global City, Taguig, Metro Manila',
    hours: 'Mon–Sun: 10:00 AM – 9:00 PM',
    phone: '+63 2 8888 1234',
  },
  {
    id: 'branch-002',
    name: 'VRM Manila — Cebu Branch',
    address: 'G/F Ayala Center Cebu, Archbishop Reyes Avenue, Cebu City, 6000',
    hours: 'Mon–Sun: 10:00 AM – 8:00 PM',
    phone: '+63 32 888 5678',
  },
];

export const BRAND_COPY = {
  tagline: 'Ride With Honor.',
  subTagline: 'Classic Filipino helmets since 1976. Built for the scooter soul — timeless style, uncompromising protection.',
  heroCtaText: 'Explore Collection',
  aboutHeadline: 'Born in the Philippines. Built for the World.',
  aboutBody: `In 1976, a young Miguel Reyes returned from a motorcycle journey across the Philippine archipelago with a single conviction: Filipino riders deserved world-class helmets made by Filipino hands.

Starting from a small workshop in Manila, VRM grew from a local passion project into the country's most trusted helmet brand. Every helmet we make carries the spirit of that first ride — the open roads of Batangas, the mountain curves of Baguio, the coastal stretches of Cebu.

Nearly five decades later, that spirit lives in every rivet, every stitch, and every hand-finished shell that leaves our factory.`,
  missionHeadline: 'Our Mission',
  missionBody: 'We believe every Filipino rider deserves world-class protection without compromise. Safety, style, and local pride — crafted together in every VRM helmet.',
  valuesHeadline: 'What We Stand For',
  values: [
    { title: 'Safety First', body: 'Every helmet exceeds ECE 22.06 and DOT standards. Your life is worth every quality check.' },
    { title: 'Local Pride', body: 'Designed in Manila, inspired by the Philippines. We wear our roots with honor.' },
    { title: 'Timeless Design', body: 'We don\'t chase trends. We build helmets that look classic today, tomorrow, and in twenty years.' },
    { title: 'For Every Rider', body: 'From Makati to Mindanao, VRM helmets are built for the roads and riders of the Philippines.' },
  ],
  viewer3dLabel: 'Interactive 3D Preview',
  viewer3dSub: 'Drag to rotate · Scroll to zoom',
};
