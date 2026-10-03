/**
 * NearbyAid Mock Service Coordinator
 * 
 * Provides a clean interface for UI components to query service data.
 * Architecture Note: In Phase 3, this coordinator will be backed by
 * Cloudflare D1 and adapter providers instead of in-memory mock data.
 */

import { MOCK_SERVICES } from '../../data/mockServices';
import type { ServiceCategory, ServiceEntity } from '../../types/service';

export interface MockSearchParams {
  postcode?: string;
  category?: ServiceCategory | 'all';
  sortBy?: 'nearest' | 'name';
  simulateDelayMs?: number;
}

export interface MockSearchResult {
  services: ServiceEntity[];
  totalCount: number;
  searchedPostcode: string;
  category: ServiceCategory | 'all';
  appliedSort: 'nearest' | 'name';
}

/**
 * Basic UK Postcode regex check (lenient UK format for UI guidance)
 * Real authoritative postcodes.io validation belongs to Phase 2.
 */
export function isValidUKPostcodeFormat(postcode: string): boolean {
  if (!postcode) return false;
  const cleaned = postcode.trim().toUpperCase().replace(/\s+/g, '');
  // Broad UK postcode format: 5 to 7 alphanumeric characters
  const ukPostcodePattern = /^[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2}$/;
  return ukPostcodePattern.test(cleaned);
}

/**
 * Format a UK postcode neatly with inward/outward space
 */
export function formatUKPostcode(postcode: string): string {
  const cleaned = postcode.trim().toUpperCase().replace(/\s+/g, '');
  if (cleaned.length <= 3) return cleaned;
  const outward = cleaned.slice(0, cleaned.length - 3);
  const inward = cleaned.slice(cleaned.length - 3);
  return `${outward} ${inward}`;
}

/**
 * Query mock services with filtering, sorting, and state simulation
 */
export async function queryMockServices(params: MockSearchParams): Promise<MockSearchResult> {
  const {
    postcode = 'SW1A 1AA',
    category = 'all',
    sortBy = 'nearest',
    simulateDelayMs = 0,
  } = params;

  if (simulateDelayMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, simulateDelayMs));
  }

  // Check for simulated error triggering
  if (postcode.toUpperCase().trim() === 'TRIGGER_ERROR') {
    throw new Error('Simulated upstream network error for testing error states.');
  }

  // Filter by category
  let filtered = MOCK_SERVICES.filter((service) => {
    if (category === 'all') return true;
    return service.category === category;
  });

  // If a mock test postcode known to have zero results is passed (e.g. "NO_RESULTS" or "ZE1 0AA")
  if (postcode.toUpperCase().includes('NO_RESULTS') || postcode.toUpperCase().includes('ZE1')) {
    filtered = [];
  }

  // Sort results
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'nearest') {
      return (a.distanceMiles ?? 999) - (b.distanceMiles ?? 999);
    }
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return {
    services: sorted,
    totalCount: sorted.length,
    searchedPostcode: formatUKPostcode(postcode) || 'SW1A 1AA',
    category,
    appliedSort: sortBy,
  };
}
