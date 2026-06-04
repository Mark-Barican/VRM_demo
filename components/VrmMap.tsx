'use client';

import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
  MapControls,
} from '@/components/ui/map';
import { BRANCHES } from '@/lib/placeholders';

interface VrmMapProps {
  className?: string;
}

// Centered on Metro Manila & Cavite to frame all four branches
const DEFAULT_CENTER: [number, number] = [121.02, 14.45];

export default function VrmMap({ className = '' }: VrmMapProps) {
  return (
    <div className={`relative h-[320px] sm:h-[380px] lg:h-[440px] w-full ${className}`}>
      <Map center={DEFAULT_CENTER} zoom={9.6} className="h-full w-full">
        {BRANCHES.map((branch) => (
          <MapMarker key={branch.id} longitude={branch.lng} latitude={branch.lat}>
            <MarkerContent>
              {/* Vintage gold pin */}
              <div className="relative flex items-center justify-center">
                <span className="absolute size-6 rounded-full bg-v-accent/30 animate-ping" />
                <span className="relative size-3.5 rounded-full bg-v-accent border-2 border-white shadow-lg" />
              </div>
            </MarkerContent>
            <MarkerTooltip>{branch.name}</MarkerTooltip>
            <MarkerPopup>
              <div className="space-y-1 max-w-[220px]">
                <p className="font-display tracking-wide text-base text-popover-foreground">
                  {branch.name}
                </p>
                <p className="text-muted-foreground text-xs leading-relaxed">{branch.address}</p>
                <p className="text-muted-foreground text-xs">{branch.hours}</p>
                <p className="text-muted-foreground text-xs">{branch.contact}</p>
              </div>
            </MarkerPopup>
          </MapMarker>
        ))}
        <MapControls position="bottom-right" showZoom showCompass showFullscreen />
      </Map>
    </div>
  );
}
