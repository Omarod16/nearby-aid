'use client';

import React from 'react';
import { ServiceCategory } from '@/types/service';

interface CategoryTileItem {
  id: ServiceCategory | 'all';
  title: string;
  subtitle: string;
  badgeColorClass: string;
  borderClass: string;
  iconBgClass: string;
  iconColorClass: string;
  icon: React.ReactNode;
}

interface CategoryTilesProps {
  onSelectCategory: (category: ServiceCategory | 'all') => void;
  activeCategory?: ServiceCategory | 'all';
}

export function CategoryTiles({ onSelectCategory, activeCategory }: CategoryTilesProps) {
  const categories: CategoryTileItem[] = [
    {
      id: 'hospital_ae',
      title: 'Hospital / A&E',
      subtitle: 'Accident & Emergency and hospital care',
      badgeColorClass: 'text-red-700 bg-red-100/80',
      borderClass: 'border-red-200 hover:border-red-400 group-hover:ring-2 group-hover:ring-red-200',
      iconBgClass: 'bg-red-600 text-white',
      iconColorClass: 'text-white',
      icon: (
        // Medical cross icon
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
      ),
    },
    {
      id: 'urgent_treatment_centre',
      title: 'Urgent Treatment Centre',
      subtitle: 'Minor injuries, sprains, urgent care (UTC)',
      badgeColorClass: 'text-indigo-700 bg-indigo-100/80',
      borderClass: 'border-indigo-200 hover:border-indigo-400 group-hover:ring-2 group-hover:ring-indigo-200',
      iconBgClass: 'bg-indigo-600 text-white',
      iconColorClass: 'text-white',
      icon: (
        // Clock with lightning / urgent symbol
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      id: 'pharmacy',
      title: 'Pharmacy',
      subtitle: 'Prescriptions, medicines & advice',
      badgeColorClass: 'text-emerald-800 bg-emerald-100/80',
      borderClass: 'border-emerald-200 hover:border-emerald-400 group-hover:ring-2 group-hover:ring-emerald-200',
      iconBgClass: 'bg-emerald-600 text-white',
      iconColorClass: 'text-white',
      icon: (
        // Mortar / pill icon
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
          <path d="m8.5 8.5 7 7" />
        </svg>
      ),
    },
    {
      id: 'gp',
      title: 'GP (Doctor)',
      subtitle: 'Surgeries and family health doctors',
      badgeColorClass: 'text-sky-800 bg-sky-100/80',
      borderClass: 'border-sky-200 hover:border-sky-400 group-hover:ring-2 group-hover:ring-sky-200',
      iconBgClass: 'bg-sky-600 text-white',
      iconColorClass: 'text-white',
      icon: (
        // Stethoscope icon
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
          <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
          <circle cx="20" cy="10" r="2" />
        </svg>
      ),
    },
    {
      id: 'dentist',
      title: 'Dentist',
      subtitle: 'Dental pain, NHS & emergency clinics',
      badgeColorClass: 'text-teal-800 bg-teal-100/80',
      borderClass: 'border-teal-200 hover:border-teal-400 group-hover:ring-2 group-hover:ring-teal-200',
      iconBgClass: 'bg-teal-600 text-white',
      iconColorClass: 'text-white',
      icon: (
        // Tooth / smile outline
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2C8 2 6 4 6 7c0 4 2 9 3 13 1 1 2 2 3 2s2-1 3-2c1-4 3-9 3-13 0-3-2-5-6-5Z" />
          <path d="M10 8c1 1 3 1 4 0" />
        </svg>
      ),
    },
    {
      id: 'all',
      title: 'All Essential Services',
      subtitle: 'Browse all local healthcare services',
      badgeColorClass: 'text-slate-800 bg-slate-100',
      borderClass: 'border-slate-200 hover:border-slate-400 group-hover:ring-2 group-hover:ring-slate-200',
      iconBgClass: 'bg-slate-700 text-white',
      iconColorClass: 'text-white',
      icon: (
        // Grid / all services
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
  ];

  return (
    <section aria-labelledby="category-tiles-heading" className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 id="category-tiles-heading" className="text-xl sm:text-2xl font-black text-slate-900">
          Browse by Essential Service
        </h2>
        <span className="text-xs font-semibold text-slate-700">Select any category</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              aria-pressed={isSelected}
              className={`min-touch-target group text-left rounded-2xl bg-white p-5 border-2 shadow-xs transition-all relative flex flex-col justify-between ${
                cat.borderClass
              } ${
                isSelected
                  ? 'ring-4 ring-blue-600 border-blue-600 bg-blue-50/20'
                  : 'hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${cat.iconBgClass} shadow-xs group-hover:scale-105 transition-transform`}
                >
                  {cat.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-950 group-hover:text-blue-900 leading-snug">
                    {cat.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {cat.subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-xs font-bold text-blue-700 group-hover:underline">
                  Find nearest &rarr;
                </span>
                {isSelected && (
                  <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-600 text-white">
                    Selected
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
