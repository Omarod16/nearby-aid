'use client';

import React from 'react';

export function LoadingSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading nearby services"
      className="w-full space-y-4"
    >
      <div className="sr-only">Finding nearby services, please wait...</div>
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="rounded-2xl bg-white p-5 border-2 border-slate-200 shadow-xs animate-pulse space-y-4"
        >
          <div className="flex justify-between items-center">
            <div className="h-5 w-28 bg-slate-200 rounded-md" />
            <div className="h-5 w-20 bg-slate-200 rounded-full" />
          </div>
          <div className="h-6 w-3/4 bg-slate-200 rounded-lg" />
          <div className="h-4 w-1/2 bg-slate-200 rounded-md" />
          <div className="pt-3 border-t border-slate-100 flex gap-3">
            <div className="h-11 flex-1 bg-slate-200 rounded-xl" />
            <div className="h-11 flex-1 bg-slate-200 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

interface NoResultsProps {
  postcode: string;
  onResetFilters: () => void;
  onChangePostcode: () => void;
}

export function NoResultsState({ postcode, onResetFilters, onChangePostcode }: NoResultsProps) {
  return (
    <div
      role="alert"
      className="rounded-3xl bg-white p-8 sm:p-12 text-center border-2 border-slate-200 shadow-sm max-w-xl mx-auto"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 mb-4">
        <svg
          className="h-7 w-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-slate-900">
        No services found for {postcode}
      </h3>
      <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
        We couldn&apos;t find matching services in this specific category around this postcode.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onResetFilters}
          className="min-touch-target w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-xs"
        >
          View all categories
        </button>
        <button
          type="button"
          onClick={onChangePostcode}
          className="min-touch-target w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold hover:bg-slate-200 transition-colors"
        >
          Change postcode
        </button>
      </div>
    </div>
  );
}

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="rounded-3xl bg-red-50/80 p-8 sm:p-10 text-center border-2 border-red-200 shadow-sm max-w-xl mx-auto"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white mb-4">
        <svg
          className="h-7 w-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-red-950">
        Something went wrong
      </h3>
      <p className="mt-2 text-sm sm:text-base text-red-900 leading-relaxed">
        {message || 'Unable to connect to service data. Please check your connection and try again.'}
      </p>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="min-touch-target w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors shadow-xs"
        >
          Try Again
        </button>
      </div>

      <p className="mt-6 text-xs text-red-800 font-semibold border-t border-red-200 pt-4">
        If you or someone else is in immediate medical danger, call <strong>999</strong> immediately.
      </p>
    </div>
  );
}
