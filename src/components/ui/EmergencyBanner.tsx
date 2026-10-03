import React from 'react';

export function EmergencyBanner() {
  return (
    <section
      aria-label="Emergency and urgent medical assistance guidance"
      className="w-full rounded-2xl border border-red-200/90 bg-red-50/60 p-4 sm:p-5 shadow-xs"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left: 999 & 111 instructions */}
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white font-bold shadow-xs">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-black text-red-950 leading-tight">
              Emergency? Call <span className="underline decoration-red-600 decoration-2">999</span>
            </h2>
            <p className="mt-1 text-sm font-medium text-slate-800 leading-normal">
              For urgent medical advice that isn&apos;t an emergency, call <strong className="text-slate-900 font-bold">NHS 111</strong>.
            </p>
            <p className="mt-1 text-xs text-slate-700">
              NearbyAid is a directory to locate services. It is not an emergency-response service or NHS provider.
            </p>
          </div>
        </div>

        {/* Right: Emergency Quick Call 999 */}
        <div className="flex w-full sm:w-auto shrink-0 items-center gap-2">
          <a
            href="tel:999"
            className="min-touch-target flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-base font-bold text-white shadow-sm hover:bg-red-700 active:bg-red-800 transition-colors focus-visible:ring-4 focus-visible:ring-red-400"
            aria-label="Call 999 in a life-threatening emergency"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Call 999
          </a>
        </div>
      </div>
    </section>
  );
}
