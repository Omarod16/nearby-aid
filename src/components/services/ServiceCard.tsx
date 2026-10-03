'use client';

import React from 'react';
import { ServiceEntity } from '@/types/service';

interface ServiceCardProps {
  service: ServiceEntity;
  isSelected?: boolean;
  onSelect?: (service: ServiceEntity) => void;
}

export function ServiceCard({ service, isSelected = false, onSelect }: ServiceCardProps) {
  // Format category badge styling and label
  const getCategoryDetails = () => {
    switch (service.category) {
      case 'hospital_ae':
        return {
          label: 'Hospital / A&E',
          badgeClass: 'bg-red-100 text-red-800 border-red-200',
        };
      case 'urgent_treatment_centre':
        return {
          label: 'Urgent Treatment Centre (UTC)',
          badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        };
      case 'pharmacy':
        return {
          label: 'Pharmacy',
          badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        };
      case 'gp':
        return {
          label: 'GP (Doctor)',
          badgeClass: 'bg-sky-100 text-sky-800 border-sky-200',
        };
      case 'dentist':
        return {
          label: 'Dentist',
          badgeClass: 'bg-teal-100 text-teal-800 border-teal-200',
        };
      default:
        return {
          label: 'Essential Service',
          badgeClass: 'bg-slate-100 text-slate-800 border-slate-200',
        };
    }
  };

  const catDetails = getCategoryDetails();

  // Determine opening status text
  const getOpenStatus = () => {
    if (service.category === 'hospital_ae' && service.emergencyVerification === 'verified_major_ae') {
      return { text: 'Open 24/7 (Emergency)', isOpen: true };
    }
    // Mock opening indicator
    return { text: 'Open today', isOpen: true };
  };

  const status = getOpenStatus();

  // Safe Google Maps directions link
  const directionsQuery = encodeURIComponent(
    `${service.name}, ${service.address.line1}, ${service.address.townOrCity}, ${service.address.postcode}`
  );
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${directionsQuery}`;

  return (
    <article
      onClick={() => onSelect?.(service)}
      aria-label={`${service.name}, ${catDetails.label}, ${service.distanceMiles ?? ''} miles away`}
      className={`rounded-2xl bg-white p-5 border-2 shadow-xs transition-all flex flex-col justify-between cursor-pointer ${
        isSelected
          ? 'border-blue-600 ring-4 ring-blue-100 shadow-md'
          : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
      }`}
    >
      <div>
        {/* Top bar: Category Badge + Distance */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${catDetails.badgeClass}`}
          >
            {catDetails.label}
          </span>

          {service.distanceMiles !== undefined && (
            <span className="text-sm font-extrabold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              {service.distanceMiles} miles away
            </span>
          )}
        </div>

        {/* Emergency / A&E Verification Specific Warning or Badge */}
        {service.category === 'hospital_ae' && (
          <div className="mb-2">
            {service.emergencyVerification === 'verified_major_ae' ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-lg">
                <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                Verified Type 1 A&E (24/7 Emergency Care)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-50 border border-amber-300 px-2.5 py-1 rounded-lg">
                ⚠️ Hospital Site Only — No General A&E
              </span>
            )}
          </div>
        )}

        {/* Service Name */}
        <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
          {service.name}
        </h3>

        {/* Address */}
        <p className="mt-1.5 text-sm font-medium text-slate-700 leading-relaxed">
          {service.address.line1}
          {service.address.line2 ? `, ${service.address.line2}` : ''},{' '}
          <strong className="text-slate-900">{service.address.postcode}</strong>
        </p>

        {/* Opening Hours status */}
        <div className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              status.isOpen ? 'bg-emerald-500' : 'bg-slate-400'
            }`}
            aria-hidden="true"
          />
          <span>{status.text}</span>
        </div>
      </div>

      {/* Action Buttons: Large, Accessible CALL & DIRECTIONS */}
      <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2.5">
        {/* CALL button */}
        {service.telephone ? (
          <a
            href={`tel:${service.telephone.replace(/\s+/g, '')}`}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Call ${service.name} at ${service.telephone}`}
            className="min-touch-target flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm sm:text-base font-bold text-white hover:bg-slate-800 active:bg-black transition-colors focus-visible:ring-4 focus-visible:ring-slate-400"
          >
            <svg
              className="h-4 w-4 shrink-0 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>CALL</span>
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="min-touch-target flex items-center justify-center rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-400"
          >
            No Phone
          </button>
        )}

        {/* DIRECTIONS button */}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Get directions to ${service.name} in Google Maps (opens in new tab)`}
          className="min-touch-target flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm sm:text-base font-bold text-white hover:bg-blue-700 active:bg-blue-800 transition-colors focus-visible:ring-4 focus-visible:ring-blue-300"
        >
          <svg
            className="h-4 w-4 shrink-0 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span>DIRECTIONS</span>
        </a>
      </div>
    </article>
  );
}
