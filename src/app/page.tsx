'use client';

import React, { useState, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { EmergencyBanner } from '@/components/ui/EmergencyBanner';
import { PostcodeSearch } from '@/components/search/PostcodeSearch';
import { CategoryTiles } from '@/components/services/CategoryTiles';
import { TrustSection } from '@/components/ui/TrustSection';
import { ResultsView } from '@/components/services/ResultsView';
import { ErrorState } from '@/components/ui/StatusStates';
import {
  queryMockServices,
  MockSearchResult,
} from '@/lib/services/mockServiceCoordinator';
import { ServiceCategory } from '@/types/service';

export default function HomePage() {
  const [searchedPostcode, setSearchedPostcode] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'nearest' | 'name'>('nearest');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<MockSearchResult | null>(null);

  // Perform search query
  const executeSearch = useCallback(
    async (postcode: string, category: ServiceCategory | 'all', sort: 'nearest' | 'name') => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        // Small simulated delay (300ms) for realistic UX response
        const res = await queryMockServices({
          postcode,
          category,
          sortBy: sort,
          simulateDelayMs: 300,
        });
        setSearchResult(res);
        setSearchedPostcode(postcode);
      } catch (err) {
        setErrorMessage(
          err instanceof Error
            ? err.message
            : 'Unable to load services. Please check your connection and try again.'
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Trigger search from Postcode Search form
  const handleSearchSubmit = (postcode: string) => {
    executeSearch(postcode, activeCategory, sortBy);
  };

  // Trigger selection from Category Tiles on Homepage
  const handleTileCategorySelect = (category: ServiceCategory | 'all') => {
    setActiveCategory(category);
    // If user hasn't typed a postcode yet, default to central London sample 'SW1A 1AA'
    const targetPostcode = searchedPostcode || 'SW1A 1AA';
    executeSearch(targetPostcode, category, sortBy);
  };

  // Change category inside Results View
  const handleFilterCategoryChange = (category: ServiceCategory | 'all') => {
    setActiveCategory(category);
    if (searchedPostcode) {
      executeSearch(searchedPostcode, category, sortBy);
    }
  };

  // Change sort order inside Results View
  const handleSortChange = (sort: 'nearest' | 'name') => {
    setSortBy(sort);
    if (searchedPostcode) {
      executeSearch(searchedPostcode, activeCategory, sort);
    }
  };

  // Reset back to home search
  const handleResetSearch = () => {
    setSearchedPostcode('');
    setSearchResult(null);
    setErrorMessage(null);
    setActiveCategory('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* 1. Accessible Global Header */}
      <Header onResetSearch={handleResetSearch} />

      {/* 2. Main Content Container */}
      <main id="main-content" className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-8">
          {/* Emergency Information Box */}
          <EmergencyBanner />

          {/* Error State if triggered */}
          {errorMessage && (
            <ErrorState
              message={errorMessage}
              onRetry={() => executeSearch(searchedPostcode || 'SW1A 1AA', activeCategory, sortBy)}
            />
          )}

          {/* View Switch: Results View VS Homepage Search */}
          {!errorMessage && searchResult ? (
            <ResultsView
              postcode={searchResult.searchedPostcode}
              services={searchResult.services}
              totalCount={searchResult.totalCount}
              activeCategory={activeCategory}
              onCategoryChange={handleFilterCategoryChange}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              onChangePostcode={handleResetSearch}
              isLoading={isLoading}
            />
          ) : (
            !errorMessage && (
              <div className="space-y-12 py-4">
                {/* Hero Section */}
                <section
                  aria-labelledby="hero-title"
                  className="text-center max-w-3xl mx-auto space-y-4 pt-2 pb-4"
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/90 px-3.5 py-1 text-xs font-bold text-blue-900 ring-1 ring-blue-700/10">
                    <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                    Simple UK Healthcare Locator
                  </span>

                  <h1
                    id="hero-title"
                    className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 leading-[1.15]"
                  >
                    Find essential services near you
                  </h1>

                  <p className="text-base sm:text-xl font-medium text-slate-700 max-w-2xl mx-auto leading-relaxed">
                    Quickly find your nearest verified A&E, local pharmacy, GP surgery, dental practice, or Urgent Treatment Centre.
                  </p>

                  {/* Primary Postcode Search */}
                  <div className="pt-4">
                    <PostcodeSearch
                      initialPostcode={searchedPostcode}
                      onSearch={handleSearchSubmit}
                      isLoading={isLoading}
                    />
                  </div>
                </section>

                {/* Service Category Tiles */}
                <CategoryTiles
                  onSelectCategory={handleTileCategorySelect}
                  activeCategory={activeCategory}
                />

                {/* Trust & Principles Section */}
                <TrustSection />
              </div>
            )
          )}
        </div>
      </main>

      {/* 3. Global Footer with Disclaimers */}
      <Footer />
    </div>
  );
}
