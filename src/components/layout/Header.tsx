'use client';

import React from 'react';
import { TextSizeControl } from '@/components/accessibility/TextSizeControl';

interface HeaderProps {
  onResetSearch?: () => void;
}

export function Header({ onResetSearch }: HeaderProps) {
  return (
    <>
      {/* Skip to Main Content Link for Keyboard and Screen Reader Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-3 focus:bg-blue-700 focus:text-white focus:font-bold focus:rounded-xl focus:shadow-xl focus:ring-4 focus:ring-blue-300"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-xs transition-colors">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo & Wordmark */}
          <button
            type="button"
            onClick={onResetSearch}
            className="flex items-center gap-2.5 text-left group focus-visible:rounded-xl"
            aria-label="NearbyAid homepage — reset search"
          >
            {/* Heart + Location Pin Symbol */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-sm ring-1 ring-blue-700/20 group-hover:scale-105 transition-transform">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Location Pin Path */}
                <path
                  d="M12 2C8.134 2 5 5.134 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.134 15.866 2 12 2Z"
                  fill="currentColor"
                  opacity="0.95"
                />
                {/* Heart Inset Path */}
                <path
                  d="M12 11.2C11.5 10.3 9.8 8.8 8.8 9.9C7.8 11.1 9.5 12.8 12 14.5C14.5 12.8 16.2 11.1 15.2 9.9C14.2 8.8 12.5 10.3 12 11.2Z"
                  fill="#ffffff"
                />
              </svg>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-none">
                Nearby<span className="text-blue-600">Aid</span>
              </div>
              <p className="text-[11px] sm:text-xs font-medium text-slate-600 tracking-wide mt-0.5">
                UK Essential Services
              </p>
            </div>
          </button>

          {/* Minimal Controls: Text Size Adjustment */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs font-semibold text-slate-700">Text size:</span>
            <TextSizeControl />
          </div>
        </div>
      </header>
    </>
  );
}
