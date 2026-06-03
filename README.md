# VRM Manila Helmets — Marketing Website

Production-grade marketing site for VRM Manila, a premium Filipino helmet brand.

## Stack

- **Next.js 15** — App Router, static generation
- **Tailwind CSS** — utility-first styling with brand theme extension
- **Anime.js** — hero entrance, scroll reveals, modal transitions, filter cross-fades
- **Three.js + @react-three/fiber + @react-three/drei** — interactive 3D helmet viewer
- **TypeScript** — strict mode
- **Vercel** — zero-config deployment

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  layout.tsx          # Root layout (Nav + Footer)
  page.tsx            # Home — hero, featured helmets, 3D teaser, testimonials
  shop/page.tsx       # Shop — filterable grid + 3D modal
  about/page.tsx      # Brand story, team, timeline
  contact/page.tsx    # Contact form + branch locations
components/
  Nav.tsx             # Responsive nav with anime.js mobile menu
  Footer.tsx          # Multi-column footer
  HeroSection.tsx     # Full-screen hero with staggered entrance
  HelmetCard.tsx      # Product card with hover animation
  HelmetViewer.tsx    # Three.js 3D viewer (use client, ssr:false)
  ViewerModal.tsx     # Full-screen modal wrapper (use client, ssr:false)
  FilterBar.tsx       # Category filter buttons
lib/
  placeholders.ts     # All placeholder data — products, team, copy
  animations.ts       # All anime.js animation functions
```

## Swapping in Real Content

All placeholder strings are sourced from `lib/placeholders.ts`. Look for `// TODO: replace with real content` comments throughout.

### Real helmet 3D model

In `components/HelmetViewer.tsx`, find the comment block and replace `PlaceholderHelmet` with:

```tsx
import { useGLTF } from '@react-three/drei';

function RealHelmet() {
  const { scene } = useGLTF('/models/helmet.glb'); // TODO: replace with real content
  return <primitive object={scene} scale={1} />;
}
```

Drop your `.glb` file into `public/models/`.

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (zero config required)
vercel
```

The `vercel.json` is minimal — Vercel auto-detects Next.js.
