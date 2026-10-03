'use client';

import React, { createContext, useContext, useEffect, useSyncExternalStore } from 'react';

export type TextSize = 'normal' | 'large' | 'xlarge';

interface TextSizeContextValue {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
}

const TextSizeContext = createContext<TextSizeContextValue>({
  textSize: 'normal',
  setTextSize: () => {},
});

export const STORAGE_KEY = 'nearbyaid_text_size_pref';

// Custom event to sync store across components within same tab
const CHANGE_EVENT = 'nearbyaid_text_size_change';

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getSnapshot(): TextSize {
  if (typeof window === 'undefined') return 'normal';
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as TextSize | null;
    if (saved === 'normal' || saved === 'large' || saved === 'xlarge') {
      return saved;
    }
  } catch {
    // Ignore storage errors in private mode
  }
  return 'normal';
}

function getServerSnapshot(): TextSize {
  return 'normal';
}

export function TextSizeProvider({ children }: { children: React.ReactNode }) {
  const textSize = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Synchronize document attribute with current text size
  useEffect(() => {
    document.documentElement.setAttribute('data-text-size', textSize);
  }, [textSize]);

  const setTextSize = (size: TextSize) => {
    try {
      localStorage.setItem(STORAGE_KEY, size);
      window.dispatchEvent(new Event(CHANGE_EVENT));
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <TextSizeContext.Provider value={{ textSize, setTextSize }}>
      {children}
    </TextSizeContext.Provider>
  );
}

export function useTextSize() {
  return useContext(TextSizeContext);
}
