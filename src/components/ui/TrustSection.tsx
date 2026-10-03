import React from 'react';

export function TrustSection() {
  return (
    <section aria-labelledby="trust-section-heading" className="w-full">
      <div className="rounded-3xl bg-slate-100/90 border border-slate-200/90 p-6 sm:p-8">
        <div className="max-w-2xl mb-6">
          <h2 id="trust-section-heading" className="text-xl sm:text-2xl font-black text-slate-900">
            Why NearbyAid is Different
          </h2>
          <p className="mt-1 text-sm sm:text-base text-slate-700">
            A simple, fast, and transparent utility to locate essential healthcare services across the UK.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Principle 1 */}
          <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 mb-3">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-900">Independent & Unbiased</h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                NearbyAid is an independent service directory. We are not an NHS service, nor do we claim NHS or government endorsement.
              </p>
            </div>
          </div>

          {/* Principle 2 */}
          <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-700 mb-3">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-900">A&E Distinction Matters</h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                Many hospitals do not have an A&E department. We never label a hospital as an emergency facility unless it has active Type 1 or Type 2 emergency care.
              </p>
            </div>
          </div>

          {/* Principle 3 */}
          <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 mb-3">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-900">Zero Health Tracking</h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                We never store personal health details or track symptom searches. We never provide medical diagnosis. In an emergency, always dial 999.
              </p>
            </div>
          </div>
        </div>

        {/* Development phase notice */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-700 gap-2">
          <span>
            <strong>Phase 1 UI Foundation:</strong> Displaying realistic mock UK healthcare services for design and accessibility verification.
          </span>
          <span className="font-semibold text-blue-700">nearbyaid.co.uk</span>
        </div>
      </div>
    </section>
  );
}
