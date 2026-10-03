'use client';

import React, { useState } from 'react';
import { ServiceCategory, ServiceEntity } from '@/types/service';
import { ServiceCard } from '@/components/services/ServiceCard';
import { MapPlaceholder } from '@/components/map/MapPlaceholder';
import { NoResultsState, LoadingSkeleton } from '@/components/ui/StatusStates';

interface ResultsViewProps {
  postcode: string;
  services: ServiceEntity[];
  totalCount: number;
  activeCategory: ServiceCategory | 'all';
  onCategoryChange: (cat: ServiceCategory | 'all') => void;
  sortBy: 'nearest' | 'name';
  onSortChange: (sort: 'nearest' | 'name') => void;
  onChangePostcode: () => void;
  isLoading?: boolean;
}

export function ResultsView({
  postcode,
  services,
  totalCount,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  onChangePostcode,
  isLoading = false,
}: ResultsViewProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(
    services[0]?.id
  );
  // Mobile list-first toggle: false = List view, true = Map view
  const [showMobileMap, setShowMobileMap] = useState<boolean>(false);

  const filterTabs: { id: ServiceCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'hospital_ae', label: 'Hospital / A&E' },
    { id: 'urgent_treatment_centre', label: 'Urgent Treatment (UTC)' },
    { id: 'pharmacy', label: 'Pharmacy' },
    { id: 'gp', label: 'GP' },
    { id: 'dentist', label: 'Dentist' },
  ];

  const handleSelectService = (service: ServiceEntity) => {
    setSelectedServiceId(service.id);
  };

  return (
    <div className="w-full space-y-5">
      {/* 1. Results Header & Postcode Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-extrabold uppercase text-blue-700 tracking-wider">
            Search Results
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            {totalCount} {totalCount === 1 ? 'service' : 'services'} near{' '}
            <span className="text-blue-600">{postcode}</span>
          </h1>
        </div>

        <button
          type="button"
          onClick={onChangePostcode}
          className="min-touch-target flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold transition-colors"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Change postcode
        </button>
      </div>

      {/* 2. Category Filters & Sorting Controls */}
      <div className="space-y-3">
        {/* Horizontal Category Pill Tabs */}
        <div
          role="tablist"
          aria-label="Filter services by category"
          className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none"
        >
          {filterTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => onCategoryChange(tab.id)}
                className={`min-touch-target shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Sort & Mobile View Toggle Bar */}
        <div className="flex items-center justify-between gap-3 pt-1">
          {/* Sorting */}
          <div className="flex items-center gap-2 text-sm">
            <label htmlFor="results-sort" className="font-bold text-slate-700">
              Sort:
            </label>
            <select
              id="results-sort"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as 'nearest' | 'name')}
              className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 font-semibold text-slate-900 shadow-2xs focus-visible:ring-4 focus-visible:ring-blue-300"
            >
              <option value="nearest">Nearest first</option>
              <option value="name">Name (A–Z)</option>
            </select>
          </div>

          {/* Mobile Only: View Map / View List Toggle Button */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setShowMobileMap((prev) => !prev)}
              aria-label={showMobileMap ? 'Switch to list view' : 'Switch to map view'}
              className="min-touch-target flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-black transition-colors"
            >
              {showMobileMap ? (
                <>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                  <span>View List ({services.length})</span>
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                    <line x1="8" y1="2" x2="8" y2="18" />
                    <line x1="16" y1="6" x2="16" y2="22" />
                  </svg>
                  <span>View Map</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Two-Column Layout (Desktop: List + Sticky Map; Mobile: List-First with Map Toggle) */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : services.length === 0 ? (
        <NoResultsState
          postcode={postcode}
          onResetFilters={() => onCategoryChange('all')}
          onChangePostcode={onChangePostcode}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Service Cards List (Mobile: Hidden if Map View active; Desktop: Always visible col-span-7) */}
          <div
            className={`space-y-4 lg:col-span-7 ${
              showMobileMap ? 'hidden lg:block' : 'block'
            }`}
          >
            <div className="sr-only" aria-live="polite">
              Showing {services.length} services sorted by {sortBy}.
            </div>

            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                isSelected={service.id === selectedServiceId}
                onSelect={handleSelectService}
              />
            ))}
          </div>

          {/* Map Area (Mobile: Visible only if Map View active; Desktop: Always visible col-span-5 sticky) */}
          <div
            className={`lg:col-span-5 lg:sticky lg:top-20 ${
              showMobileMap ? 'block' : 'hidden lg:block'
            }`}
          >
            <MapPlaceholder
              services={services}
              selectedServiceId={selectedServiceId}
              onSelectService={handleSelectService}
            />
          </div>
        </div>
      )}
    </div>
  );
}
