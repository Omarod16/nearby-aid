'use client';

import React, { useState } from 'react';
import { isValidUKPostcodeFormat } from '@/lib/services/mockServiceCoordinator';

interface PostcodeSearchProps {
  initialPostcode?: string;
  onSearch: (postcode: string) => void;
  isLoading?: boolean;
}

export function PostcodeSearch({ initialPostcode = '', onSearch, isLoading = false }: PostcodeSearchProps) {
  const [inputVal, setInputVal] = useState(initialPostcode);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputVal.trim();

    if (!trimmed) {
      setErrorMessage('Please enter a UK postcode (e.g. SW1A 1AA or M1 1AE).');
      return;
    }

    // Lenient format check for user guidance in Phase 1
    if (!isValidUKPostcodeFormat(trimmed) && trimmed !== 'TRIGGER_ERROR' && trimmed !== 'NO_RESULTS') {
      setErrorMessage('That doesn’t look like a standard UK postcode. Example format: SW1A 1AA or G1 2DA.');
      return;
    }

    setErrorMessage(null);
    onSearch(trimmed);
  };

  const handleUseMyLocation = () => {
    // Phase 1 Mock location trigger: sets demo location without browser permission prompt
    const mockUserPostcode = 'SE1 7EH';
    setInputVal(mockUserPostcode);
    setErrorMessage(null);
    onSearch(mockUserPostcode);
  };

  const handleQuickChip = (code: string) => {
    setInputVal(code);
    setErrorMessage(null);
    onSearch(code);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} noValidate className="relative">
        <label htmlFor="postcode-search-input" className="sr-only">
          Enter your UK postcode to find nearby essential services
        </label>

        {/* Search Input & Button Unit */}
        <div className="flex flex-col sm:flex-row items-stretch rounded-2xl bg-white p-2 shadow-md border-2 border-slate-300 focus-within:border-blue-600 transition-colors">
          <div className="flex flex-1 items-center px-3 py-2">
            {/* Location Pin Icon */}
            <svg
              className="h-6 w-6 text-blue-600 shrink-0 mr-2.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>

            <input
              id="postcode-search-input"
              type="text"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="Enter your UK postcode (e.g. SW1A 1AA)"
              aria-invalid={!!errorMessage}
              aria-describedby={errorMessage ? 'postcode-error-msg' : undefined}
              autoCapitalize="characters"
              autoCorrect="off"
              spellCheck="false"
              className="w-full bg-transparent text-lg sm:text-xl font-semibold text-slate-900 placeholder:text-slate-500 focus:outline-hidden"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="min-touch-target mt-2 sm:mt-0 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-lg font-bold text-white shadow-xs hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:opacity-75 focus-visible:ring-4 focus-visible:ring-blue-300"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Searching...
              </span>
            ) : (
              <span>Search</span>
            )}
          </button>
        </div>

        {/* Validation Error Message */}
        {errorMessage && (
          <div
            id="postcode-error-msg"
            role="alert"
            className="mt-2.5 flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 px-3.5 py-2 text-sm font-semibold text-amber-900"
          >
            <svg
              className="h-5 w-5 text-amber-600 shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errorMessage}
          </div>
        )}

        {/* Secondary: Use My Location & Quick Postcode Chips */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={handleUseMyLocation}
            className="min-touch-target inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-900 hover:underline px-2 py-1 rounded-lg"
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
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            </svg>
            Use my location
          </button>

          <div className="flex items-center gap-1.5 text-xs text-slate-700">
            <span className="font-medium">Try:</span>
            {['SW1A 1AA', 'SE1 7EH', 'W1D 3HZ'].map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => handleQuickChip(sample)}
                className="rounded-md bg-slate-200/80 px-2 py-1 font-semibold text-slate-700 hover:bg-blue-100 hover:text-blue-800 transition-colors"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
