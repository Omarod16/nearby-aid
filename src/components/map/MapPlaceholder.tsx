'use client';

import React from 'react';
import { ServiceEntity } from '@/types/service';

interface MapPlaceholderProps {
  services: ServiceEntity[];
  selectedServiceId?: string;
  onSelectService?: (service: ServiceEntity) => void;
  centerCoordinates?: { latitude: number; longitude: number };
}

export function MapPlaceholder({
  services,
  selectedServiceId,
  onSelectService,
  centerCoordinates = { latitude: 51.5015, longitude: -0.1192 },
}: MapPlaceholderProps) {
  const selectedService = services.find((s) => s.id === selectedServiceId);

  // Pin color helper
  const getPinColor = (service: ServiceEntity) => {
    switch (service.category) {
      case 'hospital_ae':
        return service.emergencyVerification === 'verified_major_ae' ? 'bg-red-600' : 'bg-slate-700';
      case 'urgent_treatment_centre':
        return 'bg-indigo-600';
      case 'pharmacy':
        return 'bg-emerald-600';
      case 'gp':
        return 'bg-sky-600';
      case 'dentist':
        return 'bg-teal-600';
      default:
        return 'bg-blue-600';
    }
  };

  return (
    <div
      role="region"
      aria-label="Map of nearby services"
      className="relative w-full h-[380px] sm:h-[480px] lg:h-[620px] rounded-3xl overflow-hidden border-2 border-slate-200 bg-slate-100 shadow-sm flex flex-col justify-between"
    >
      {/* Background Graphic representing street grid and River Thames */}
      <svg
        className="absolute inset-0 w-full h-full text-slate-200/90 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          </pattern>
        </defs>
        {/* Subtle grid background */}
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />

        {/* River Curve Graphic */}
        <path
          d="M -20 180 C 150 160, 220 320, 500 280 C 650 250, 800 340, 1000 310"
          fill="none"
          stroke="#bae6fd"
          strokeWidth="36"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Secondary main artery */}
        <path
          d="M 50 0 C 120 200, 280 350, 450 600"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="8"
          opacity="0.7"
        />
      </svg>

      {/* Top Banner: Architecture readiness notice */}
      <div className="relative z-10 m-3 flex items-center justify-between gap-2 rounded-xl bg-white/95 px-3 py-2 text-xs font-semibold text-slate-700 shadow-xs backdrop-blur-xs border border-slate-200">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
          Map Preview (Mapbox Ready)
        </span>
        <span className="text-[11px] text-slate-500 font-mono">
          {centerCoordinates.latitude.toFixed(3)}, {centerCoordinates.longitude.toFixed(3)}
        </span>
      </div>

      {/* Interactive Mock Pins Container */}
      <div className="relative flex-1 z-10 p-4">
        {/* Screen reader text describing markers */}
        <div className="sr-only">
          Map showing {services.length} services. Use the list below to interact with each service.
        </div>

        {services.map((service, idx) => {
          const isSelected = service.id === selectedServiceId;
          const pinColor = getPinColor(service);

          // Spread mock pins deterministically across the view
          const horizontalOffsets = [24, 62, 38, 76, 45, 18, 55, 82, 30, 68];
          const verticalOffsets = [28, 42, 65, 30, 48, 75, 22, 60, 50, 38];
          const leftPercent = horizontalOffsets[idx % horizontalOffsets.length];
          const topPercent = verticalOffsets[idx % verticalOffsets.length];

          return (
            <button
              key={service.id}
              type="button"
              onClick={() => onSelectService?.(service)}
              style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
              aria-label={`Marker ${idx + 1}: ${service.name}`}
              className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all cursor-pointer focus:outline-hidden ${
                isSelected ? 'z-30 scale-125' : 'z-20 hover:scale-115'
              }`}
            >
              {/* Pin Pill Marker */}
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-white font-extrabold shadow-md border-2 border-white transition-all ${pinColor} ${
                  isSelected ? 'ring-4 ring-blue-500 shadow-xl' : ''
                }`}
              >
                <span className="text-xs">{idx + 1}</span>
              </div>

              {/* Pin stem */}
              <div className="mx-auto w-1 h-2 bg-slate-800 -mt-0.5 rounded-full" />

              {/* Tooltip on Hover / Select */}
              <div
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 whitespace-nowrap rounded-lg bg-slate-950 px-2.5 py-1 text-[11px] font-bold text-white shadow-lg pointer-events-none transition-opacity ${
                  isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                {service.name.length > 24 ? `${service.name.slice(0, 24)}...` : service.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Service Bottom Drawer/Card on Map */}
      {selectedService && (
        <div className="relative z-20 m-3 rounded-2xl bg-white p-3.5 shadow-lg border border-slate-200 flex items-center justify-between gap-3 animate-fade-in">
          <div className="min-w-0 flex-1">
            <span className="text-[11px] font-extrabold uppercase text-blue-700 tracking-wider">
              Selected on map
            </span>
            <h4 className="text-sm font-bold text-slate-900 truncate">{selectedService.name}</h4>
            <p className="text-xs text-slate-700 truncate">{selectedService.address.postcode} • {selectedService.distanceMiles} miles</p>
          </div>

          <a
            href={`tel:${selectedService.telephone?.replace(/\s+/g, '')}`}
            className="min-touch-target shrink-0 flex items-center justify-center rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-black"
          >
            CALL
          </a>
        </div>
      )}
    </div>
  );
}
