'use client';

import React from 'react';
import { useTextSize, TextSize } from './TextSizeContext';

export function TextSizeControl() {
  const { textSize, setTextSize } = useTextSize();

  const options: { size: TextSize; label: string; ariaText: string; visualClass: string }[] = [
    { size: 'normal', label: 'A', ariaText: 'Normal text size (100%)', visualClass: 'text-sm font-medium' },
    { size: 'large', label: 'A', ariaText: 'Large text size (112%)', visualClass: 'text-base font-bold' },
    { size: 'xlarge', label: 'A', ariaText: 'Extra large text size (125%)', visualClass: 'text-lg font-black' },
  ];

  return (
    <div
      role="group"
      aria-label="Text size adjustments"
      className="inline-flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200/80 shadow-xs"
    >
      <span className="sr-only">Adjust text size:</span>
      {options.map((opt) => {
        const isActive = textSize === opt.size;
        return (
          <button
            key={opt.size}
            type="button"
            onClick={() => setTextSize(opt.size)}
            aria-pressed={isActive}
            aria-label={opt.ariaText}
            className={`min-touch-target px-3 py-1.5 rounded-lg transition-all flex items-center justify-center ${
              isActive
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-700 hover:text-blue-900 hover:bg-slate-200/70'
            } ${opt.visualClass}`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
